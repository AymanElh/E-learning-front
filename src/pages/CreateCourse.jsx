import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseService } from '../services/api';
import CourseForm from '../components/courses/CourseForm';
import ErrorMessage from '../components/common/ErrorMessage';
import './CreateCourse.css';

const CreateCourse = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (courseData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await CourseService.createCourse(courseData);

            if (response.success) {
                // Navigate to the new course page
                navigate(`/courses/${response.data.id}`);
            } else {
                throw new Error(response.message || 'Failed to create course');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while creating the course. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-course-page">
            <div className="container">
                <div className="page-header">
                    <h1>Create New Course</h1>
                    <p>Fill in the details below to create a new course</p>
                </div>

                {error && <ErrorMessage message={error} />}

                <CourseForm
                    onSubmit={handleSubmit}
                    buttonText={isSubmitting ? 'Creating...' : 'Create Course'}
                />

                <div className="form-actions-bottom">
                    <button
                        className="btn cancel-btn"
                        onClick={() => navigate('/courses')}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;