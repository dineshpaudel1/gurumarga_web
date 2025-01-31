import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./CourseCard";

const ScrollableCourseSection = ({ title, courses }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const scrollAmount = 300; // The scroll amount for each button click

  useEffect(() => {
    const calculateMaxIndex = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const itemWidth = 300; // Assuming each course card is 300px wide
        const itemsPerView = Math.floor(containerWidth / itemWidth);
        setMaxIndex(Math.max(0, courses.length - itemsPerView));
      }
    };

    calculateMaxIndex();
    window.addEventListener("resize", calculateMaxIndex);
    return () => window.removeEventListener("resize", calculateMaxIndex);
  }, [courses.length]);

  const handlePrev = () => {
    const container = scrollContainerRef.current;
    container.scrollLeft -= scrollAmount;
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    const container = scrollContainerRef.current;
    container.scrollLeft += scrollAmount;
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#1a237e] mb-12">{title}</h2>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden scroll-smooth" // Removed overflow-x-auto and added overflow-x-hidden
          >
            {courses.map((course) => (
              <div key={course.id} className="flex-none w-[300px] pr-6">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              <ChevronLeft className="w-6 h-6 text-[#5e17eb]" />
            </button>
          )}
          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              <ChevronRight className="w-6 h-6 text-[#5e17eb]" />
            </button>
          )}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? "bg-[#5e17eb]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollableCourseSection;
