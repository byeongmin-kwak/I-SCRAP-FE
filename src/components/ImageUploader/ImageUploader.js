import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setImage,
    setBrightness,
    setContrast,
    setSaturation,
    setHue,
    setCropScale,
    setRotation
} from '../../store/cardSlice';
import styles from './ImageUploader.module.css';

export default function ImageUploader() {
    const dispatch = useDispatch();

    // Redux 상태에서 이미지 및 효과 관련 값 가져오기
    const image = useSelector((state) => state.card.image);
    const brightness = useSelector((state) => state.card.brightness);
    const contrast = useSelector((state) => state.card.contrast);
    const saturation = useSelector((state) => state.card.saturation);
    const hue = useSelector((state) => state.card.hue);
    const cropScale = useSelector((state) => state.card.cropScale);
    const rotation = useSelector((state) => state.card.rotation);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            dispatch(setImage(reader.result));  // Redux에 이미지 설정
        };
        reader.readAsDataURL(file);
    };

    const handleFilterChange = (setter) => (e) => {
        dispatch(setter(e.target.value));  // 필터 변경 시 Redux에 값 설정
    };

    const handleCropChange = (e) => {
        const cropValue = parseFloat(e.target.value);  // 슬라이더 값은 -1에서 1 사이
        const actualScale = 1 + cropValue;  // 슬라이더 값이 0일 때 scale은 1
        dispatch(setCropScale(actualScale));
    };

    const handleRotateChange = (e) => {
        dispatch(setRotation(e.target.value));  // 회전 값 변경
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageText}>사진</div>
            <div className={styles.imageContainer}>
                <div className={styles.imageBorder}>
                    <div className={styles.imageWrapper}> {/* overflow 설정을 위한 래퍼 추가 */}
                        <img
                            src={image}
                            alt="Uploaded"
                            className={styles.image}
                            style={{
                                filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg)`,
                                transform: `scale(${cropScale}) rotate(${rotation}deg)`, // 자르기 및 회전 적용
                                transformOrigin: 'center', // 회전 중심을 이미지의 중앙으로 설정
                            }}
                        />
                    </div>
                </div>

                {/* 커스텀 파일 업로드 버튼 */}
                <div className={styles.customContainer}>
                    <div className={styles.uploadText}>사진 불러오기</div>
                    <label className={styles.uploadButton}>
                        내 기기에서 불러오기
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            className={styles.hiddenInput} // 숨긴 input
                        />
                    </label>
                    <div className={styles.effectText}>편집</div>
                    <div className={styles.slideContainer}>
                        <div className={styles.imageCustom}>
                            <label className={styles.customText2}>자르기</label>
                            <div className={styles.rangeContainer}>
                                <div className={styles.circle}>{cropScale.toFixed(2)}</div>
                                <input
                                    type="range"
                                    min="-1"
                                    max="1"
                                    step="0.01"
                                    value={cropScale - 1}  // 실제 scale 값을 -1에서 1로 변환
                                    onChange={handleCropChange}
                                />
                            </div>
                        </div>
                        <div className={styles.imageCustom}>
                            <label className={styles.customText}>회전</label>
                            <div className={styles.rangeContainer}>
                                <div className={styles.circle}>{rotation}°</div>
                                <input
                                    type="range"
                                    min="-180"
                                    max="180"
                                    step="1"
                                    value={rotation}
                                    onChange={handleRotateChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.effectText}>효과</div>
                    <div className={styles.slideContainer}>
                        <div className={styles.imageCustom}>
                            <label className={styles.customText}>밝기</label>
                            <div className={styles.rangeContainer}>
                                <div className={styles.circle}>{brightness}</div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={brightness}
                                    onChange={handleFilterChange(setBrightness)}
                                />
                            </div>
                        </div>
                        <div className={styles.imageCustom}>
                            <label className={styles.customText}>대비</label>
                            <div className={styles.rangeContainer}>
                                <div className={styles.circle}>{contrast}</div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={contrast}
                                    onChange={handleFilterChange(setContrast)}
                                />
                            </div>
                        </div>
                        <div className={styles.imageCustom}>
                            <label className={styles.customText}>채도</label>
                            <div className={styles.rangeContainer}>
                                <div className={styles.circle}>{saturation}</div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={saturation}
                                    onChange={handleFilterChange(setSaturation)}
                                />
                            </div>
                        </div>
                        <div className={styles.imageCustom}>
                            <label className={styles.customText}>색조</label>
                            <div className={styles.rangeContainer}>
                                <div className={styles.circle}>{hue}</div>
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={hue}
                                    onChange={handleFilterChange(setHue)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
