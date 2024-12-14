import React, { useEffect } from "react";
import AOS from "aos"; // AOS for animations on scroll
import "aos/dist/aos.css";
const Modal = ({ item, onClose }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh(); // Refresh AOS to detect new DOM elements
  }, []);

  if (!item) return null;
  const calculateEngagement = (item) =>
    item.likes + item.shares + item.comments;
  const calculateReach = (item) =>
    Math.round((item.followers * calculateEngagement(item)) / 100);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg mx-4"
        data-aos="zoom-in"
        id="brutalist-card1"
      >
        <h2
          className="text-ml font-semibold mb-2 border-b border-gray-500 pb-2 "
          id="brutalist-card__alert"
        >
          {item.name}
        </h2>
        <div className="space-y-4">
          <p className="text-lg">
            <strong className="text-gray-600">Category:</strong> {item.category}
          </p>
          <p className="text-lg">
            <strong className="text-gray-600">Location:</strong> {item.Location}
          </p>
          <p className="text-lg">
            <strong className="text-gray-600">Engagment Score:</strong>{" "}
            {calculateEngagement(item)}
          </p>
          <p className="text-lg">
            <strong className="text-gray-600">Reach:</strong>{" "}
            {calculateReach(item)}
          </p>
          <p className="text-lg">
            <strong className="text-gray-600">Likes:</strong> {item.likes}
          </p>
          <p className="text-lg">
            <strong className="text-gray-600">shares:</strong> {item.shares}
          </p>
          <p className="text-lg">
            <strong className="text-gray-600">Comments:</strong> {item.comments}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose}>close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
