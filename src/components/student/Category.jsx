import React, { useContext, useState, useEffect } from "react";
import lokPhoto from "../../assets/icons/lok.png";
import CourseContext from "../../context/CourseInfoProvider";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const { categoryInfo } = useContext(CourseContext);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [categoryInfo]);

  return (
    <section className="py-16 bg-gradient-to-r from-[#f0efed] to-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-[#1a237e] mb-8">
          <span className="relative inline-block">
            Categories
          </span>
        </h2>

        {/* Category Cards Grid */}
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loading
              ? // Loading Skeleton
                [...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg animate-pulse"
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-200 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))
              : // Display Categories
              categoryInfo?.length > 0
              ? categoryInfo.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col items-center group bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-100 hover:border-[#5e17eb]"
                  >
                    {/* Icon Container */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#5e17eb] to-[#1a237e] flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                      <img
                        src={lokPhoto}
                        alt={category.categoryName}
                        className="w-10 h-10 object-contain filter brightness-0 invert"
                      />
                    </div>

                    {/* Category Name */}
                    <h3 className="text-xl font-semibold text-[#1a237e] group-hover:text-[#5e17eb] transition-colors duration-300 text-center">
                      {category.categoryName}
                    </h3>
                  </div>
                ))
              : // Fallback if no categories are available
                [...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg animate-pulse"
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-200 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;