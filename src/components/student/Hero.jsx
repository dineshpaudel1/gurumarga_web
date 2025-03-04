import React from "react";
import studentImage from "../../assets/student.png"; // Replace with the correct path to your image

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-2 lg:pt-8 pb-[-40px] lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Left Column (Spans 8 out of 12 frames) */}
          <div className="col-span-12 lg:col-span-8 space-y-4 z-10">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                <span className="text-[#1a237e]">
                  Unlock your Learning potential with{" "}
                </span>{" "}
                <span className="text-[#5e17eb]">GuruMarga</span>
              </h1>
              <p className="text-base md:text-lg text-[#1a237e]/80">
                Anywhere, anytime. Start learning today!
              </p>
            </div>

            <div className="relative max-w-lg">
              <input
                type="text"
                placeholder="What you want to learn?"
                className="w-full py-2 pl-3 pr-10 text-sm md:text-base rounded-lg border-gray-600 bg-gray-200 placeholder:text-[#9FA6B2]"
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-400"
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

            <button className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
              Get Started
            </button>
          </div>

          {/* Right Column (Spans 4 out of 12 frames) */}
          <div className="col-span-12 lg:col-span-4 relative h-[150px] lg:h-[450px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-72 h-72 lg:w-96 lg:h-96">
                <div className="rounded-full transform -rotate-6"></div>
                <img
                  src={studentImage}
                  alt="Student"
                  className="relative z-10 object-cover rounded-full w-[500px] h-[350px]"
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
