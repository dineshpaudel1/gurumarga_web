import React from "react";
import studentImage from "../../assets/student.png"; // Replace with the correct path to your image

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              <span className="block">Unlock Your</span>
              <span className="block text-blue-600">Learning Potential</span>
              <span className="block">with GuruMarga</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-600">
              Anywhere, anytime. Start learning today!
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full py-3 pl-4 pr-12 text-base rounded-lg bg-gray-100 border border-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Get Started Button */}
            <button className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
              Get Started
            </button>
            
          </div>

          {/* Right Column */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              {/* Image Container */}
              <div className="absolute inset-0 bg-gray-100 rounded-full transform -rotate-6"></div>
              <img
                src={studentImage}
                alt="Student"
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-gray-200 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;