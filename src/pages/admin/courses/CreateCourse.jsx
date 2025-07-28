import React, {useEffect, useState} from "react";
import AdminLayout from "../../../components/layout/admin/AdminLayout.jsx";
import {Eye, Image, Plus, Save} from "lucide-react";
import {categoryService} from "../../../services/categoryService.js";
import {courseService} from "../../../services/courseService.js";
import ErrorMessage from "../../../components/common/ErrorMessage.jsx";
import Spinner from "../../../components/common/Spinner.jsx";
import {useNavigate} from "react-router-dom";

function CreateCourse() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isFree, setIsFree] = useState(false);
    const [categoryError, setCategoryError] = useState("");
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        setCategoriesLoading(true);
        setCategoryError("");
        try {
            const result = await categoryService.getAllCategories();
            // console.log(result);
            if (result.success) {
                setCategories(result.data);
            } else {
                setCategoryError(result.message || "Failed to fetch categories");
            }
        } catch (err) {
            console.error('Unexpected error fetching categories: ', err);
            setCategoryError('An unexpected error occurred while loading categories');
        } finally {
            setCategoriesLoading(false);
        }

    }

    async function handleCourseCreate(formData) {
        setLoading(true);
        const courseData = {}
        for (const [key, value] of formData.entries()) {
            courseData[key] = value;
        }

        // edit the is_featured and is_published fields with boolean values
        courseData.is_published = courseData.is_published === "on"
        courseData.is_featured = courseData.is_featured === "on"
        courseData.is_free = courseData.is_free === "on"
        courseData.price = courseData.price ?? 0.00

        console.log(courseData);

        const newErrors = {};
        if (!courseData.title || courseData.title.trim() === "") {
            newErrors.title = "Course title is required";
        }
        if (!courseData.duration || courseData.duration <= 0) {
            newErrors.duration = 'Duration must be greater than 0';
        }

        if (!courseData.is_free && (!courseData.price || courseData.price <= 0)) {
            newErrors.price = 'Price is required for paid courses';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return
        }

        setErrors([]);
        console.log("hi");
        // make post request to backend
        try {
            const result = await courseService.createCourse(courseData);
            console.log(result);
            if (result.success) {
                navigate("/admin/courses");
            } else {
                if (result.errors) {
                    console.log("Validation fails from backend: ", result.errors);
                    setErrors(result.errors)
                } else {
                    console.error("Error: ", result.message);
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return (
            <AdminLayout>
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <Spinner/>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto ">
                <div className="bg-gray-800 rounded-lg shadow-lg">
                    <div className="p-6 border-b border-gray-700">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Plus className="w-6 h-6"/>
                            Create new course
                        </h2>
                        <p className="text-gray-400 mt-2">Fill in details to create a new course</p>
                    </div>

                    {categoryError && (
                        <div className="p-6 pb-0">
                            <ErrorMessage message={categoryError}/>
                        </div>
                    )}

                    {/*Form*/}
                    <form className="p-6 space-y-6" action={handleCourseCreate}>
                        {/*Basic Information*/}
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="md:col-span-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                    Course Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter course title"
                                />
                                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                            </div>

                            {/* Slug */}
                            <div className="md:col-span-2">
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
                                    Course Slug
                                </label>
                                <input
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    className="w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="course-slug-will-be-auto-generated"
                                />
                                <p className="text-gray-400 text-sm mt-1">Auto-generated from title, but you can
                                    customize it</p>
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    className="w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Describe what students will learn in this course..."
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
                                    Duration (minutes) *
                                </label>
                                <input
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    min="1"
                                    className="w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="120"
                                />
                                {errors.duration && <p className="text-red-400 text-sm mt-1">{errors.duration}</p>}
                            </div>

                            {/* Difficulty */}
                            <div>
                                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-2">
                                    Difficulty Level
                                </label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    className="w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            {/*Category*/}
                            <div className="md:col-span-2">
                                <label htmlFor="course-category"
                                       className="block text-sm font-medium text-gray-300 mb-2">
                                    Category
                                </label>
                                <select
                                    id="course-category"
                                    name="category_id"
                                    disabled={categoriesLoading || categoryError}
                                    className="w-full p-3 bg-gray-700 borer border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="">Select a category</option>
                                    {categories && Array.isArray(categories) && categories.map(category => {
                                        return <option key={category.id} value={category.id}>{category.name}</option>
                                    })}
                                </select>
                                {errors.category_id && <p>{errors.category_id}</p>}
                            </div>

                        </div>

                        {/*Pricing Section*/}
                        <div className="border-t border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-white mb-4 ">Pricing</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="is_free"
                                            name="is_free"
                                            onChange={(e) => setIsFree(e.target.checked)}
                                            className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="is_free" className="ml-2 text-sm text-gray-300">This is a free
                                            course</label>
                                    </div>
                                </div>

                                {!isFree && (
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                                            Price ($) *
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            id="price"
                                            name="price"
                                            className="w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="29.99"
                                        />
                                        {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
                                    </div>
                                )}

                                <div className={isFree ? "md:col-span-2" : ""}>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                                        Course Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="open">Open for Enrollment</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Publishing Options */}
                        <div className="border-t border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Publishing Options</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_published"
                                        name="is_published"
                                        className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="is_published" className="ml-2 text-sm text-gray-300 ">
                                        Publish this course immediately
                                    </label>
                                    {errors.is_published &&
                                        <p className="text-red-400 text-sm mt-1">{errors.is_published}</p>}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_featured"
                                        name="is_featured"
                                        className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="is_featured" className="ml-2 text-sm text-gray-300 block">
                                        Feature this course on homepage
                                    </label>
                                    {errors.is_featured &&
                                        <p className="text-red-400 text-sm mt-1">{errors.is_featured}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail */}
                        <div className="border-t border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Course Thumbnail</h3>
                            <div>
                                <label htmlFor="thumbnail_url" className="block text-sm font-medium text-gray-300 mb-2">
                                    Thumbnail URL
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="url"
                                        id="thumbnail_url"
                                        name="thumbnail_url"
                                        className="flex-1 px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://example.com/thumbnail.jpg"
                                    />
                                    <button
                                        type="button"
                                        className="px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <Image className="w-4 h-4"/>
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="border-t border-gray-700 pt-6 flex justify-end space-x-4">
                            <button
                                type="button"
                                className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Eye className="w-4 h-4"/>
                                Preview
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Save className="w-4 h-4"/>
                                Create course
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

export default CreateCourse;
