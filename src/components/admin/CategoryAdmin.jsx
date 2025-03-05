import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddCategoryModal from "../../pages/admin/AddCategoryModel";
import EditCategoryModal from "../../pages/admin/EditCategoryModel";
import { fetchCategories, fetchCategoryById } from "../../Apis/CategoryApi";
import axios from "axios";
import CourseContext from "../../context/CourseInfoProvider";
import hero from "../../assets/rawphoto/logo.png"

const CategoryAdmin = () => {
  const { categoryInfo } = useContext(CourseContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setShowAddModal(false);
  };

  const handleEditCategory = async (id) => {
    try {
      const categoryData = await fetchCategoryById(id);
      setSelectedCategory(categoryData);
      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }
  };

  const handleCategoryUpdate = (updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setShowEditModal(false);
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: { id },
        }
      );

      if (response.status === 200) {
        setCategories(categories.filter((category) => category.id !== id));
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading categories...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-green-500 px-4 py-2 rounded-lg flex items-center hover:bg-green-200 transition-all"
          >
            <FaPlus className="mr-2" /> Add Category
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">
                  Category Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 uppercase">
                  Image
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-left text-gray-700">
                    {category.categoryName}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <img
                      src={hero}
                      alt={category.categoryName}
                      className="w-20 h-20 object-cover rounded-lg mx-auto"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => handleEditCategory(category.id)}
                        className=" text-black"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className=" text-red-500"
                      >
                        <FaTrash className="h-5 w-5"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <AddCategoryModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddCategory={handleAddCategory}
        />
      )}

      {/* Edit Category Modal */}
      {showEditModal && selectedCategory && (
        <EditCategoryModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          categoryId={selectedCategory.id}
          initialData={selectedCategory}
          onEditCategory={handleCategoryUpdate}
        />
      )}
    </div>
  );
};

export default CategoryAdmin;