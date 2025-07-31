import AdminLayout from "../../../components/layout/admin/AdminLayout.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {categoryService} from "../../../services/categoryService.js";
import CategoryModal from "../../../components/modals/CategoryModal.jsx";

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        setLoading(true);
        setError("");
        try {
            const result = await categoryService.getAllCategories();
            // console.log(result);
            if (result.success) {
                setCategories(result.data);
            } else {
                setError(result.message || "Failed to fetch categories");
            }
        } catch (err) {
            console.error('Unexpected error fetching categories: ', err);
            setError('An unexpected error occurred while loading categories');
        } finally {
            setLoading(false);
        }

    }

    function handleCategoryChanged() {
        fetchCategories();
    }

    function handleCreatedCategory() {
        setIsModalOpen(true);
        setEditingCategory(null);
    }

    function handleEditingCategory(category) {
        setEditingCategory(category);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setEditingCategory(null);
    }

    async function handleDeletingCategory(id, categoryName) {
        if (!confirm(`Are sure to delete ${categoryName} category? This action cannot be undone`)) {
            return;
        }
        setDeletingId(id);
        try {
            const result = await categoryService.deleteCategory(id);

            if (result.success) {
                alert("Category deleted successfully");
                fetchCategories(); // Refresh the list
            } else {
                // Handle API errors
                alert(result.message || "Failed to delete category");
            }
        } catch (err) {
            console.error("Error deleting category:", err);
            alert("An unexpected error occurred while deleting the category");
        } finally {
            setDeletingId(null); // Reset loading state
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="text-center text-gray-400">
                        Loading categories...
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="text-center text-red-400">
                        {error}
                        <button
                            onClick={fetchCategories}
                            className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 sm:text-2xl text-white flex justify-between">
                    <h2>Categories</h2>
                    <button
                        onClick={handleCreatedCategory}
                        className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 text-lg rounded-lg shadow cursor-pointer transition-colors"
                    >
                        Add new category
                    </button>
                </div>

                <div className="hidden lg:block">
                    <div className="overflow-x-auto">
                        <table className="w-full text-lg text-left text-gray-300">
                            <thead className="text-lg text-gray-400 uppercase bg-gray-700">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Children</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories && categories.map(category => (
                                <tr key={category.id}
                                    className="bg-gray-800  border-b border-gray-700 hover:bg-gray-750 transition-colors">
                                    <td className="px-6 py-3 font-medium">{category.id}</td>
                                    <td className="px-6 py-3 font-medium">{category.name}</td>
                                    <td className="px-6 py-3 font-medium">
                                        {category.children && category.children.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {category.children.map(child => (
                                                    <span
                                                        key={child.id}
                                                        className="bg-gray-600 rounded-lg text-sm px-2 py-1 text-gray-200"
                                                    >
                                                        {child.name}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 italic">No children</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditingCategory(category)}
                                                className="text-blue-400 hover:text-blue-300 font-medium">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeletingCategory(category.id, category.name)}
                                                className="text-red-400 hover:text-red-300 font-medim">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create Category Modal */}
            <CategoryModal
                isOpen={isOpen}
                categories={categories}
                onCategoryChanged={handleCategoryChanged}
                onClose={handleCloseModal}
                editingCategory={editingCategory}
            />
        </AdminLayout>
    );
}

export default CategoryList;