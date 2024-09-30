import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import basicLayout from '../../assets/CardBackLayout/layout1_new.svg';
import styles from './BasicMakingModal.module.css'; // 스타일은 별도 파일로 관리
import axios from 'axios'; // 파일 업로드를 위한 axios 사용

export default function BasicMakingModal({ isOpen, onClose }) {
    const selectedPopup = useSelector((state) => state.popup.selectedPopup); // popupId를 가져옴
    const open = useSelector((state) => state.publicSetting.open); // 전역 상태로부터 공개/비공개 상태 가져오기
    const { place, date, price, companion, comment } = useSelector((state) => state.backInfo);

    const popName = selectedPopup ? selectedPopup.name : "";
    const [frontFileName, setFrontFileName] = useState(null); // 파일 이름만 저장
    const [backFileName, setBackFileName] = useState(null); // 파일 이름만 저장

    // 캡처할 DOM 요소에 대한 ref 생성
    const posterRef = useRef(null);
    const svgContainerRef = useRef(null);

    // 컴포넌트가 마운트될 때 바로 실행하도록 useEffect를 사용
    useEffect(() => {
        if (isOpen) {
            handleCaptureAndUpload();  // 컴포넌트가 열리면 바로 이미지 캡처 및 업로드
        }
    }, [isOpen]);  // isOpen 상태가 변할 때 실행

    if (!isOpen) return null;

    // 업로드 URL을 요청하고 해당 URL로 파일을 PUT하는 함수
    const getUploadUrlAndUpload = async (blob, fileName, setFileName) => {
        try {
            // 1. POST 요청으로 업로드 URL을 받아옴
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/files/upload-url/${fileName}`);
            const uploadUrl = response.data.uploadUrl;

            // 2. 받아온 URL로 PUT 요청을 통해 이미지 파일 업로드
            await axios.put(uploadUrl, blob, {
                headers: {
                    'Content-Type': 'image/png', // PNG 파일 형식으로 업로드
                },
            });

            console.log('파일 업로드 성공:', fileName);

            // 파일 이름을 상태에 저장
            setFileName(fileName);
            return true; // 성공 시 true 반환
        } catch (error) {
            console.error('파일 업로드 실패:', error);
            return false; // 실패 시 false 반환
        }
    };

    // 각 요소를 캡처하고 서버로 업로드하는 함수 (리뷰 제출 버튼이 눌리기 전에 미리 캡처하고 업로드)
    const handleCaptureAndUpload = async () => {
        if (posterRef.current) {
            const canvas = await html2canvas(posterRef.current);
            canvas.toBlob(async (blob) => {
                if (blob) {
                    await getUploadUrlAndUpload(blob, `${selectedPopup.id}-cardFront.png`, setFrontFileName);
                }
            }, 'image/png');
        }

        if (svgContainerRef.current) {
            const canvas = await html2canvas(svgContainerRef.current);
            canvas.toBlob(async (blob) => {
                if (blob) {
                    await getUploadUrlAndUpload(blob, `${selectedPopup.id}-cardBack.png`, setBackFileName);
                }
            }, 'image/png');
        }
    };

    // 리뷰 등록 함수 (리뷰 제출 버튼을 클릭했을 때 실행)
    const submitReview = async () => {
        if (!frontFileName || !backFileName) {
            console.error('이미지 업로드가 완료되지 않았습니다.');
            return;
        }

        const reviewData = {
            place: place,
            visitDate: date,
            amount: Number(price),
            companions: companion,
            rating: 5,
            popupId: selectedPopup.id, // 필수
            isPublic: open === 'open' ? true : false, // 필수
            cardImage: frontFileName, // 필수 (파일 이름만 전송)
            cardBack: backFileName, // 필수 (파일 이름만 전송)
            shortComment: comment, // 필수
        };

        console.log(reviewData);

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/reviews`, reviewData);
            console.log('리뷰 등록 성공:', response.data);
        } catch (error) {
            console.error('리뷰 등록 실패:', error);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.line}>
                    <div className={styles.modalContainer}>
                        <div className={styles.cardContainer}>
                            <div className={styles.card}>
                                <div ref={posterRef}> {/* poster 부분을 캡처할 ref 추가 */}
                                    <img src={selectedPopup.poster} className={styles.img} />
                                </div>
                                <div className={styles.state}>앞면</div>
                            </div>
                            <div className={styles.card}>
                                <div ref={svgContainerRef} className={styles.svgContainer}> {/* svgContainer 부분을 캡처할 ref 추가 */}
                                    <div className={styles.textOverlay}>
                                        <div className={styles.info}>
                                            <div>{popName}</div>
                                            <div>{date}</div>
                                            <div>{place}</div>
                                            <div>{price}</div>
                                            <div>{companion}</div>
                                        </div>
                                    </div>
                                    <img src={basicLayout} alt="layout" />
                                </div>
                                <div className={styles.state}>뒷면</div>
                            </div>
                        </div>
                        <div className={styles.saveContainer}>
                            <div className={styles.saveText}>카드 앞면과 뒷면이 기본 이미지로 저장됩니다. 저장하시겠습니까?</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={submitReview} className={styles.submitButton}>저장</button>
                                <button onClick={onClose} className={styles.closeButton}>닫기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
