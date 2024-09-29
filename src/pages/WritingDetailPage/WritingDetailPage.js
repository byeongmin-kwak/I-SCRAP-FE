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

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/reviews/${id}/text-review`);
                console.log(response.data);
                setReviewData(response.data); // 받아온 데이터를 상태에 저장
            } catch (error) {
                setError('리뷰 데이터를 가져오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        fetchReviewData();
    }, [id]); // id가 변경될 때마다 요청을 다시 보냄

    const handleCardFlip = () => {
        setIsFlipped(!isFlipped); // 카드 뒤집기 상태를 토글
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
                <div className={styles.emotionContainer}>
                    <div className={styles.emotion}>
                        <img src={Emotion1} />
                        <div className={styles.expression}>굉장해요</div>
                        <div className={styles.num}>1</div>
                    </div>
                    <div className={styles.emotion}>
                        <img src={Emotion2} />
                        <div className={styles.expression}>좋아요</div>
                        <div className={styles.num}>1</div>
                    </div>
                    <div className={styles.emotion}>
                        <img src={Emotion3} />
                        <div className={styles.expression}>놀라워요</div>
                        <div className={styles.num}>1</div>
                    </div>
                    <div className={styles.emotion}>
                        <img src={Emotion4} />
                        <div className={styles.expression}>감동이에요</div>
                        <div className={styles.num}>1</div>
                    </div>
                    <div className={styles.emotion}>
                        <img src={Emotion5} />
                        <div className={styles.expression}>공감해요</div>
                        <div className={styles.num}>1</div>
                    </div>
                </div>
                <Reply id={id} />
            </div>
        </div>
    );
}
