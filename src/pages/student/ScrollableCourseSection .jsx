import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./CourseCard";

const ScrollableCourseSection = ({ title, courses }) => {
  const scrollContainerRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const scrollAmount = 300; // Scroll distance per button click

  useEffect(() => {
    const checkScrollPosition = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setScrollState({
          canScrollLeft: container.scrollLeft > 0,
          canScrollRight:
            container.scrollLeft < container.scrollWidth - container.clientWidth,
        });
      }
    };

    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [courses]);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
      setTimeout(() => checkScrollPosition(), 300); // Delay checking scroll position for smooth scrolling
    }
  };

  return (
    <section className="py-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#1a237e] mb-8">{title}</h2>

        {courses.length === 0 ? (
          <div className="animate-pulse">
          <div className="h-36 bg-gray-300 rounded-t-lg"></div>
          <div className="p-3">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
        ) : (
          <div className="relative">
            {/* Course Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-hidden scroll-smooth"
            >
              {courses.map((course) => (
                <div key={course.id} className="flex-none w-[300px] pr-6">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>

            {/* Scroll Buttons */}
            {scrollState.canScrollLeft && (
              <button
                onClick={() => handleScroll(-1)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              >
                <ChevronLeft className="w-6 h-6 text-[#5e17eb]" />
              </button>
            )}
            {scrollState.canScrollRight && (
              <button
                onClick={() => handleScroll(1)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              >
                <ChevronRight className="w-6 h-6 text-[#5e17eb]" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ScrollableCourseSection;
