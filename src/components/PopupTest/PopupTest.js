import React, { useState, useEffect } from 'react';
import Arrow from '../../assets/arrow.svg';
import styles from './PopupTest.module.css';
import Icon from '../../assets/test-icon.svg';
import CategorySelector from '../CategorySelector/CategorySelector';
import { useNavigate } from 'react-router-dom';

export default function PopupTest() {
    const [answers, setAnswers] = useState([null, null, null, null]);
    const [step, setStep] = useState(1);
    const [showCategorySelector, setShowCategorySelector] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigate = useNavigate(); // useNavigate 사용

    const handleAnswer = (questionIndex, answerIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = answerIndex;
        setAnswers(updatedAnswers);
    };

    

    const getButtonStyle = (questionIndex, answerIndex) => {
        return answers[questionIndex] === answerIndex ? styles.selectedOptionButton : styles.optionButton;
    };

    const handleResultClick = () => {
        // 원하는 순서로 배열에서 요소 추출 후 문자열로 결합
        const reorderedAnswers = [
            answers[1], // 2번째 요소 (index 1)
            answers[3], // 4번째 요소 (index 3)
            answers[2], // 3번째 요소 (index 2)
            answers[0]  // 1번째 요소 (index 0)
        ].join(''); // 문자열로 묶기

        // /result 페이지로 이동하면서 쿼리 파라미터로 전송
        navigate(`/result/${reorderedAnswers}`);
    };

    useEffect(() => {
        console.log(answers);
    }, [answers]);

    useEffect(() => {
        if (step === 6) {
            const timer = setTimeout(() => {
                handleResultClick();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div>
            {step === 1 &&
                <div className={styles.mainContainer}>
                    <div className={styles.mainText}>
                        1. 갑자기 내일 성수동에 있는 팝업스토어에 <br></br> 같이 가자는 친구의 연락이 왔다.
                    </div>
                    <div className={styles.testAnswer}>
                        <div className={styles.arrowContainer}>
                            <img src={Arrow} />
                            <div>이전으로</div>
                        </div>
                        <div className={styles.optionButtons}>
                            <button
                                className={getButtonStyle(0, 'J')}
                                onClick={() => handleAnswer(0, 'J')}
                            >
                                ‘응? 갑자기? 나랑 다른 할 일 약속 잡혔는데...<br></br>
                                다음에 가자고 해야겠다.’
                            </button>
                            <button
                                className={getButtonStyle(0, 'P')}
                                onClick={() => handleAnswer(0, 'P')}
                            >
                                ‘오, 내일 할 일은,, 다음에 하지 뭐~<br></br>
                                마침 심심했는데 잘됐다!’
                            </button>
                        </div>
                        <div className={styles.arrowContainer} onClick={() => setStep(2)}>
                            <div>다음으로</div>
                            <img src={Arrow} className={styles.flippedArrow} />
                        </div>
                    </div>
                </div>}
            {step === 2 &&
                <div className={styles.mainContainer}>
                    <div className={styles.mainText}>
                        2. 포토존에서 사진을 찍고 싶은데<br></br>
                        사람이 너무 많다. 이때 나의 선택은?
                    </div>
                    <div className={styles.testAnswer}>
                        <div className={styles.arrowContainer} onClick={() => setStep(1)}>
                            <img src={Arrow} />
                            <div>이전으로</div>
                        </div>
                        <div className={styles.optionButtons}>
                            <button
                                className={getButtonStyle(1, 'I')}
                                onClick={() => handleAnswer(1, 'I')}
                            >
                                '다들 지켜보니까 사진찍기 부끄러워..<br></br>
                                그냥 다른 곳에서 찍자'
                            </button>
                            <button
                                className={getButtonStyle(1, 'E')}
                                onClick={() => handleAnswer(1, 'E')}
                            >
                                '오~ 여기가 핫한 스팟인가 보네!!<br></br>
                                사진 많이 찍고야겠다!'
                            </button>
                        </div>
                        <div className={styles.arrowContainer} onClick={() => setStep(3)}>
                            <div>다음으로</div>
                            <img src={Arrow} className={styles.flippedArrow} />
                        </div>
                    </div>
                </div>}
            {step === 3 &&
                <div className={styles.mainContainer}>
                    <div className={styles.mainText}>
                        3. 친구가 굿즈를 보여주며 어떠냐고 물어본다.<br></br>돈 주고 살 정도는 아닌 것 같은데...
                    </div>
                    <div className={styles.testAnswer}>
                        <div className={styles.arrowContainer} onClick={() => setStep(2)}>
                            <img src={Arrow} />
                            <div>이전으로</div>
                        </div>
                        <div className={styles.optionButtons}>
                            <button
                                className={getButtonStyle(2, 'F')}
                                onClick={() => handleAnswer(2, 'F')}
                            >
                                “어.. 그 것도 괜찮은데<br></br>
                                다른 게 더 잘 어울릴 것 같은데??”
                            </button>
                            <button
                                className={getButtonStyle(2, 'T')}
                                onClick={() => handleAnswer(2, 'T')}
                            >
                                “오.. 나였으면 다른 거 산다 ㅋㅋㅋㅋ”
                            </button>
                        </div>
                        <div className={styles.arrowContainer} onClick={() => setStep(4)}>
                            <div>다음으로</div>
                            <img src={Arrow} className={styles.flippedArrow} />
                        </div>
                    </div>
                </div>}
            {step === 4 &&
                <div className={styles.mainContainer}>
                    <div className={styles.mainText}>
                        4. 팝업스토어 체험 부스에서 신기한 경험을 했다.<br></br>
                        이 때 드는 생각은?
                    </div>
                    <div className={styles.testAnswer}>
                        <div className={styles.arrowContainer} onClick={() => setStep(3)}>
                            <img src={Arrow} />
                            <div>이전으로</div>
                        </div>
                        <div className={styles.optionButtons}>
                            <button
                                className={getButtonStyle(3, 'N')}
                                onClick={() => handleAnswer(3, 'N')}
                            >
                                '우와.. 이런 건 어떻게 만드는 거지?<br></br>
                                누가 만든 거지? 신기하다!'
                            </button>
                            <button
                                className={getButtonStyle(3, 'S')}
                                onClick={() => handleAnswer(3, 'S')}
                            >
                                '우와 신기하다!'
                            </button>
                        </div>
                        <div className={styles.arrowContainer} onClick={() => setStep(5)}>
                            <div>다음으로</div>
                            <img src={Arrow} className={styles.flippedArrow} />
                        </div>
                    </div>
                </div>}
            {step === 5 &&
                <div className={styles.mainContainer}>
                    <div className={styles.mainText}>
                        팝업스토어를 간다면 어떤 종류의 팝업을 가고 싶은가?(어떤 종류의 팝업스토어를 좋아하는가?)
                    </div>
                    <div className={styles.testAnswer}>
                        <div className={styles.arrowContainer} onClick={() => setStep(4)}>
                            <img src={Arrow} />
                            <div>이전으로</div>
                        </div>
                        {!showCategorySelector ? (
                            <div className={styles.keywordOptionButtons}>
                                <button
                                    className={styles.keywordButton}
                                    onClick={() => setShowCategorySelector(true)}
                                >
                                    {selectedCategories.length > 0 ? (
                                        selectedCategories.join(', ')
                                    ) : (
                                        '선택하기'
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className={styles.keywordOptionButtons2}>
                                <CategorySelector
                                    selectedCategories={selectedCategories}
                                    setSelectedCategories={setSelectedCategories}
                                    onComplete={() => setShowCategorySelector(false)} // 선택완료 시 다시 선택하기 버튼 표시
                                />
                            </div>
                        )}
                        <div className={styles.arrowContainer} onClick={() => setStep(6)}>
                            <div>결과보기</div>
                            <img src={Arrow} className={styles.flippedArrow} />
                        </div>
                    </div>
                </div>}
            {step === 6 &&
                <div className={styles.iconContainer}>
                    <img src={Icon} className={styles.animatedIcon} />
                </div>
            }
        </div>
    );
}
