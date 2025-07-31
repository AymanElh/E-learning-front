import React, {useEffect, useState} from 'react';
import {X} from 'lucide-react';
import {categoryService} from '../../services/categoryService.js';
import Spinner from '../common/Spinner.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';

const CategoryModal = ({isOpen, onClose, onCategoryChanged, categories = [], editingCategory = null}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parent_id: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});


    const isEditMode = editingCategory !== null;

    useEffect(() => {
        if (isEditMode && editingCategory) {
            setFormData({
                name: editingCategory.name || '',
                description: editingCategory.description || '',
                parent_id: editingCategory.parent_id || ''
            });
        } else {
            // Reset form for create mode
            setFormData({
                name: '',
                description: '',
                parent_id: ''
            });
        }
        // Clear errors when switching modes
        setError('');
        setErrors({});
    }, [editingCategory, isOpen]);

    if (!isOpen) return null;

    function handleInputChange(e) {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }


    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setError("");
        setErrors({});


        const newErrors = {};
        if (!formData.name || formData.name.trim() === "") {
            newErrors.name = "Category name is required";
        }

        if (Object.entries(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            let result;

            if (isEditMode) {
                result = await categoryService.updateCategory(editingCategory.id, formData);
            } else {
                result = await categoryService.createCategory(formData);
            }

            if (result.success) {
                if (onCategoryChanged) {
                    onCategoryChanged();
                }

                handleClose();

                alert(`Category ${isEditMode ? 'updated' : 'created'} successfully`);
            }
        } catch (err) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} category: `, err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }

    }

    function handleClose() {
        if (!loading) {
            setError('');
            setErrors({});
            setFormData({
                name: '',
                description: '',
                parent_id: '',
            });
            onClose();
        }
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
                className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">{isEditMode ? "Edit category" : "Create New Category"}</h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <X className="w-6 h-6"/>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {error && (
                        <div className="mb-4">
                            <ErrorMessage message={error} onClose={() => setError('')}/>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Category Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Category Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter category name"
                                required
                                disabled={loading}
                            />
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="Enter category description (optional)"
                                disabled={loading}
                            />
                            {errors.description && (
                                <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* Parent Category */}
                        <div>
                            <label htmlFor="parent_id" className="block text-sm font-medium text-gray-300 mb-2">
                                Parent Category
                            </label>
                            <select
                                id="parent_id"
                                name="parent_id"
                                value={formData.parent_id}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            >
                                <option value="">Select parent category (optional)</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.parent_id && (
                                <p className="text-red-400 text-sm mt-1">{errors.parent_id}</p>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                            <button
                                type="button"
                                disabled={loading}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                {loading && <Spinner size="small"/>}
                                {loading ?
                                    (isEditMode ? 'Updating...' : 'Creating...') :
                                    (isEditMode ? 'Update category' : 'Create category')
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
