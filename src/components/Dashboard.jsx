import React, { useEffect, useState } from "react";
import AOS from "aos"; 
import "aos/dist/aos.css";
import items from "../Data";
import Modal from "./Modal";

const Dashboard = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh(); 
  }, []);

  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [engagementFilter, setEngagementFilter] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("engagement-asc");

  const calculateEngagement = (item) =>
    item.likes + item.shares + item.comments;

  const calculateReach = (item) =>
    Math.round((item.followers * calculateEngagement(item)) / 100);

  const handleCategoryChange = (e) => setCategoryFilter(e.target.value);

  const handleSortChange = (e) => setSortOption(e.target.value);

  const handleEngagementChange = (e) => {
    const [min, max] = e.target.value.split("-").map(Number);
    setEngagementFilter([min, max]);
  };

  const filteredItems = items
    .filter((item) => {
      const engagement = calculateEngagement(item);
      const isCategoryMatch = categoryFilter
        ? item.category === categoryFilter
        : true;
      const isEngagementMatch =
        engagement >= engagementFilter[0] && engagement <= engagementFilter[1];
      return isCategoryMatch && isEngagementMatch;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "engagement-asc":
          return calculateEngagement(a) - calculateEngagement(b);
        case "engagement-desc":
          return calculateEngagement(b) - calculateEngagement(a);
        case "reach-asc":
          return calculateReach(a) - calculateReach(b);
        case "reach-desc":
          return calculateReach(b) - calculateReach(a);
        default:
          return 0;
      }
    });

  return (
    <>
      {/* Navbar */}
      <nav className="bg-transparent py-4 px-6 top-0 w-full z-10 shadow-xl ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold hover:text-gray-600 cursor-pointer uppercase">
            Data Dashboard
          </h1>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="min-h-screen p-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Category Filter */}
          <div data-aos="fade-down-right" className="w-full sm:w-auto">
            <label htmlFor="categoryFilter" className="mr-2 font-semibold">
              Category:
            </label>
            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-grey text-sm"
            >
              <option value="">All</option>
              <option value="Tech">Tech</option>
              <option value="Health">Health</option>
              <option value="Fashion">Fashion</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          {/* Engagement Filter */}
          <div data-aos="fade-down" className="w-full sm:w-auto">
            <label htmlFor="engagementFilter" className="font-semibold mr-2">
              Engagement Score:
            </label>
            <select
              id="engagementFilter"
              onChange={handleEngagementChange}
              className="mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-grey text-sm"
            >
              <option value="0-1000">0–1000</option>
              <option value="1000-2000">1000–2000</option>
              <option value="2000-3000">2000–3000</option>
              <option value="3000-4000">3000–4000</option>
              <option value="4000-5000">4000–5000</option>
              <option value="0-5000">All</option>
            </select>
          </div>

          {/* Sort Options */}
          <div data-aos="fade-down-left" className="w-full sm:w-auto">
            <label htmlFor="sortOption" className="font-semibold mr-2">
              Sort by:
            </label>
            <select
              id="sortOption"
              value={sortOption}
              onChange={handleSortChange}
              className="mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-grey text-sm"
            >
              <option value="engagement-asc">
                Engagement Score (Low to High)
              </option>
              <option value="engagement-desc">
                Engagement Score (High to Low)
              </option>
              <option value="reach-asc">Reach (Low to High)</option>
              <option value="reach-desc">Reach (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              id="brutalist-card"
              key={item.id}
              className="bg-white shadow-md rounded p-4 hover:shadow-lg transition"
              data-aos="zoom-in"
            >
              <h2
                className="text-ml font-semibold mb-2 border-b border-gray-500 pb-2"
                id="brutalist-card__alert"
              >
                {item.name}
              </h2>
              <p className="text-lg">
                <strong className="text-gray-600">Engagement Score:</strong>{" "}
                {calculateEngagement(item)}
              </p>
              <p className="text-lg">
                <strong className="text-gray-600">Category:</strong>{" "}
                {item.category}
              </p>
              <p className="text-lg">
                <strong className="text-gray-600">Location:</strong>{" "}
                {item.location}
              </p>
              <button
                onClick={() => setSelectedItem(item)}
                id="brutalist-card__button brutalist-card__button--mark"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
};

export default Dashboard;
