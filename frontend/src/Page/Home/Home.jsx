import React, { useEffect, useState } from "react";

import { FaFilter } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { Link } from "react-router-dom";
import { backendUrl } from "../../config";
import { MdDeleteForever } from "react-icons/md";
const Home = () => {
  const [active, setActive] = useState(false);
  const [bicycles, setBicycles] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    condition: "",
  });
  const resetFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      condition: "",
    });
  };
  
  const [sort, setSort] = useState("dateAdded:desc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    fetchBicycles();
  }, [filters, sort, page]);

  const fetchBicycles = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/bicycles`, {
        params: { ...filters, sortBy: sort, page, limit },
      });
      if (response.data && Array.isArray(response.data.bicycles)) {
        setBicycles(response.data.bicycles);
        setTotal(response.data.total);
        console.log(response.data.bicycles);
      } else {
        console.error("Expected an array of bicycles in response");
      }
    } catch (error) {
      console.error("Error fetching bicycles:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="home-container py-[1rem]">
      {/* Sorting */}
      <div className="flex justify-center rounded-md border border-blue-200 items-center p-2 bg-white shadow-sm">
        <span className="font-bold mr-2 text-gray-700">Sort By:</span> 
        <select
          className="rounded bg-blue-50 p-2 text-gray-700"
          onChange={handleSortChange}
          value={sort}
        >
          <option value="dateAdded:desc">Date Added (Newest First)</option>
          <option value="dateAdded:asc">Date Added (Oldest First)</option>
          <option value="price:desc">Price (High to Low)</option>
          <option value="price:asc">Price (Low to High)</option>
        </select>
        <FaFilter
          className="h-7 w-7  mx-4 hover:text-amber-500 cursor-pointer"
          onClick={() => {
            setActive(!active);
          }}
        />
      </div>
      {/* Filter */}
{active && (
  <div className="bg-blue-50 ring-1 ring-blue-200 rounded-md my-2 p-5 shadow-sm">
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-700">Category:</span>
        <select
          name="category"
          className="rounded-md bg-white border border-blue-200 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleFilterChange}
          value={filters.category}
        >
          <option value="">All</option>
          <option value="Mountain">Mountain</option>
          <option value="Road">Road</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-700">Price Range:</span>
        <div className="flex items-center gap-2">
          <select
            name="minPrice"
            className="rounded-md bg-white border border-blue-200 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleFilterChange}
            value={filters.minPrice}
          >
            <option value="">Min Price</option>
            <option value="500">Rs. 500</option>
            <option value="1000">Rs. 1000</option>
            <option value="2000">Rs. 2000</option>
            <option value="3000">Rs. 3000</option>
            <option value="4000">Rs. 4000</option>
            <option value="5000">Rs. 5000</option>
            <option value="6000">Rs. 6000</option>
          </select>
          <span className="text-gray-500">to</span>
          <select
            name="maxPrice"
            className="rounded-md bg-white border border-blue-200 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleFilterChange}
            value={filters.maxPrice}
          >
            <option value="">Max Price</option>
            <option value="1000">Rs. 1000</option>
            <option value="2000">Rs. 2000</option>
            <option value="3000">Rs. 3000</option>
            <option value="4000">Rs. 4000</option>
            <option value="5000">Rs. 5000</option>
            <option value="6000">Rs. 6000</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-700">Condition:</span>
        <select
          name="condition"
          className="rounded-md bg-white border border-blue-200 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleFilterChange}
          value={filters.condition}
        >
          <option value="">All</option>
          <option value="new">New</option>
          <option value="like_new">Like New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>
      </div>
      <button
        onClick={resetFilters}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Reset Filters
      </button>
    </div>
  </div>
)}


      {/* Bicycles */}
      <div className="flex flex-wrap gap-8 justify-center mt-4">
        {bicycles.map((bicycle) => (
          <div
            key={bicycle._id}
            className="relative border-blue-300 border-x-4 border-y-2 border-y-gray-300 p-2 rounded-xl text-gray-800 w-72 flex flex-col gap-2 bg-white hover:border-blue-500 cursor-pointer overflow-hidden transition-transform transform hover:scale-95 shadow-md"
          >
            <Link
              to={{ pathname: `/bicycle/${bicycle._id}`, state: { bicycle } }}
            >
              <img
                src={bicycle.images[0]}
                alt={bicycle.description}
                className="w-full h-40 bg-gray-200 rounded object-cover overflow-hidden transition-transform transform hover:scale-105"
              />
            </Link>
            <div className="h-32">
              <h1 className="text-lg font-serif text-gray-700">
                {bicycle.title}
              </h1>
              <div className="font-semibold font-serif flex justify-between items-center text-xl">
                {`₹${bicycle.price}`}{" "}
                <span className="text-sm text-gray-500">{`Condition: ${bicycle.condition}`}</span>
              </div>
              <div className="text-sm text-gray-600">
                {bicycle.description.slice(0, 150) +
                  (bicycle.description.length > 150 ? "..." : "")}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-2 px-4 py-2 border font-serif rounded-full hover:ring-1 ${
              page === index + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
