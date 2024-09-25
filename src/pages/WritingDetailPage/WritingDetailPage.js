import React from 'react'
import styles from './WritingDetailPage.module.css';
import Reply from '../../components/Reply/Reply';
import Star from '../../assets/Star 2.svg';
import Example from '../../assets/popupex.PNG';
import Emotion1 from '../../assets/Emotion/Group 501.svg';
import Emotion2 from '../../assets/Emotion/Group 502.svg';
import Emotion3 from '../../assets/Emotion/Group 503.svg';
import Emotion4 from '../../assets/Emotion/Group 504.svg';
import Emotion5 from '../../assets/Emotion/Group 500.svg';

export default function WritingDetailPage() {
    return (
        <div className={styles.container}>
            <div className={styles.nameContainer}>
                <div className={styles.profile}>
                    <img />
                    <div>뿌리</div>
                </div>
                <div className={styles.stars}>
                    <img src={Star} />
                    <img src={Star} />
                    <img src={Star} />
                    <img src={Star} />
                    <img src={Star} />
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.cardContainer}>
                    <img src={Example} className={styles.card} />
                    <div className={styles.titleContainer}>
                        <div className={styles.date}>2024.07.04</div>
                        <div className={styles.title}>기록 제목</div>
                        <div className={styles.places}>
                            <div className={styles.placeContainer}>
                                <div>집</div>
                                <div className={styles.place}>뭐뭐뭐한 팝업</div>
                            </div>
                            <div className={styles.placeContainer}>
                                <div>위치</div>
                                <div className={styles.place}>DDP 동대문 역사 박물관</div>
                            </div>
                        </div>
                        <div className={styles.comment}>한줄 코멘트 어쩌구저쩌구 약 50자 정도 될 거 같음. 한줄 코멘트 어쩌구 저쩌구 약 50 </div>
                    </div>
                </div>
                <div className={styles.content}>Bibendum ut pharetra sed sem augue arcu vestibulum. Vel tellus enim mi viverra. At et rutrum sit ornare eget. Ultrices diam quis posuere non, quis et. At eget non gravida nulla neque nullam. Parturient semper amet, neque, nunc, luctus sapien erat ornare mollisBibendum ut pharetra sed sem augue arcu vestibulum. Vel tellus enim mi viverra. At et rutrum sit ornare eget. Ultrices diam quis posuere non, quis et. At eget non gravida nulla neque nullam. Parturient semper amet, neque, nunc, luctus sapien erat ornare mollis</div>
                <div className={styles.photos}>
                    <img src={Example} className={styles.photo} />
                    <img src={Example} className={styles.photo} />
                    <img src={Example} className={styles.photo} />
                    <img src={Example} className={styles.photo} />
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
                <Reply/>
            </div>
        </div>
    )
}
