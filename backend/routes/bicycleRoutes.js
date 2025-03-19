const express = require("express");
const router = express.Router();
const BicycleController = require("../controllers/bicycleController");
const upload = require("../middleware/upload");

router.post(
  "/bicycles",
  upload.array("images", 6),
  BicycleController.createBicycle
);
router.get("/bicycles", BicycleController.getBicycles);

// ✅ Move this route above `/:id`
router.get("/bicycles/user-bicycles", BicycleController.getUserBicycles);

router.get("/bicycles/:id", BicycleController.getBicycle);
router.delete("/bicycles/:id", BicycleController.deleteBicycle);

module.exports = router;
