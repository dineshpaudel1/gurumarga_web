import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../Apis/CategoryApi";
import lokPhoto from "../../assets/icons/lok.png";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError("Failed to fetch categories.");
      }
    };

    loadCategories();
  }, []);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#1a237e] mb-12">Categories</h2>
        {/* Remove scrollable container, making grid fully flexible */}
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center group bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="w-16 h-16 rounded-full bg-[#5e17eb] flex items-center justify-center mb-4">
                  <img
                    src={lokPhoto}
                    alt={category.categoryName}
                    className="w-8 h-8 object-contain text-[#5e17eb]"
                  />
                </div>
                <h3 className="text-lg font-medium text-[#1a237e] group-hover:text-[#5e17eb] transition-colors duration-300">
                  {category.categoryName}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
