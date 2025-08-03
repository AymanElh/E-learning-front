import PublicLayout from "../../../components/layout/public/PublicLayout.jsx";
import {FilterIcon, SearchIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {courseService} from "../../../services/courseService.js";
import CourseCard from "../../../components/common/CourseCard.jsx";

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    // const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");


    useEffect(() => {
        fetchCourses();
    }, []);
    console.log(courses);

    useEffect(() => {
        filterCourses();
    }, [courses, searchTerm, selectedCategory, selectedDifficulty, selectedPriceFilter]);

    const categories = [
        "all",
        "Web Development",
        "Data Science",
        "Design",
        "Marketing",
        "Photography",
        "Business",
    ];

    const difficultyLevels = [
        "all",
        "Beginner",
        "Intermediate",
        "Advanced"
    ];

    const priceFilters = [
        { value: "all", label: "All Prices" },
        { value: "free", label: "Free" },
        { value: "paid", label: "Paid" }
    ];

    async function fetchCourses() {
        setLoading(true);
        setError('');

        const result = await courseService.getOpenCourses();
        console.log(result);
        if (result.success) {
            setCourses(result.data);
        } else {
            setError(result.message);
        }
        setLoading(false);
    }

    function filterCourses() {
        let filtered = [...courses];

        if (searchTerm.trim()) {
            filtered = filtered.filter(course => {
                return course.title.toLowerCase().includes(searchTerm.trim()) ||
                    course.description.includes(searchTerm.trim()) ||
                    course.instructor.name.toLowerCase().includes(searchTerm.trim())
            })
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(course => {
                return course.category.name === selectedCategory
            });
        }

        if (selectedDifficulty !== 'all') {
            filtered = filtered.filter(course => {
                return course.level === selectedDifficulty
            });
        }

        if (selectedPriceFilter !== 'all') {
            filtered = filtered.filter(course => {
                if (selectedPriceFilter === 'free') {
                    return course.isFree;
                } else if (selectedPriceFilter === 'paid') {
                    return course.price > 0;
                }
                return true;
            });
        }

        setFilteredCourses(filtered);
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value);
    }

    function handleCategoryChange(e) {
        setSelectedCategory(e.target.value);
    }

    function handleDifficultyChange(e) {
        setSelectedDifficulty(e.target.value);
    }

    function handlePriceFilterChange(e) {
        setSelectedPriceFilter(e.target.value);
    }

    console.log(courses);

    return (
        <PublicLayout>
            {/*Page header*/}
            <div className="bg-gray-100 dark:bg-gray-800 py-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold text-gray-600 dark:text-white mb-4">All courses</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Discover our comprehensive collection of
                        expert-led courses</p>
                </div>
            </div>

            {/*Search and filter*/}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-6">
                <div className="container mx-auto py-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/*Search*/}
                        <div className="flex-1 relative">
                            <SearchIcon
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search courses ..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/*Filters Container*/}
                        <div className="flex flex-col md:flex-row gap-4">
                            {/*Filter by category*/}
                            <div className="relative">
                                <FilterIcon
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px]"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category === "all" ? "All Categories" : category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/*Filter by difficulty*/}
                            <div className="relative">
                                <FilterIcon
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <select
                                    value={selectedDifficulty}
                                    onChange={handleDifficultyChange}
                                    className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
                                >
                                    {difficultyLevels.map((level) => (
                                        <option key={level} value={level}>
                                            {level === "all" ? "All Levels" : level}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/*Filter by price*/}
                            <div className="relative">
                                <FilterIcon
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <select
                                    value={selectedPriceFilter}
                                    onChange={handlePriceFilterChange}
                                    className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
                                >
                                    {priceFilters.map((filter) => (
                                        <option key={filter.value} value={filter.value}>
                                            {filter.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(selectedCategory !== "all" || selectedDifficulty !== "all" || selectedPriceFilter !== "all") && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Active filters:</span>
                            {selectedCategory !== "all" && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                    Category: {selectedCategory}
                                    <button
                                        onClick={() => setSelectedCategory("all")}
                                        className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {selectedDifficulty !== "all" && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                    Level: {selectedDifficulty}
                                    <button
                                        onClick={() => setSelectedDifficulty("all")}
                                        className="ml-2 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {selectedPriceFilter !== "all" && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                                    Price: {priceFilters.find(f => f.value === selectedPriceFilter)?.label}
                                    <button
                                        onClick={() => setSelectedPriceFilter("all")}
                                        className="ml-2 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setSelectedCategory("all");
                                    setSelectedDifficulty("all");
                                    setSelectedPriceFilter("all");
                                }}
                                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Results Count */}
                    <div className="mt-4">
                        <p className="text-gray-600 dark:text-gray-300">
                            Showing {filteredCourses.length} of {courses.length} courses
                        </p>
                    </div>
                </div>
            </div>


            {/* Error Message */}
            {error && (
                <div
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mx-6 mt-6">
                    <div className="text-red-800 dark:text-red-400">
                        <p>{error}</p>
                        <button
                            onClick={fetchCourses}
                            className="mt-2 text-sm underline hover:no-underline"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            )}

            {/*Courses cards*/}
            <div className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading courses...</span>
                        </div>
                    ) : filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map(course => (
                                <CourseCard key={course.id} course={course}/>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                {searchTerm || selectedCategory !== "all" || selectedDifficulty !== "all" || selectedPriceFilter !== "all"
                                    ? "No courses found matching your criteria."
                                    : "No courses available at the moment."
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}

export default CoursesPage;

