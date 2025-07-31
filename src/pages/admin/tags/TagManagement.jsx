import AdminLayout from "../../../components/layout/admin/AdminLayout.jsx";
import {useEffect, useState} from "react";
import {tagService} from "../../../services/tagService.js";
import Spinner from "../../../components/common/Spinner.jsx";
import ErrorMessage from "../../../components/common/ErrorMessage.jsx";
import TagModal from "../../../components/modals/TagModal.jsx";
import {categoryService} from "../../../services/categoryService.js";

function TagManagement() {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [isOpen, setModalIsOpen] = useState(false);
    const [editingTag, setEditingTag] = useState(null);

    useEffect(() => {
        fetchTags();
    }, []);

    async function fetchTags() {
        setLoading(true);
        setError("");
        try {
            const result = await tagService.getAllTags();
            if (result.success) {
                console.log("Tags retrieved successfully: ", result);
                setTags(result.tags);
            } else {
                console.log(result.message);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    function handleTagChanged() {
        fetchTags();
    }

    function handleCloseModal() {
        setModalIsOpen(false);
        setEditingTag(null)
    }

    async function handleDeletingTag(id, name) {
        if (!confirm(`Are sure to delete ${name} category? This action cannot be undone`)) {
            return;
        }
        try {
            const result = await tagService.deleteTag(id);

            if (result.success) {
                alert("Tag deleted successfully");
                fetchTags(); // Refresh the list
            } else {
                alert(result.message || "Failed to delete tag");
            }
        } catch (err) {
            console.error("Error deleting tag:", err);
            alert("An unexpected error occurred while deleting tag");
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="h-screen flex items-center justify-center">
                    <Spinner/>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 sm:text-2xl text-white flex justify-between">
                    <h2>Tags</h2>
                    <button
                        onClick={() => setModalIsOpen(true)}
                        className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 text-lg rounded-lg shadow cursor-pointer transition-colors"
                    >
                        Add new Tag
                    </button>
                </div>

                {error && (
                    <div className="p-4">
                        <ErrorMessage message={error} onClose={() => setError('')}/>
                    </div>
                )}
                <div className="hidden lg:block">
                    <div className="overflow-x-auto">
                        <table className="w-full text-lg text-left text-gray-300">
                            <thead className="text-lg text-gray-400 uppercase bg-gray-700">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tags && tags.map(tag => (
                                <tr key={tag.id}
                                    className="bg-gray-800  border-b border-gray-700 hover:bg-gray-750 transition-colors">
                                    <td className="px-6 py-3 font-medium">{tag.id}</td>
                                    <td className="px-6 py-3 font-medium">{tag.name}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingTag(tag);
                                                    setModalIsOpen(true);
                                                }}
                                                className="text-blue-400 hover:text-blue-300 font-medium">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeletingTag(tag.id, tag.name)}
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

            <TagModal
                isOpen={isOpen}
                onClose={handleCloseModal}
                onTagChanged={handleTagChanged}
                editingTag={editingTag}
            />

        </AdminLayout>

    );
}

export default TagManagement;