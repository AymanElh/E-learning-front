import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import PublicLayout from "../../../components/layout/public/PublicLayout.jsx";
import {courseService} from "../../../services/courseService.js";
import {
    BookOpenIcon,
    ClockIcon,
    StarIcon,
    UsersIcon,
    PlayIcon,
    CheckCircleIcon,
    UserIcon,
    CalendarIcon,
    TagIcon,
    GlobeIcon,
    AwardIcon,
    ArrowLeftIcon
} from "lucide-react";

function CoursePreviewPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        if (id) {
            fetchCourse();
        }
    }, [id]);

    async function fetchCourse() {
        setLoading(true);
        setError("");

        const result = await courseService.getCourseById(id);
        if (result.success) {
            setCourse(result.data);
        } else {
            setError(result.message);
        }
        setLoading(false);
    }

    async function handleEnroll() {
        setEnrolling(true);
        // TODO: Implement enrollment service call
        // const result = await enrollmentService.enrollInCourse(id);
        // if (result.success) {
        //     // Handle successful enrollment
        // } else {
        //     // Handle enrollment error
        // }
        setEnrolling(false);
    }

    function handleGoBack() {
        navigate(-1);
    }

    if (loading) {
        return (
            <PublicLayout>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600 dark:text-gray-300">Loading course...</span>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    if (error) {
        return (
            <PublicLayout>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-red-500 mb-4">
                            <BookOpenIcon className="w-16 h-16 mx-auto"/>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course Not Found</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
                        <button
                            onClick={handleGoBack}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    if (!course) {
        return (
            <PublicLayout>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course not found</h2>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            {/* Back Button */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-6 py-4">
                    <button
                        onClick={handleGoBack}
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2"/>
                        Back to Courses
                    </button>
                </div>
            </div>

            {/* Course Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Course Info */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <span
                                    className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                    {course.category?.name}
                                </span>
                                <span
                                    className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                    {course.difficulty}
                                </span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{course.title}</h1>
                            <p className="text-xl text-blue-100 mb-6">{course.description}</p>

                            {/* Course Stats */}
                            <div className="flex flex-wrap items-center gap-6 text-blue-100">
                                <div className="flex items-center gap-2">
                                    <StarIcon className="w-5 h-5 text-yellow-400 fill-current"/>
                                    <span className="font-medium">{course.rating || 'New'}</span>
                                    <span>({course.reviews || 0} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <UsersIcon className="w-5 h-5"/>
                                    <span>{course.students || 0} students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="w-5 h-5"/>
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <GlobeIcon className="w-5 h-5"/>
                                    <span>English</span>
                                </div>
                            </div>

                            {/* Instructor Info */}
                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <UserIcon className="w-6 h-6"/>
                                </div>
                                <div>
                                    <p className="text-blue-100">Instructor</p>
                                    <p className="font-semibold text-lg">{course.instructor?.name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Course Preview Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6">
                                {/* Course Image/Video Preview */}
                                <div
                                    className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                                    <PlayIcon className="w-16 h-16 text-white"/>
                                    <div
                                        className="absolute inset-0 bg-black/20 hover:bg-black/30 transition cursor-pointer"></div>
                                </div>

                                {/* Price */}
                                <div className="text-center mb-6">
                                    {course.isFree || course.price === 0 ? (
                                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                            Free
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                ${course.price}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Enroll Button */}
                                <button
                                    onClick={handleEnroll}
                                    disabled={enrolling}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition mb-4"
                                >
                                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                </button>

                                {/* Course Features */}
                                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-4 h-4 text-green-500"/>
                                        <span>Full lifetime access</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-4 h-4 text-green-500"/>
                                        <span>Access on mobile and TV</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-4 h-4 text-green-500"/>
                                        <span>Certificate of completion</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-4 h-4 text-green-500"/>
                                        <span>30-day money-back guarantee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="bg-white dark:bg-gray-900 py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* What you'll learn */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    What you'll learn
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.learningOutcomes?.map((outcome, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"/>
                                            <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                                        </div>
                                    )) || (
                                        <div className="text-gray-500 dark:text-gray-400">
                                            Learning outcomes will be updated soon.
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Course Description */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Course Description
                                </h2>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {course.longDescription || course.description}
                                    </p>
                                </div>
                            </section>

                            {/* Course Content/Curriculum */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Course Content
                                </h2>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-600 dark:text-gray-300">
                                            {course.sections.length || 0} sections • {course.lecturesCount || 0} lectures • {course.duration}
                                        </span>
                                    </div>

                                    {course.curriculum?.length > 0 ? (
                                        <div className="space-y-4">
                                            {course.curriculum.map((section, index) => (
                                                <div key={index}
                                                     className="border border-gray-200 dark:border-gray-700 rounded-lg">
                                                    <div
                                                        className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                                            Section {index + 1}: {section.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                            {section.lectures?.length || 0} lectures
                                                            • {section.duration}
                                                        </p>
                                                    </div>
                                                    {section.lectures?.map((lecture, lectureIndex) => (
                                                        <div key={lectureIndex}
                                                             className="p-4 flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <PlayIcon className="w-4 h-4 text-gray-400"/>
                                                                <span className="text-gray-700 dark:text-gray-300">
                                                                    {lecture.title}
                                                                </span>
                                                            </div>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                {lecture.duration}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                                            Course curriculum will be available soon.
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Requirements */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Requirements
                                </h2>
                                <ul className="space-y-2">
                                    {course.requirements?.map((requirement, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span
                                                className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                            <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                                        </li>
                                    )) || (
                                        <li className="text-gray-500 dark:text-gray-400">
                                            No specific requirements - suitable for all levels
                                        </li>
                                    )}
                                </ul>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8 space-y-8">
                                {/* Instructor Card */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Your Instructor
                                    </h3>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <UserIcon className="w-8 h-8 text-white"/>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                {course.instructor?.name}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                {course.instructor?.title || 'Course Instructor'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <AwardIcon className="w-4 h-4"/>
                                            <span>{course.instructor?.coursesCount || 0} Courses</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <UsersIcon className="w-4 h-4"/>
                                            <span>{course.instructor?.studentsCount || 0} Students</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <StarIcon className="w-4 h-4"/>
                                            <span>{course.instructor?.rating || 0} Instructor Rating</span>
                                        </div>
                                    </div>
                                    {course.instructor?.bio && (
                                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-4">
                                            {course.instructor.bio}
                                        </p>
                                    )}
                                </div>

                                {/* Course Details */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Course Details
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Level:</span>
                                            <span
                                                className="font-medium text-gray-900 dark:text-white">{course.level}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                                            <span
                                                className="font-medium text-gray-900 dark:text-white">{course.duration}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Language:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">English</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">Students:</span>
                                            <span
                                                className="font-medium text-gray-900 dark:text-white">{course.students || 0}</span>
                                        </div>
                                        {course.createdAt && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">Created:</span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {new Date(course.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                        {course.lastUpdated && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">Last Updated:</span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {new Date(course.lastUpdated).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Tags */}
                                {course.tags && course.tags.length > 0 && (
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                            Course Tags
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {course.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                                                >
                                                    <TagIcon className="w-3 h-3"/>
                                                    {typeof tag === 'string' ? tag : tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

export default CoursePreviewPage;
