import React, { useContext, useState, useEffect } from "react";
import lokPhoto from "../../assets/icons/lok.png";
import CourseContext from "../../context/CourseInfoProvider";

const Categories = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { categoryInfo } = useContext(CourseContext);

  useEffect(() => {
    if (!categoryInfo || categoryInfo.length === 0) {
      setError("No categories available");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating loading delay
  }, [categoryInfo]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#1a237e] mb-2">Categories</h2>
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              // Skeleton Loader
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md animate-pulse"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-300 mb-4"></div>
                  <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))
            ) : categoryInfo && categoryInfo.length > 0 ? (
              categoryInfo.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col items-center group bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="w-16 h-16 rounded-full bg-[#5e17eb] flex items-center justify-center mb-4">
                    <img
                      src={lokPhoto}
                      alt={category.categoryName}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-[#1a237e] group-hover:text-[#5e17eb] transition-colors duration-300">
                    {category.categoryName}
                  </h3>
                </div>
              ))
            ) : (
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md animate-pulse"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-300 mb-4"></div>
                  <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
