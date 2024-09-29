import React, { useRef, useState } from 'react';
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
        } catch (error) {
            console.error('파일 업로드 실패:', error);
        }
    };

    // 각 요소를 캡처하고 서버로 업로드한 후 리뷰를 등록하는 함수
    const handleCaptureAndUpload = async () => {
        if (posterRef.current) {
            // poster 이미지 캡처
            const canvas = await html2canvas(posterRef.current);
            canvas.toBlob((blob) => {
                if (blob) {
                    getUploadUrlAndUpload(blob, `${selectedPopup.id}-cardFront.png`, setFrontFileName);
                }
            }, 'image/png');  // PNG 형식으로 캡처
        }

        if (svgContainerRef.current) {
            // svgContainer 캡처
            const canvas = await html2canvas(svgContainerRef.current);
            canvas.toBlob((blob) => {
                if (blob) {
                    getUploadUrlAndUpload(blob, `${selectedPopup.id}-cardBack.png`, setBackFileName);
                }
            }, 'image/png');  // PNG 형식으로 캡처
        }
    };

    // 모든 이미지 업로드가 완료되면 리뷰를 등록하는 함수
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
            shortComment: comment,// 필수
        };

        console.log(reviewData);

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/reviews`, reviewData);
            console.log('리뷰 등록 성공:', response.data);
        } catch (error) {
            console.error('리뷰 등록 실패:', error);
        }
    };

    // 이미지 업로드 후 리뷰 제출
    const handleCompleteUploadAndSubmit = async () => {
        await handleCaptureAndUpload();

        // 이미지 업로드가 완료된 후 리뷰 전송
        setTimeout(() => {
            submitReview();
        }, 4000);  // 업로드 시간이 있을 수 있으므로 3초 대기
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div onClick={onClose}>x</div>
                <div>
                    <div className={styles.cardContainer}>
                        <div ref={posterRef}> {/* poster 부분을 캡처할 ref 추가 */}
                            <img src={selectedPopup.poster} className={styles.img} />
                        </div>

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
                    </div>
                    <div>
                        {/* 버튼을 추가하여 이미지 추출 및 업로드 동작 */}
                        <button onClick={handleCompleteUploadAndSubmit}>리뷰 제출</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
