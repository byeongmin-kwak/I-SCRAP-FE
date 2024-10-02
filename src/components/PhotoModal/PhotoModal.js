import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPhotos, setPhotosName } from '../../store/backInfoSlice';
import styles from './PhotoModal.module.css';
import Icon from "../../assets/logo.svg";
import axios from 'axios';  // axios로 요청 처리

export default function PhotoModal({ onClose, reviewId }) {
    const dispatch = useDispatch();
    const photos = useSelector((state) => state.backInfo.photos); // 전역 상태에서 가져온 사진 목록
    const photosName = useSelector((state) => state.backInfo.photosName); // 전역 상태의 photosName 가져오기
    const [selectedImages, setSelectedImages] = useState(photos || []);  // 업로드할 이미지의 URL (미리보기용)
    const [files, setFiles] = useState([]); // 실제 파일을 저장

    // 파일 업로드 처리 (Base64 URL로 미리보기, 파일 자체는 별도 저장)
    const handleImageChange = (event) => {
        const filesArray = Array.from(event.target.files); // 여러 파일을 배열로 변환
        const newImages = filesArray.map(file => URL.createObjectURL(file)); // 이미지 미리보기 URL 생성
        setSelectedImages([...selectedImages, ...newImages].slice(0, 4)); // 최대 4개까지 미리보기
        setFiles([...files, ...filesArray].slice(0, 4)); // 파일은 별도로 저장
    };

    // 사진 삭제 처리
    const handleRemoveImage = (indexToRemove) => {
        setSelectedImages(selectedImages.filter((_, index) => index !== indexToRemove));
        setFiles(files.filter((_, index) => index !== indexToRemove)); // 실제 파일도 같이 삭제
        const updatedPhotosName = photosName.filter((_, index) => index !== indexToRemove); // 이름도 같이 삭제
        dispatch(setPhotosName(updatedPhotosName)); // 이름 상태 업데이트
    };

    // 이미지 파일을 S3에 저장하는 함수
    const uploadImage = async (file, fileName) => {
        try {
            // 1. 업로드 URL을 요청
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/files/upload-url/${fileName}`);
            const uploadUrl = response.data.uploadUrl;

            // 2. PUT 요청으로 이미지를 업로드 (Blob 형태로 전송)
            await axios.put(uploadUrl, file, {
                headers: {
                    'Content-Type': file.type, // 파일 타입에 맞게 설정
                }
            });

            return fileName; // 업로드가 성공하면 파일 이름 반환
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            return null;
        }
    };

    // 사진을 적용할 때 전역 상태로 업데이트
    const handleAddImages = async () => {
        const uploadedNames = [...photosName]; // 기존 파일 이름도 포함

        // 1. 각 이미지 파일을 업로드하고, 고유한 파일 이름을 생성
        for (let i = 0; i < files.length; i++) {
            const randomString = Math.random().toString(36).substring(7); // 랜덤 문자열 생성
            const fileName = `${reviewId}-${randomString}.png`; // 고유 파일명 생성

            const uploadedFileName = await uploadImage(files[i], fileName);

            if (uploadedFileName) {
                uploadedNames.push(uploadedFileName); // 성공적으로 업로드된 파일명 저장
            }
        }

        dispatch(setPhotosName(uploadedNames)); // local state에도 저장

        onClose(); // 모달을 닫음
    };

    // 4개의 슬롯을 만들고, 선택된 이미지만큼 채우고 남은 공간에 빈 네모 추가
    const emptySlots = Array(4 - selectedImages.length).fill(null);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.top}>
                    <img src={Icon} alt="Icon" />
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <div className={styles.subTitle}>
                            <div className={styles.text}>사진 추가</div>
                            <div className={styles.subText}>기록에 사진을 추가하세요!</div>
                        </div>
                        <div className={styles.uploadContainer}>
                            <label htmlFor="file-upload" className={styles.uploadLabel}>
                                내 기기에서 추가하기
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
                    </div>

                    <div className={styles.previewContainer}>
                        {selectedImages.map((image, index) => (
                            <div key={index} className={styles.imageWrapper}>
                                <img src={image} alt={`Selected ${index}`} className={styles.previewImage} />
                                {/* 'x' 버튼 추가 */}
                                <button 
                                    className={styles.removeButton} 
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}

                        {/* 남은 공간에 빈 네모 추가 */}
                        {emptySlots.map((_, index) => (
                            <div key={index} className={styles.emptyImageSlot} />
                        ))}
                    </div>

                    <div className={styles.modalActions}>
                        <button onClick={handleAddImages} className={styles.addButton}>
                            적용하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
