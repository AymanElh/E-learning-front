import React, {useState, useEffect} from "react";
import {CategoryService} from "../services/api.js";
import CategoryList from "../components/categories/CategoryList.jsx";
import Loader from "../components/common/Loader.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import './Categories.css';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async function() {
            try {
                setLoading(true);
                const categoriesResponse = await Promise.all([
                    CategoryService.getAllCategories()
                ]);
                // console.log("response from categories: ", categoriesResponse[0]);
                setCategories(categoriesResponse[0].categories);
            } catch(err) {
                console.log(err);
                setError("Error fetching categories, please try again later");
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, []);

    return (
        <div className="categories-page">
            <div className="hero-section">
                <div className="container">
                    <h1>Course Categories</h1>
                    <p>Browse our diverse range of course categories</p>
                </div>
            </div>

            <div className="container categories-container">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <ErrorMessage message={error} />
                    ) : (
                    <>
                        <CategoryList categories={categories} />
                    </>
                )}
            </div>
        </div>
    )
}

export default Categories;