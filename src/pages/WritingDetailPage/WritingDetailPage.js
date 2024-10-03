import React, { useEffect, useState } from 'react';
import styles from './WritingDetailPage.module.css';
import Reply from '../../components/Reply/Reply';
import Star from '../../assets/Star 2.svg';
import FlippedButton from '../../assets/flipped-button.svg'; // Flipped 버튼 이미지
import Emotion1 from '../../assets/Emotion/Group 501.svg';
import Emotion2 from '../../assets/Emotion/Group 502.svg';
import Emotion3 from '../../assets/Emotion/Group 503.svg';
import Emotion4 from '../../assets/Emotion/Group 504.svg';
import Emotion5 from '../../assets/Emotion/Group 500.svg';
import Location from '../../assets/location.svg';
import Market from "../../assets/marketplace.svg";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function WritingDetailPage() {
    const { id } = useParams(); // URL 파라미터로부터 id 가져오기
    const [reviewData, setReviewData] = useState(null); // 리뷰 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태를 나타낼 변수
    const [error, setError] = useState(null); // 오류를 저장할 상태
    const [isFlipped, setIsFlipped] = useState(false); // 카드가 뒤집혔는지 상태
    const [emotionCounts, setEmotionCounts] = useState({}); // 감정 데이터를 저장할 상태
    const [likeError, setLikeError] = useState(null); // 좋아요 요청 중 발생하는 오류 저장
    const [likedEmotions, setLikedEmotions] = useState({}); // 유저가 이미 누른 감정 저장

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/reviews/${id}/text-review`, {
                    withCredentials: true  // 쿠키나 인증 정보를 포함하도록 설정
                });
                setReviewData(response.data); // 받아온 데이터를 상태에 저장
                console.log(response.data);
            } catch (error) {
                setError('리뷰 데이터를 가져오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };
    
        const fetchEmotionCounts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/reviews/${id}/likes`, {
                    withCredentials: true  // 쿠키나 인증 정보를 포함하도록 설정
                });
                const emotions = response.data.reduce((acc, emotion) => {
                    acc[emotion.type] = emotion.count;
                    return acc;
                }, {});
                setEmotionCounts(emotions); // 서버로부터 받은 감정 데이터를 상태에 저장
    
                const likedEmotions = response.data.reduce((acc, emotion) => {
                    if (emotion.liked) acc[emotion.type] = true;
                    return acc;
                }, {});
                setLikedEmotions(likedEmotions);
            } catch (error) {
                console.error('감정 데이터를 가져오는 중 오류가 발생했습니다.');
            }
        };
    
        fetchReviewData();
        fetchEmotionCounts();
    }, [id]);

    const handleCardFlip = () => {
        setIsFlipped(!isFlipped); // 카드 뒤집기 상태를 토글
    };

    const handleLikeToggle = async (type) => {
        if (likedEmotions[type]) {
            try {
                const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/reviews/${id}/likes`, {
                    data: {
                        reviewId: id,
                        type: type,
                    },
                    withCredentials: true // withCredentials 추가
                });
                if (response.status === 200) {
                    setEmotionCounts((prevCounts) => ({
                        ...prevCounts,
                        [type]: (prevCounts[type] || 0) - 1,
                    }));
                    setLikedEmotions((prev) => ({
                        ...prev,
                        [type]: false, // 감정 취소 처리
                    }));
                    setLikeError(null);
                }
            } catch (error) {
                setLikeError('좋아요 취소 중 오류가 발생했습니다.');
            }
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/reviews/likes`, {
                    reviewId: id,
                    type: type
                }, {
                    withCredentials: true // withCredentials 추가
                });
                if (response.status === 201) {
                    setEmotionCounts((prevCounts) => ({
                        ...prevCounts,
                        [type]: (prevCounts[type] || 0) + 1,
                    }));
                    setLikedEmotions((prev) => ({
                        ...prev,
                        [type]: true,
                    }));
                    setLikeError(null);
                }
            } catch (error) {
                setLikeError('좋아요 추가 중 오류가 발생했습니다.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!reviewData) return <div>No data available</div>;

    return (
        <div className={styles.container}>
            <div className={styles.nameContainer}>
                <div className={styles.profile}>
                    <img />
                    <div className={styles.name}>{reviewData.user.name}</div>
                </div>
                <div className={styles.stars}>
                    {Array.from({ length: reviewData.rating }, (_, index) => (
                        <img key={index} src={Star} alt={`Star ${index + 1}`} />
                    ))}
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.cardInfo}>
                    <div className={styles.cardContainer}>
                        <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
                            {/* 카드 앞면 */}
                            <div className={styles.cardFront}>
                                <img src={reviewData.cardFront} alt="Card Front" className={styles.cardImage} />
                            </div>
                            {/* 카드 뒷면 */}
                            <div className={styles.cardBack}>
                                <img src={reviewData.cardBack} alt="Card Back" className={styles.cardImage} />
                            </div>
                        </div>
                        {/* Flipped 버튼 */}
                        <button className={styles.flippedButton} onClick={handleCardFlip}>
                            <img src={FlippedButton} alt="Flip Button" />
                        </button>
                    </div>
                    <div className={styles.titleContainer}>
                        <div className={styles.date}>{reviewData.visitDate}</div>
                        <div className={styles.title}>{reviewData.title}</div>
                        <div className={styles.places}>
                            <div className={styles.placeContainer}>
                                <img src={Market} />
                                <div className={styles.place}>{reviewData.popup.name}</div>
                            </div>
                            <div className={styles.placeContainer}>
                                <img src={Location} />
                                <div className={styles.place}>{reviewData.popup.location}</div>
                            </div>
                        </div>
                        <div className={styles.comment}>" {reviewData.shortComment} "</div>
                    </div>
                </div>
                <div className={styles.content}>{reviewData.detailedReview}</div>
                <div className={styles.photos}>
                    {reviewData.photos && reviewData.photos.length > 0 ? (
                        reviewData.photos.map((photo, index) => (
                            <img key={index} src={photo} className={styles.photo} alt={`Photo ${index + 1}`} />
                        ))
                    ) : (
                        null
                    )}
                </div>
                <div className={styles.buttons}>
                    <button className={styles.button}>수정</button>
                    <button className={styles.button}>삭제</button>
                </div>
            </div>
            <div className={styles.replyContainer}>
                <div className={styles.lineContainer}>
                    <div className={styles.line}></div>
                    <div className={styles.lineText}>이 기록에 대해 어떻게 생각하시나요?</div>
                    <div className={styles.line}></div>
                </div>
                {likeError && <div className={styles.error}>{likeError}</div>} {/* 오류 메시지 표시 */}
                <div className={styles.emotionContainer}>
                    <div className={styles.emotion} onClick={() => handleLikeToggle('Amazing')}>
                        <img src={Emotion1} alt="Amazing" />
                        <div className={styles.expression}>굉장해요</div>
                        <div className={styles.num}>{emotionCounts.Amazing || 0}</div> {/* 서버로부터 받은 'Amazing' count */}
                    </div>
                    <div className={styles.emotion} onClick={() => handleLikeToggle('Like')}>
                        <img src={Emotion2} alt="Like" />
                        <div className={styles.expression}>좋아요</div>
                        <div className={styles.num}>{emotionCounts.Like || 0}</div> {/* 서버로부터 받은 'Like' count */}
                    </div>
                    <div className={styles.emotion} onClick={() => handleLikeToggle('Surprising')}>
                        <img src={Emotion3} alt="Surprising" />
                        <div className={styles.expression}>놀라워요</div>
                        <div className={styles.num}>{emotionCounts.Surprising || 0}</div> {/* 서버로부터 받은 'Surprising' count */}
                    </div>
                    <div className={styles.emotion} onClick={() => handleLikeToggle('Impressive')}>
                        <img src={Emotion4} alt="Impressive" />
                        <div className={styles.expression}>감동이에요</div>
                        <div className={styles.num}>{emotionCounts.Impressive || 0}</div> {/* 서버로부터 받은 'Impressive' count */}
                    </div>
                    <div className={styles.emotion} onClick={() => handleLikeToggle('Relatable')}>
                        <img src={Emotion5} alt="Relatable" />
                        <div className={styles.expression}>공감해요</div>
                        <div className={styles.num}>{emotionCounts.Relatable || 0}</div> {/* 서버로부터 받은 'Relatable' count */}
                    </div>
                </div>
                <Reply id={id} />
            </div>
        </div>
    );
}
