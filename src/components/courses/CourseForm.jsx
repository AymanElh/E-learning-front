import React, { useState, useEffect } from 'react';
import { CategoryService, TagService } from '../../services/api';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import './CourseForm.css';

const CourseForm = ({ course = null, onSubmit, buttonText = 'Save Course' }) => {
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: 0,
        difficulty: 'beginner',
        status: 'draft',
        price: 0,
        category_id: '',
        tag_ids: []
    });

    // Categories and Tags for dropdowns
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    // Loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load categories and tags when component mounts
    useEffect(() => {
        const fetchFormData = async () => {
            setLoading(true);
            try {
                // Fetch categories and tags in parallel
                const [categoriesResponse, tagsResponse] = await Promise.all([
                    CategoryService.getAllCategories(),
                    TagService.getAllTags()
                ]);
                console.log(categoriesResponse.categories);
                setCategories(categoriesResponse.categories || []);
                setTags(tagsResponse.data || []);
                setError(null);
            } catch (err) {
                setError('Failed to load form data. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFormData();
    }, []);

    // If editing a course, populate form with course data
    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                duration: course.duration || 0,
                difficulty: course.difficulty || 'beginner',
                status: course.status || 'draft',
                price: course.price || 0,
                category_id: course.category?.id || '',
                tag_ids: course.tags?.map(tag => tag.id) || []
            });
        }
    }, [course]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle checkbox/multi-select changes
    const handleTagChange = (tagId) => {
        setFormData(prev => {
            const tagIds = [...prev.tag_ids];

            if (tagIds.includes(tagId)) {
                // Remove tag if already selected
                return {
                    ...prev,
                    tag_ids: tagIds.filter(id => id !== tagId)
                };
            } else {
                // Add tag if not selected
                return {
                    ...prev,
                    tag_ids: [...tagIds, tagId]
                };
            }
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert numeric values
        const submissionData = {
            ...formData,
            price: parseFloat(formData.price),
            duration: parseInt(formData.duration, 10),
            category_id: parseInt(formData.category_id, 10)
        };

        onSubmit(submissionData);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="course-form-container">
            {error && <ErrorMessage message={error} />}

            <form className="course-form" onSubmit={handleSubmit}>
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
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="duration">Duration (minutes) *</label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>

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
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="difficulty">Difficulty Level *</label>
                        <select
                            id="difficulty"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            required
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status *</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="category_id">Category *</label>
                    <select
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        required
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
                    <label>Tags</label>
                    <div className="tags-checkbox-group">
                        {tags.map(tag => (
                            <div key={tag.id} className="tag-checkbox">
                                <input
                                    type="checkbox"
                                    id={`tag-${tag.id}`}
                                    checked={formData.tag_ids.includes(tag.id)}
                                    onChange={() => handleTagChange(tag.id)}
                                />
                                <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn submit-btn">
                        {buttonText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseForm;