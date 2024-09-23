import React from 'react'
import styles from './Reply.module.css';

export default function Reply() {
    return (
        <div className={styles.replyContainer}>
            <div className={styles.textContainer}>
                <div></div>
                <div>댓글</div>
                <div>3개</div>
            </div>
            <div className={styles.replies}>
                <div>
                    <div className={styles.profileContainer}>
                        <div className={styles.profile}>
                            <div className={styles.img}></div>
                            <div className={styles.name}>쿵쿵</div>
                        </div>
                        <div className={styles.date}>2024. 08. 30. 22:30</div>
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.content}> 우와~ 저도 지난 주에 디디피 다녀왔는데 여기는 첨보네용</div>
                        <button className={styles.button}>답글</button>
                    </div>
                    <div className={styles.line}></div>
                </div>
                <div>
                    <div className={styles.profileContainer}>
                        <div className={styles.profile}>
                            <div className={styles.img}></div>
                            <div className={styles.name}>쿵쿵</div>
                        </div>
                        <div className={styles.date}>2024. 08. 30. 22:30</div>
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.content}> 우와~ 저도 지난 주에 디디피 다녀왔는데 여기는 첨보네용</div>
                        <button className={styles.button}>답글</button>
                    </div>
                    <div className={styles.line}></div>
                </div>
                <div>
                    <div className={styles.profileContainer}>
                        <div className={styles.profile}>
                            <div className={styles.img}></div>
                            <div className={styles.name}>쿵쿵</div>
                        </div>
                        <div className={styles.date}>2024. 08. 30. 22:30</div>
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.content}> 우와~ 저도 지난 주에 디디피 다녀왔는데 여기는 첨보네용</div>
                        <button className={styles.button}>답글</button>
                    </div>
                    <div className={styles.line}></div>
                </div>
            </div>
            <div className={styles.addReply}>
                <div className={styles.profile}>
                    <div className={styles.img}></div>
                    <div className={styles.name}>뿌리</div>
                </div>
                <input placeholder='댓글을 작성해주세요.' className={styles.replyInput}/>
                <div className={styles.buttonContainer}>
                    <div className={styles.letter}> 0/1000</div>
                    <button className={styles.commit}>등록하기</button>
                </div>
            </div>
        </div>
    )
}
