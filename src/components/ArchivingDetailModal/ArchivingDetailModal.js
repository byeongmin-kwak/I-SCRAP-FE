import React, { useEffect, useState } from 'react';
import './ArchivingDetailModal.css';
import FlippedButton from '../../assets/flipped-button.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SaveConfirmModal from '../SaveConfirmModal/SaveConfirmModal';

export default function ArchivingDetailModal({ id, isOpen, onClose }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [reviewData, setReviewData] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 확인 모달 상태
    const navigate = useNavigate();

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    useEffect(() => {
        const fetchReviewDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/reviews/${id}`, {
                    withCredentials: true // 쿠키나 인증 정보를 포함하여 요청
                });
                setReviewData(response.data);
            } catch (error) {
                console.error('리뷰 데이터를 가져오는 중 오류 발생:', error);
            }
        };
    
        fetchReviewDetails();
    }, [id]);

    if (!isOpen) return null;

    if (!reviewData) {
        return <div>Loading...</div>;
    }

    const handleMoreClick = () => {
        navigate(`/writing/${id}`);
    };

    // 삭제 요청을 처리하는 함수
    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/reviews/${id}`, {
                withCredentials: true // 쿠키나 인증 정보를 포함하여 삭제 요청
            });
            alert('리뷰가 성공적으로 삭제되었습니다.');
            onClose(); // 모달을 닫기 위해 onClose 호출
            window.location.href = '/archiving';
        } catch (error) {
            console.error('리뷰 삭제 중 오류 발생:', error);
            alert('리뷰 삭제 중 오류가 발생했습니다.');
        }
    };

    // 삭제 확인 모달 열기
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    // 삭제 확인 모달 닫기
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleEdit = () => {

    };

    return (
        <div className="archiving-modal-overlay" onClick={onClose}>
            <div className="archiving-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="archiving-close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="archiving-modal-content">
                    <div className={`archiving-card ${isFlipped ? 'flipped' : ''}`}>
                        <div className="archiving-card-inner">
                            <div className="archiving-card-front">
                                <img src={reviewData.cardFront} alt="Front" className="archiving-modal-image" />
                            </div>
                            <div className="archiving-card-back">
                                <img src={reviewData.cardBack} alt="Back" className="archiving-modal-image" />
                            </div>
                        </div>
                        <img src={FlippedButton} className="flipped-card" onClick={handleCardClick} />
                    </div>
                    <div className="archiving-modal-info">
                        <div className="archiving-modal-open">{reviewData.isPublic ? '공개' : '비공개'}</div>
                        <div className="archiving-modal-date">{reviewData.visitDate}</div>
                        {reviewData.title ? <div className="archiving-modal-name">{reviewData.title}</div> : <div className="archiving-modal-name">기록을 작성해주세요</div>}
                        <div className="archiving-modal-popupName">- {reviewData.popupName}</div>
                        <div className="archiving-modal-coment">"{reviewData.shortComment}"</div>

                        <div className="archiving-modal-detail">
                            {reviewData.detailedReview ?
                                truncateText(reviewData.detailedReview, 100):
                                <div>작성된 내용이 없습니다.</div>
                            }

                            <div className="archiving-more" onClick={handleMoreClick}>
                                자세히 보러가기
                            </div>
                        </div>
                        <div className="archiving-modal-button-container">
                            <button className="archiving-modal-edit" onClick={handleEdit}>수정하기</button>
                            <button className="archiving-modal-delete" onClick={openDeleteModal}>
                                삭제하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 삭제 확인 모달 */}
            <SaveConfirmModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleDelete} />
        </div>
    );
}
