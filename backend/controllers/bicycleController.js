const asyncHandler = require("express-async-handler");
const Bicycle = require("../models/Bicycle");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createBicycle = asyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    phoneNumber,
    gender,
    title,
    description,
    price,
    condition,
  } = req.body;

  const files = req.files;
  let images = [];

  try {
    // Upload each image to Cloudinary
    for (const file of files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "bicycles",
              resource_type: "image",
              public_id: uuidv4(),
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(file.buffer);
      });
      images.push(result.secure_url); // Store the Cloudinary URL
    }

    const bicycle = new Bicycle({
      name,
      email,
      phoneNumber,
      gender,
      title,
      description,
      price,
      condition,
      images,
    });

    await bicycle.save();
    res.status(201).send({ message: "Bicycle has been created successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error creating bicycle", error });
  }
});

exports.getBicycles = async (req, res) => {
  const {
    category,
    minPrice,
    maxPrice,
    condition,
    location,
    sortBy = "createdAt:desc",
    page = 1,
    limit = 10,
    search,
  } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } }, // Case-insensitive title search
      { description: { $regex: search, $options: "i" } }, // Case-insensitive description search
    ];
  }

  // if (category) filter.category = category;
  if (minPrice) filter.price = { ...filter.price, $gte: minPrice };
  if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };
  if (condition) filter.condition = condition;
  if (location) filter.location = location;

  const sortOptions = {};
  if (sortBy) {
    const [field, order] = sortBy.split(":");
    sortOptions[field] = order === "desc" ? -1 : 1;
  }

  try {
    const bicycles = await Bicycle.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Bicycle.countDocuments(filter);
    res.json({ bicycles, total });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Fetch Single Bicycle
exports.getBicycle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bicycle = await Bicycle.findById(id);

  if (!bicycle) {
    return res.status(404).json({ message: "Bicycle not found" });
  }

  res.json(bicycle);
});

// Delete Bicycle (Now deletes images from Cloudinary)
exports.deleteBicycle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const bicycle = await Bicycle.findById(id);

    if (!bicycle) {
      return res.status(404).json({ message: "Bicycle not found" });
    }

    // Delete each image from Cloudinary
    if (bicycle.images && bicycle.images.length > 0) {
      for (const imageUrl of bicycle.images) {
        const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract Cloudinary public ID
        await cloudinary.uploader.destroy(`bicycles/${publicId}`);
      }
    }

    await Bicycle.findByIdAndDelete(id);
    res.json({ message: "Bicycle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bicycle", error });
  }
});

exports.getUserBicycles = asyncHandler(async (req, res) => {
  const { userEmail } = req.query;

  if (!userEmail) {
    return res.status(400).json({ message: "User email is required" });
  }

  const bicycles = await Bicycle.find({ email: userEmail });

  res.json({ bicycles });
});
