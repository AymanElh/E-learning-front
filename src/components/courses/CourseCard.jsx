import React from 'react';
import './CourseCard.css';
import {Link} from "react-router-dom";

function CourseCard({course}) {
    return (<div className="course-card">
            <div className="course-image">
                {course.thumbnail_url ? (<img src={course.thumbnail_url} alt={course.title}/>) : (
                    <div className="placeholder-image">
                        <span>{course.title.charAt(0)}</span>
                    </div>)}
                {course.is_free && <span className="badge-free">Free</span>}
            </div>
            <div className="course-content">
                <h3>{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                    <div className="course-stats">
                        <span className="price">
                          {course.is_free ? 'Free' : `$${course.price}`}
                        </span>
                    </div>
                </div>
                <Link to={`/courses/${course.id}`} className="btn view-course">
                    View Course
                </Link>
            </div>
        </div>

    )
}

export default CourseCard;