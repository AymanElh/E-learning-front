import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {CategoryService, CourseService} from '../services/api.js';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import Loader from '../components/common/Loader.jsx';
import './EditCourse.css';

function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        is_free: false,
        difficulty: 'beginner',
        status: 'draft',
        duration: 0,
        category_id: '',
        thumbnail_url: ''
    });

    // Categories state
    const [categories, setCategories] = useState([]);

    // Fetch course data and categories on component mount
    useEffect(() => {
        const fetchCourseAndCategories = async () => {
            setIsLoading(true);
            try {
                // Fetch course data
                const courseResponse = await CourseService.getCourseById(id);

                // Fetch categories
                const categoriesResponse = await CategoryService.getAllCategories();

                setCategories(categoriesResponse.data || []);

                // Update form data with course data
                const course = courseResponse.data;
                setFormData({
                    title: course.title || '',
                    description: course.description || '',
                    price: course.is_free ? 0 : (course.price || 0),
                    is_free: course.is_free || false,
                    difficulty: course.difficulty || 'beginner',
                    status: course.status || 'draft',
                    duration: course.duration || 0,
                    category_id: course.category?.id || '',
                    thumbnail_url: course.thumbnail_url || ''
                });

                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load course data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseAndCategories();
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle special cases (checkboxes, numbers)
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked,
                // If the course becomes free, set price to 0
                ...(name === 'is_free' && checked ? { price: 0 } : {})
            }));
        } else if (type === 'number') {
            setFormData(prev => ({
                ...prev,
                [name]: parseFloat(value) || 0
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage('');

        try {
            // Prepare data for API
            const courseData = {
                ...formData,
                // Ensure price is 0 if the course is free
                price: formData.is_free ? 0 : formData.price
            };

            // Send update request
            const response = await CourseService.updateCourse(id, courseData);
            console.log(response);
            // Handle success
            setSuccessMessage('Course updated successfully!');

            // Redirect after a short delay
            setTimeout(() => {
                navigate(`/courses/${id}`);
            }, 2000);

        } catch (err) {
            console.error('Error updating course:', err);
            setError(err.message || 'Failed to update course. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle cancel button
    const handleCancel = () => {
        navigate(`/courses/${id}`);
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="container loading-container">
                <Loader />
            </div>
        );
    }

    return (
        <div className="edit-course-page">
            <div className="container">
                <div className="edit-course-header">
                    <h1>Edit Course</h1>
                    <div className="edit-course-actions">
                        <button
                            className="btn cancel-btn"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn save-btn"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span>
                                    Saving...
                                </>
                            ) : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {error && <ErrorMessage message={error} />}
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}

                <form className="edit-course-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {/* Basic Information */}
                        <div className="form-section">
                            <h2>Basic Information</h2>

                            <div className="form-group">
                                <label htmlFor="title">Course Title *</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter course title"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter course description"
                                    rows="5"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_id">Category</label>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="thumbnail_url">Thumbnail URL</label>
                                <input
                                    type="url"
                                    id="thumbnail_url"
                                    name="thumbnail_url"
                                    value={formData.thumbnail_url}
                                    onChange={handleChange}
                                    placeholder="Enter thumbnail image URL"
                                />
                                {formData.thumbnail_url && (
                                    <div className="thumbnail-preview">
                                        <img
                                            src={formData.thumbnail_url}
                                            alt="Course thumbnail preview"
                                            onError={(e) => {
                                                e.target.src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Course Details */}
                        <div className="form-section">
                            <h2>Course Details</h2>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="is_free"
                                    name="is_free"
                                    checked={formData.is_free}
                                    onChange={handleChange}
                                />
                                <label htmlFor="is_free">This is a free course</label>
                            </div>

                            {!formData.is_free && (
                                <div className="form-group">
                                    <label htmlFor="price">Price ($) *</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        required={!formData.is_free}
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="duration">Duration (minutes)</label>
                                <input
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="difficulty">Difficulty Level</label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div className="form-note">
                                <p>* Required fields</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCourse;