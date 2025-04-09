import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CourseService} from "../services/api.js";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import Loader from "../components/common/Loader.jsx";
import "./CourseDetails.css";

function CourseDetails() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function() {
        async function fetchCourse() {
            setLoading(true);
            try {
                const response = await CourseService.getCourseById(id);
                console.log(response.data);
                setCourse(response.data);
                setError(null);
            } catch(err) {
                setError(err)
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchCourse();
    }, [id])

    // Display loading state
    if (loading) {
        return (
            <div className="container loading-container">
                <Loader />
            </div>
        );
    }

    // Display error state
    if (error || !course) {
        return (
            <div className="container error-container">
                <ErrorMessage message={error || 'Course not found'} />
                <div className="back-link">
                    <Link to="/courses" className="btn">Back to Courses</Link>
                </div>
            </div>
        );
    }

    // Display the course details
    return (
        <div className="course-detail-page">
            {/* Course Hero Section */}
            <div className="course-hero">
                <div className="container course-hero-container">
                    <div className="course-hero-content">
                        {/* Course Categories and Difficulty */}
                        <div className="course-badge">
                            {course.category && (
                                <span className="category-badge">{course.category.name}</span>
                            )}
                            <span className={`difficulty-badge difficulty-${course.difficulty?.toLowerCase()}`}>
                                {course.difficulty || 'All Levels'}
                            </span>
                        </div>

                        {/* Course Title */}
                        <h1>{course.title}</h1>

                        {/* Course Description */}
                        <p className="course-description">{course.description}</p>

                        {/* Course Meta Information */}
                        <div className="course-meta-info">
                            <div className="meta-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span>{course.duration || 0} minutes</span>
                            </div>

                            <div className="meta-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                                <span>{course.lessons_count || 0} lessons</span>
                            </div>

                            {course.status && (
                                <div className="meta-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span>Status: {course.status}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Course Pricing and Enrollment */}
                    <div className="course-hero-cta">
                        <div className="course-price">
                            {course.price === 0 ? (
                                <span className="free-tag">Free</span>
                            ) : (
                                <span className="price-tag">${course.price}</span>
                            )}
                        </div>
                        <button className="btn enroll-btn">Enroll Now</button>
                        <button
                            className="btn back-btn"
                            onClick={() => navigate('/courses')}
                        >
                            Back to Courses
                        </button>
                    </div>
                </div>
            </div>

            {/* Course Content Section */}
            <div className="container course-detail-container">
                <div className="course-main-content">
                    {/* About Section */}
                    <div className="course-section about-section">
                        <h2>About This Course</h2>
                        <p>{course.description}</p>

                        {/* Tags Section */}
                        {course.tags && course.tags.length > 0 && (
                            <div className="tags-container">
                                <h3>Tags</h3>
                                <div className="tags-list">
                                    {course.tags.map(tag => (
                                        <span key={tag.id} className="tag">{tag.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;