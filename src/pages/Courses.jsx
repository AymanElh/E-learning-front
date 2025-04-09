import React, {useState, useEffect} from "react";
import { CourseService } from "../services/api.js";
import CourseList from "../components/courses/CourseList.jsx";
import Loader from "../components/common/Loader.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import './Courses.css';

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