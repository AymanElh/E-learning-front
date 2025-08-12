import {BookOpenIcon, ClockIcon, StarIcon, UsersIcon} from "lucide-react";
import {Link} from "react-router-dom";

function CourseCard({course}) {
    return (
        <div
            key={course.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg dark:shadow-gray-900/50 transition overflow-hidden"
        >
            {/* Course Image */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpenIcon className="w-16 h-16 text-white"/>
            </div>

            {/* Course Content */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {course.category.name ?? ""}
                    </span>
                    <span
                        className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {course.difficulty}
                    </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {course.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    by {course.instructor.name ?? ""}
                </p>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                        <UsersIcon className="w-4 h-4"/>
                        <span>{course.students ?? ""}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4"/>
                        <span>{course.duration}</span>
                    </div>
                </div>

                {/* Price and Enroll */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {course.is_free ?  "Free" : `$${course.price}`}
                      </span>
                    </div>
                    <Link
                        to={`/courses/${course.id}/preview`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                        Enroll Now
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default CourseCard;