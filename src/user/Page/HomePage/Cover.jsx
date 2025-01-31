import React from "react";
import studentImage from "../../../assets/student.png"; // Replace with the correct path to your image

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-8 lg:py-12">
      {" "}
      {/* Adjusted padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-6 z-10">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="text-[#1a237e]">
                  Unlock your Learning potential with{" "}
                </span>{" "}
                <span className="text-[#5e17eb]">GuruMarga</span>
              </h1>
              <p className="text-lg md:text-xl text-[#1a237e]/80">
                Anywhere, anytime. Start learning today!
              </p>
            </div>

            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="What you want to learn?"
                className="w-full py-3 pl-4 pr-12 text-base md:text-lg rounded-lg border-gray-600 bg-gray-200 placeholder:text-[#9FA6B2]" // Updated border color
              />

              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
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

            <button className="bg-[#5e17eb] hover:bg-[#5e17eb]/90 text-white px-6 py-3 text-base md:text-lg rounded-lg">
              Get Started
            </button>
          </div>

          {/* Right Column */}
          <div className="relative h-[350px] lg:h-[500px]">
            {" "}
            {/* Increased height for mobile and large screens */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
                {" "}
                {/* Increased width and height */}
                <div className="absolute inset-0 bg-[#E1BEE7] rounded-full transform -rotate-6"></div>
                <img
                  src={studentImage}
                  alt="Student"
                  className="relative z-10 object-cover rounded-full w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
