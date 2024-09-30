import React from 'react';
import styles from './ImageUploader.module.css';

export default function ImageUploader({
    image,
    setImage,
    brightness,
    setBrightness,
    contrast,
    setContrast,
    saturation,
    setSaturation,
    hue,
    setHue,
}) {
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageText}>사진</div>
            <div className={styles.imageContainer}>
                <div className={styles.imageBorder}>
                    <img
                        src={image}
                        alt="Uploaded"
                        className={styles.image}
                        style={{
                            filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg)`,
                        }}
                    />
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
                    <div className={styles.slideContainer}></div>

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
