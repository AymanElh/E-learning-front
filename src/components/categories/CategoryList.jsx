import React from 'react';
import CategoryCard from './CategoryCard';
import './CategoryList.css';

function CategoryList({categories}) {
    // console.table("categories: ", categories);
    if(!categories || categories.length === 0) {
        return (
            <div className="empty-categories">
                <p>No Categories to shows here</p>
            </div>
        )
    }
    return (
        <div className="category-list">
            {categories.map((category, index) => {
                // Check if category has id
                const key = category.id ? category.id : index;

                return (
                    <div className="category-item" key={key}>
                        <CategoryCard category={category} />
                    </div>
                );
            })}
        </div>
    )
}

export default CategoryList;