import AdminLayout from "../../../components/layout/admin/AdminLayout.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {use, useEffect, useState} from "react";
import {courseService} from "../../../services/courseService.js";
import {ArrowLeft, Eye, Save, Image} from "lucide-react";
import {categoryService} from "../../../services/categoryService.js";
import Spinner from "../../../components/common/Spinner.jsx";
import ErrorMessage from "../../../components/common/ErrorMessage.jsx";

function EditCourse() {
    const navigate = useNavigate();
    const courseId = useParams();

    const [course, setCourse] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isFree, setIsFree] = useState(false);
    const [categoryError, setCategoryError] = useState("");
    const [errors, setErrors] = useState({});
    const [courseError, setCourseError] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
        fetchCourse(courseId);
        setPageLoading(false);
    }, [courseId]);

    async function fetchCategories() {
        try {
            const result = await categoryService.getAllCategories();
            if (result.success) {
                setCategories(result.data);
            } else {
                setCategoryError(result.message || 'Failed to load categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategoryError('An unexpected error occurred while loading categories');
        }

    }

    async function fetchCourse(courseId) {
        try {
            const result = await courseService.getCourseById(courseId.id);
            if (result.success) {
                console.log(result.data)
                setCourse(result.data);
                setIsFree(result.data.is_free === 1 || result.data.is_free === true);
            } else {
                console.log("failed to fetch course");
                setCourseError(result.message)
            }
        } catch (error) {
            console.error("Error fetching course: ", error);
            setCourseError("An unexpected error occurred while loading course");
        }
    }

    async function handleCourseUpdate(formData) {
        setLoading(true);
        const courseData = {};
        for (const [key, value] of formData.entries()) {
            if (key === 'is_free' || key === 'is_published' || key === 'is_featured') {
                courseData[key] = value === 'on';
            } else {
                courseData[key] = value;
            }
        }
        console.log("updated course data: ", courseData);

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
            return;
        }

        setErrors({});

        // make the put request
        try {
            const result = await courseService.updateCourse(courseId.id, courseData);
            if (result.success) {
                alert("Course updated successfully");
                navigate('/admin/courses');
            } else {
                if (result.message === "Validation failed") {
                    const backendErrors = result.errors;
                    for (const [field, messages] of Object.entries(result.errors)) {
                        backendErrors[field] = Array.isArray(messages) ? messages[0] : messages;
                    }
                    setErrors(backendErrors);
                } else {
                    console.error("Error: ", result.message);
                    alert(`Error ${result.message}`)
                }
            }
        } catch (err) {
            console.error("Unexpected error updating course: ", err);
        } finally {
            setLoading(false);
        }
    }

    if (pageLoading) {
        return (
            <AdminLayout>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <Spinner/>
                    </div>
                </div>
            </AdminLayout>
        )
    }
    console.log(errors);

    if (courseError) {
        return (
            <AdminLayout>
                <div className="max-w-4xl mx-auto">
                    <ErrorMessage message={courseError} type="error"/>
                    <button
                        onClick={() => navigate('/admin/courses')}
                        className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                    >
                        Back to Courses
                    </button>
                </div>
            </AdminLayout>
        )
    }

    if (!course) {
        return (
            <AdminLayout>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <p className="text-white">Course not found</p>
                    </div>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg shadow-lg">
                    <div className="p-6 border-b border-gray-700">
                        <div className="flex items-center gap-3 mb-2">
                            <button
                                onClick={() => navigate('/admin/courses')}
                                className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4"/>
                            </button>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                Edit Course: {course.title}
                            </h2>
                        </div>
                        <p className="text-gray-400">Update course details</p>
                    </div>

                    {/* Show category error if exists */}
                    {categoryError && (
                        <div className="p-6 pb-0">
                            <ErrorMessage
                                message={categoryError}
                                type="error"
                                onClose={() => setCategoryError('')}
                            />
                        </div>
                    )}

                    {/* Form */}
                    <form className="p-6 space-y-6" action={handleCourseUpdate}>
                        {/* Basic Information */}
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
                                    defaultValue={course.title}
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
                                    defaultValue={course.slug}
                                    className="w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="course-slug"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    defaultValue={course.description}
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
                                    defaultValue={course.duration}
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
                                    defaultValue={course.difficulty}
                                    className="w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="course-category"
                                       className="block text-sm font-medium text-gray-300 mb-2">
                                    Category
                                </label>
                                <select
                                    id="course-category"
                                    name="category_id"
                                    defaultValue={course.category?.id || ""}
                                    disabled={categoryError}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id &&
                                    <p className="text-red-400 text-sm mt-1">{errors.category_id}</p>}
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="border-t border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Pricing</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="is_free"
                                            name="is_free"
                                            defaultChecked={course.is_free === 1 || course.is_free === true}
                                            onChange={(e) => setIsFree(e.target.checked)}
                                            className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="is_free" className="ml-2 text-sm text-gray-300">
                                            This is a free course
                                        </label>
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
                                            defaultValue={course.price}
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
                                        defaultValue={course.status}
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
                                        defaultChecked={course.is_published === 1 || course.is_published === true}
                                        className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="is_published" className="ml-2 text-sm text-gray-300">
                                        Publish this course immediately
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_featured"
                                        name="is_featured"
                                        defaultChecked={course.is_featured === 1 || course.is_featured === true}
                                        className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="is_featured" className="ml-2 text-sm text-gray-300">
                                        Feature this course on homepage
                                    </label>
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
                                        defaultValue={course.thumbnail_url}
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
                                onClick={() => navigate('/admin/courses')}
                                className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Eye className="w-4 h-4"/>
                                Preview
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Save className="w-4 h-4"/>
                                {loading ? 'Updating...' : 'Update Course'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

export default EditCourse;
