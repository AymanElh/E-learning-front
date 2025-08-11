import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import AdminLayout from "../../../components/layout/admin/AdminLayout.jsx";
import {courseService} from "../../../services/courseService.js";
import Spinner from "../../../components/common/Spinner.jsx";
import ErrorMessage from "../../../components/common/ErrorMessage.jsx";

const CoursePreview = () => {
    const {id} = useParams();
    const [course, setCourse] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedSections, setExpandedSections] = useState(new Set());

    console.log(id);

    useEffect(() => {
        fetchCourseData();
    }, [id]);

    async function fetchCourseData() {
        setLoading(true);
        setError('');

        try {
            // Fetch course details
            const courseResult = await courseService.getCourseById(id);
            if (courseResult.success) {
                setCourse(courseResult.data);
            } else {
                setError(courseResult.message);
                setLoading(false);
                return;
            }

            // Fetch course enrollments
            const enrollmentsResult = await courseService.getCourseEnrollments(id);
            if (enrollmentsResult.success) {
                setEnrollments(enrollmentsResult.data);
            } else {
                // If enrollments fail, we still show the course but with empty enrollments
                console.warn("Failed to fetch enrollments:", enrollmentsResult.message);
                setEnrollments([]);
            }
        } catch (err) {
            console.error("Error fetching course data:", err);
            setError("An unexpected error occurred while fetching course data");
        }

        setLoading(false);
    }

    console.log(expandedSections);
    const toggleSection = (sectionId) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
    };

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
                <ErrorMessage message={error}/>
            </AdminLayout>
        );
    }

    if (!course) {
        return (
            <AdminLayout>
                <ErrorMessage message="Course not found"/>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Course Information Card */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-700">
                        <h1 className="text-2xl font-bold text-white mb-4">Course Preview</h1>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Course Thumbnail */}
                            <div className="lg:w-1/3">
                                <img
                                    src={course.thumbnail_url || "https://via.placeholder.com/300x200"}
                                    alt={course.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>

                            {/* Course Details */}
                            <div className="lg:w-2/3 space-y-4">
                                <h2 className="text-3xl font-bold text-white">{course.title}</h2>
                                <p className="text-gray-300 text-lg">{course.description}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Duration:</span>
                                            <span className="text-white">{course.duration} minutes</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Difficulty:</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                course.difficulty === 'beginner'
                                                    ? 'bg-green-900 text-green-300'
                                                    : course.difficulty === 'intermediate'
                                                        ? 'bg-yellow-900 text-yellow-300'
                                                        : 'bg-red-900 text-red-300'
                                            }`}>
                                                {course.difficulty}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Status:</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                course.status === 'open'
                                                    ? 'bg-green-900 text-green-300'
                                                    : 'bg-red-900 text-red-300'
                                            }`}>
                                                {course.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Price:</span>
                                            <span className="text-white">
                                                {course.is_free ? (
                                                    <span className="text-green-400 font-medium">Free</span>
                                                ) : (
                                                    <span>${course.price}</span>
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Total Students:</span>
                                            <span className="text-white">{course.totalStudents || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Published:</span>
                                            <span className="text-white">
                                                {course.is_published ? (
                                                    <span className="text-green-400">✓ Published</span>
                                                ) : (
                                                    <span className="text-gray-500">✗ Draft</span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {course.instructor && (
                                    <div className="pt-4 border-t border-gray-700">
                                        <span className="text-gray-400">Instructor: </span>
                                        <span className="text-white font-medium">
                                            {course.instructor.name || course.instructor}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Sections */}
                {course.sections && course.sections.length > 0 && (
                    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-700">
                            <h2 className="text-xl font-bold text-white">Course Sections</h2>
                            <p className="text-gray-400 mt-1">Total sections: {course.sections.length}</p>
                        </div>

                        <div className="p-6 space-y-4">
                            {course.sections.map((section) => (
                                <div key={section.id} className="border border-gray-700 rounded-lg overflow-hidden">
                                    {/* Section Header */}
                                    <div
                                        className="p-4 bg-gray-700 cursor-pointer hover:bg-gray-600 transition-colors"
                                        onClick={() => toggleSection(section.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                                                <p className="text-gray-300 text-sm mt-1">{section.description}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className="text-gray-400 text-sm">
                                                        {section.lessons_count} lesson{section.lessons_count !== 1 ? 's' : ''}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        section.is_published
                                                            ? 'bg-green-900 text-green-300'
                                                            : 'bg-gray-900 text-gray-300'
                                                    }`}>
                                                        {section.is_published ? 'Published' : 'Draft'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <svg
                                                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                                                        expandedSections.has(section.id) ? 'rotate-180' : ''
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M19 9l-7 7-7-7"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Content (Lessons) */}
                                    {expandedSections.has(section.id) && (
                                        <div className="p-4 bg-gray-800 border-t border-gray-700">
                                            {section.lessons && section.lessons.length > 0 ? (
                                                <div className="space-y-3">
                                                    <h4 className="text-md font-medium text-white mb-3">Lessons:</h4>
                                                    {section.lessons.map((lesson, index) => (
                                                        <div key={lesson.id}
                                                             className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-gray-400 text-sm font-medium">
                                                                        {index + 1}.
                                                                    </span>
                                                                    <div>
                                                                        <h5 className="text-white font-medium">{lesson.title}</h5>
                                                                        {lesson.description && (
                                                                            <p className="text-gray-300 text-sm mt-1">{lesson.description}</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <span
                                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                        lesson.lesson_type === 'video'
                                                                            ? 'bg-blue-900 text-blue-300'
                                                                            : lesson.lesson_type === 'article'
                                                                                ? 'bg-purple-900 text-purple-300'
                                                                                : 'bg-gray-900 text-gray-300'
                                                                    }`}>
                                                                    {lesson.lesson_type}
                                                                </span>
                                                                {lesson.duration_minutes && (
                                                                    <span className="text-gray-400 text-sm">
                                                                        {lesson.duration_minutes} min
                                                                    </span>
                                                                )}
                                                                <span
                                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                        lesson.is_published
                                                                            ? 'bg-green-900 text-green-300'
                                                                            : 'bg-gray-900 text-gray-300'
                                                                    }`}>
                                                                    {lesson.is_published ? 'Published' : 'Draft'}
                                                                </span>
                                                                {lesson.is_free_preview ? (
                                                                    <span
                                                                        className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
                                                                        Free Preview
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center text-gray-400 py-4">
                                                    <p>No lessons found in this section.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Enrollments Table */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-700">
                        <h2 className="text-xl font-bold text-white">Course Enrollments</h2>
                        <p className="text-gray-400 mt-1">Total enrollments: {enrollments.length}</p>
                    </div>

                    {enrollments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-300">
                                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3">ID</th>
                                    <th className="px-6 py-3">Student Name</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Enrollment Date</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Progress</th>
                                </tr>
                                </thead>
                                <tbody>
                                {enrollments.map((enrollment) => (
                                    <tr key={enrollment.id}
                                        className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                                        <td className="px-6 py-4 font-medium text-white">{enrollment.id}</td>
                                        <td className="px-6 py-4 text-white">
                                            {enrollment.user?.name || enrollment.user.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {enrollment.user?.email || enrollment.user.email || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {enrollment.createdAt ? new Date(enrollment.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    enrollment.status === 'active'
                                                        ? 'bg-green-900 text-green-300'
                                                        : enrollment.status === 'completed'
                                                            ? 'bg-blue-900 text-blue-300'
                                                            : 'bg-gray-900 text-gray-300'
                                                }`}>
                                                    {enrollment.status || 'active'}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {enrollment.progress ? `${enrollment.progress}%` : '0%'}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-6 text-center text-gray-400">
                            <p>No enrollments found for this course.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default CoursePreview;
