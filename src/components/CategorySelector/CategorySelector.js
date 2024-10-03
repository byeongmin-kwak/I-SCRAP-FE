import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../store/testSlice';  // 액션 불러오기
import styles from './CategorySelector.module.css';

const categoriesLeft = ['뷰티', '패션', '음식', '영화, 드라마'];
const categoriesRight = ['스포츠', '음악', '캐릭터', '그 외'];

const CategorySelector = ({ onComplete }) => {
    const dispatch = useDispatch();
    const selectedCategories = useSelector((state) => state.test.selectedCategories);  // 전역 상태 가져오기

    const handleCategoryClick = (category) => {
        if (selectedCategories.includes(category)) {
            dispatch(setCategories(selectedCategories.filter((item) => item !== category)));
        } else {
            dispatch(setCategories([...selectedCategories, category]));
        }
    };

    const handleComplete = () => {
        // 카테고리 저장 완료
        onComplete();
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
            <div className={styles.footer} onClick={handleComplete}>
                선택완료
            </div>
        </div>
    );
};

export default CategorySelector;
