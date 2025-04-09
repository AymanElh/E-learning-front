import React from 'react';
import CourseCard from './CourseCard.jsx';
import './CourseList.css'

function CourseList({ courses }) {
    if (!courses || courses.length === 0) {
        return (
            <div className="empty-courses">
                <p>No courses available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="course-list">
            {courses.map(course => (
                <div className="course-item" key={course.id}>
                    <CourseCard course={course} />
                </div>
            ))}
        </div>
    );
}

export default CourseList;