import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import AdminLayout from "../../../components/layout/admin/AdminLayout.jsx";
import {courseService} from "../../../services/courseService.js";
import Spinner from "../../../components/common/Spinner.jsx";
import ErrorMessage from "../../../components/common/ErrorMessage.jsx";

const CourseList = () => {
    const data = [
        {
            id: 1,
            title: "Laravel Basics",
            description: "Learn the basics of Laravel framework.",
            slug: "laravel-basics",
            duration: 120,
            difficulty: "beginner",
            status: "open",
            price: 0.0,
            is_free: true,
            is_published: true,
            is_featured: true,
            thumbnail_url: "https://via.placeholder.com/150",
            total_students: 150,
            instructor: "John Doe",
            category: "Web Development",
            subcategory: "Backend",
            published_at: "2025-07-01",
        },
        {
            id: 2,
            title: "Advanced React",
            description: "Master advanced concepts in React.",
            slug: "advanced-react",
            duration: 180,
            difficulty: "advanced",
            status: "closed",
            price: 59.99,
            is_free: false,
            is_published: false,
            is_featured: false,
            thumbnail_url: "https://via.placeholder.com/150",
            total_students: 200,
            instructor: "Jane Smith",
            category: "Frontend Development",
            subcategory: "JavaScript Frameworks",
            published_at: null,
        },
    ];

    const [courses, setCourses] = useState(data);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    async function fetchCourses() {
        setLoading(true);
        setError('');

        const result = await courseService.getAllCourses();
        console.log(result);
        if (result.success) {
            setCourses(result.data);
        } else {
            setError(result.message);
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <Spinner/>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <ErrorMessage message={error} />
            </AdminLayout>
        );
    }


    return (
        <AdminLayout>
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-700 flex justify-between ">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Courses</h2>
                    <Link
                        to="/admin/courses/create"
                        className="bg-indigo-500 px-4 py-2 text-lg font-semibold rounded-lg cursor-pointer">Add new
                        course
                    </Link>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Duration</th>
                                <th className="px-6 py-3">Difficulty</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Students</th>
                                <th className="px-6 py-3">Instructor</th>
                                <th className="px-6 py-3">Published</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {courses.map((course) => (
                                <tr key={course.id}
                                    className="bg-gray-800 border-b border-gray-700 hover:bg-gray-750 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{course.id}</td>
                                    <td className="px-6 py-4 font-medium text-white">{course.title}</td>
                                    <td className="px-6 py-4">{course.duration} min</td>
                                    <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                course.difficulty === 'beginner'
                                                    ? 'bg-green-900 text-green-300'
                                                    : course.difficulty === 'intermediate'
                                                        ? 'bg-yellow-900 text-yellow-300'
                                                        : 'bg-red-900 text-red-300'
                                            }`}>
                                                {course.difficulty}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                course.status === 'open'
                                                    ? 'bg-green-900 text-green-300'
                                                    : 'bg-red-900 text-red-300'
                                            }`}>
                                                {course.status}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {course.is_free ? (
                                            <span className="text-green-400 font-medium">Free</span>
                                        ) : (
                                            <span className="text-white">${course.price}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">{course.totalStudents}</td>
                                    <td className="px-6 py-4">{course.instructor.name ?? "Ayman"}</td>
                                    <td className="px-6 py-4">
                                        {course.is_published ? (
                                            <span className="text-green-400">✓ Published</span>
                                        ) : (
                                            <span className="text-gray-500">✗ Draft</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <Link to={`/admin/courses/${course.id}/edit`} className="text-blue-400 hover:text-blue-300 font-medium">
                                                Edit
                                            </Link>
                                            <button className="text-red-400 hover:text-red-300 font-medium">
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

                {/* Mobile/Tablet Card View */}
                <div className="lg:hidden">
                    <div className="p-4 space-y-4">
                        {courses.map((course) => (
                            <div key={course.id} className="bg-gray-700 rounded-lg p-4 space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                                        <p className="text-sm text-gray-400">ID: {course.id}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                            Edit
                                        </button>
                                        <button
                                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-400">Duration:</span>
                                        <p className="text-white">{course.duration} min</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Students:</span>
                                        <p className="text-white">{course.total_students}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Instructor:</span>
                                        <p className="text-white">{course.instructor.name ?? ""}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        course.difficulty === 'beginner'
                                            ? 'bg-green-900 text-green-300'
                                            : course.difficulty === 'intermediate'
                                                ? 'bg-yellow-900 text-yellow-300'
                                                : 'bg-red-900 text-red-300'
                                    }`}>
                                        {course.difficulty}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        course.status === 'open'
                                            ? 'bg-green-900 text-green-300'
                                            : 'bg-red-900 text-red-300'
                                    }`}>
                                        {course.status}
                                    </span>
                                    {course.is_free ? (
                                        <span
                                            className="px-2 py-1 bg-green-900 text-green-300 rounded-full text-xs font-medium">Free</span>
                                    ) : (
                                        <span
                                            className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs font-medium">${course.price}</span>
                                    )}
                                    {course.is_published ? (
                                        <span
                                            className="px-2 py-1 bg-green-900 text-green-300 rounded-full text-xs font-medium">✓ Published</span>
                                    ) : (
                                        <span
                                            className="px-2 py-1 bg-gray-600 text-gray-300 rounded-full text-xs font-medium">✗ Draft</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CourseList;
