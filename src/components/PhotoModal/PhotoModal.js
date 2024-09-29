import React, { useState } from 'react';
import styles from './PhotoModal.module.css';

export default function PhotoModal({ onClose, onPhotoAdd }) {  // onPhotoAdd 추가
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files); // 여러 파일을 배열로 변환
        const newImages = files.map(file => URL.createObjectURL(file)); // 이미지 미리보기 URL 생성
        setSelectedImages([...selectedImages, ...newImages]); // 기존 이미지에 추가
    };

    const handleAddImages = () => {
        // 선택된 이미지를 상위 컴포넌트로 전달
        onPhotoAdd(selectedImages);
        onClose(); // 모달을 닫음
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>사진 추가</h2>
                <div className={styles.previewContainer}>
                    {selectedImages.length > 0 ? (
                        selectedImages.map((image, index) => (
                            <img key={index} src={image} alt={`Selected ${index}`} className={styles.previewImage} />
                        ))
                    ) : (
                        <p>선택된 사진이 없습니다.</p>
                    )}
                </div>
                <div className={styles.uploadContainer}>
                    <label htmlFor="file-upload" className={styles.uploadLabel}>
                        사진 업로드
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        multiple  /* 여러 개의 파일 선택 가능 */
                        onChange={handleImageChange}
                        className={styles.uploadInput}
                    />
                </div>
                <div className={styles.modalActions}>
                    <button onClick={onClose} className={styles.closeButton}>
                        닫기
                    </button>
                    {selectedImages.length > 0 && (
                        <button onClick={handleAddImages} className={styles.addButton}>
                            추가
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
