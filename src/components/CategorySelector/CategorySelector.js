import React from 'react';
import styles from './CategorySelector.module.css';

const categoriesLeft = ['뷰티', '패션', '음식', '영화, 드라마'];
const categoriesRight = ['스포츠', '음악', '캐릭터', '그 외'];

const CategorySelector = ({ selectedCategories, setSelectedCategories, onComplete }) => {

    const handleCategoryClick = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((item) => item !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.categoryContainer}>
                <div className={styles.leftCategories}>
                    {categoriesLeft.map((category) => (
                        <div
                            key={category}
                            className={`${styles.categoryItem} ${selectedCategories.includes(category) ? styles.selected : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>
                <div className={styles.divider}></div>
                <div className={styles.rightCategories}>
                    {categoriesRight.map((category) => (
                        <div
                            key={category}
                            className={`${styles.categoryItem} ${selectedCategories.includes(category) ? styles.selected : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.footer} onClick={onComplete}>
                선택완료
            </div>
        </div>
    );
};

export default CategorySelector;
