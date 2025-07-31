import React, {useEffect, useState} from 'react';
import {X} from 'lucide-react';
import {tagService} from "../../services/tagService.js";
import Spinner from "../common/Spinner.jsx";

const TagModal = ({isOpen, onClose, onTagChanged, editingTag = null}) => {
    const isEditMode = editingTag !== null;



    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode && editingTag) {
            setName(editingTag.name || "");
        } else {
            setName("");
        }
        // Clear errors when switching modes
        setError('');
        setErrors({});
    }, [editingTag, isOpen]);

    if (!isOpen) return null;

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setError("");
        setErrors({});

        if (!name || name.trim() === "") {
            setErrors({
                name: "Name field is required"
            });
            setLoading(false);
            return;
        } else if (name.length < 2) {
            setErrors({
                name: "Name must be more that 2 characters",
            });
            setLoading(false);
            return;
        }

        try {
            let result;
            if (isEditMode) {
                result = await tagService.updateTag(editingTag.id, {name: name});
            } else {
                result = await tagService.createTag({name: name});
            }
            console.log(result);
            if (result.success) {
                console.log("on tag changed")
                if (onTagChanged) {
                    onTagChanged();
                }
                alert(`Tag ${isEditMode ? "updated" : "created"} successfully`);
                handleClose();
            } else {
                setError(result?.message || `Failed to ${isEditMode ? "update" : "create"} tag`)
            }
            // alert(error);

        } catch (err) {
            console.error(`Tag ${isEditMode ? "update" : "create"} failed: ${err}`)
            setError(`Error ${isEditMode ? "updating" : "creating"} tag`)
        } finally {
            setLoading(false);
        }
    }

    function handleInputChange(e) {
        const value = e.target.value;
        setName(value);
    }

    function handleClose() {
        if (!loading) {
            setError('');
            setErrors({});
            setName("");
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
                className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                {error && <p className="bg-red-700 text-red-300 text-lg m-3 px-4 py-2 rounded-lg">{error}</p>}
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">
                        {isEditMode ? "Edit Tag" : "Create New Tag"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6"/>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Tag Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Tag Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter tag name"
                                required
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                {loading ?
                                    (isEditMode ? 'Updating...' : 'Creating...') :
                                    (isEditMode ? 'Update tag' : 'Create tag')
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TagModal;
