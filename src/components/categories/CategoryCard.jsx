import React from 'react';
import './CategoryCard.css';

function CategoryCard({category}) {
    // console.log(category);
    return (
        <div className="category-card">
            <div className="category-icon">
                {/*<span>{category.name.charAt(0)}</span>*/}
            </div>
            <div className="category-content">
                <h3>{category.name}</h3>
            </div>
        </div>
    );
}

export default CategoryCard;