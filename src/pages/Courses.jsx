import React, {useState, useEffect} from "react";
import { CourseService } from "../services/api.js";
import CourseList from "../components/courses/CourseList.jsx";
import Loader from "../components/common/Loader.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import './Courses.css';
import {Link} from "react-router-dom";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCourses() {
            try {
                setLoading(true);
                const response = await CourseService.getAllCourses();
                setCourses(response.data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch Courses");
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    return (
        <div className="courses-page">
            <div className="hero-section">
                <div className="container">
                    <h1>Explore Our Courses</h1>
                    <p>Discover high-quality courses taught by industry experts</p>
                    <div className="hero-actions">
                        <Link to="/courses/create" className="btn create-course-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Create New Course
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container courses-container">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <ErrorMessage message={error} />
                ) : (
                    <>
                        <CourseList courses={courses} />
                    </>
                )}
            </div>
        </div>
    )
}

export default Courses;