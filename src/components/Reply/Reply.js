import React, { useEffect, useState } from 'react';
import styles from './Reply.module.css';
import axios from 'axios';

export default function Reply({ id }) {
    const [comments, setComments] = useState([]); // 댓글 데이터를 저장할 상태
    const [newComment, setNewComment] = useState(''); // 입력된 댓글 내용을 저장할 상태
    const [replyContent, setReplyContent] = useState(''); // 답글 입력 상태
    const [activeReplyId, setActiveReplyId] = useState(null); // 답글을 입력할 댓글 ID
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/reviews/${id}/comments`, {
                    withCredentials: true // 쿠키 전달 설정
                });
    
                setComments(response.data); // 댓글 데이터를 상태에 저장
            } catch (error) {
                console.log("댓글 오류 발생");
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };
    
        fetchComments();
    }, [id, comments]);


    const handleNewCommentChange = (event) => {
        setNewComment(event.target.value); // 댓글 입력 상태 업데이트
    };

    const handleReplyContentChange = (event) => {
        setReplyContent(event.target.value); // 답글 입력 상태 업데이트
    };

    // 댓글 등록 함수
    const handleCommentSubmit = async () => {
        if (!newComment) return; // 댓글 내용이 비어있으면 등록 안됨
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/reviews/comment`, {
                reviewId: id,
                contents: newComment,
            }, {
                withCredentials: true // 쿠키 전달 설정
            });
    
            const addedComment = {
                id: Date.now().toString(),
                contents: newComment,
                author: { name: '익명' },
                createdDate: new Date().toISOString(),
                subComments: [],
            };
    
            setComments([...comments, addedComment]); // 기존 댓글 배열에 새 댓글 추가
            setNewComment(''); // 댓글 입력창 초기화
        } catch (error) {
            console.error('댓글 등록 중 오류 발생:', error);
        }
    };

    // 답글 등록 함수
    const handleSubCommentSubmit = async (commentId) => {
        if (!replyContent) return; // 답글 내용이 비어있으면 등록 안됨
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/reviews/sub-comment`, {
                commentId: commentId,
                contents: replyContent,
            }, {
                withCredentials: true // 쿠키 전달 설정
            });
    
            // 등록된 답글을 화면에 추가 (서버 응답 사용하지 않고 직접 추가)
            const addedSubComment = {
                id: Date.now().toString(),
                contents: replyContent,
                author: { name: '익명' },
                createdDate: new Date().toISOString(),
            };
    
            const updatedComments = comments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        subComments: [...comment.subComments, addedSubComment], // 해당 댓글의 subComments에 답글 추가
                    };
                }
                return comment;
            });
    
            setComments(updatedComments); // 댓글 목록 상태 업데이트
            setReplyContent(''); // 답글 입력창 초기화
            setActiveReplyId(null); // 답글 입력 필드를 닫기 위해 상태 초기화
        } catch (error) {
            console.error('답글 등록 중 오류 발생:', error);
        }
    };

    const toggleReplyInput = (commentId) => {
        setActiveReplyId(commentId); // 현재 답글을 입력할 댓글 ID 저장
        setReplyContent(''); // 입력 필드 초기화
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.replyContainer}>
            <div className={styles.textContainer}>
                <div></div>
                <div>댓글</div>
                <div>{comments.length}개</div> {/* 댓글 개수 표시 */}
            </div>

            {/* 댓글 리스트 */}
            <div className={styles.replies}>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <div className={styles.profileContainer}>
                            <div className={styles.profile}>
                                <div className={styles.img}></div>
                                <div className={styles.name}>{comment?.author?.name || '익명'}</div> {/* 안전한 접근 */}
                            </div>
                            <div className={styles.date}>{new Date(comment.createdDate).toLocaleString()}</div> {/* 댓글 날짜 */}
                        </div>
                        <div className={styles.contentContainer}>
                            <div className={styles.content}>{comment.contents}</div> {/* 댓글 내용 */}
                            <button
                                className={styles.button}
                                onClick={() => toggleReplyInput(comment.id)} // 답글 입력창 토글
                            >
                                답글
                            </button>
                        </div>

                        {/* 답글 입력 필드 (활성화된 댓글에만 표시) */}
                        <div className={styles.line}></div>

                        <div className={styles.subCommentsContainer}>
                            {comment.subComments && comment.subComments.length > 0 && (
                                <div className={styles.subComments}>
                                    {comment.subComments.map((subComment) => (
                                        <div key={subComment.id} className={styles.subReplyContainer}>
                                            <div className={styles.profileContainer}>
                                                <div className={styles.profile}>
                                                    <div className={styles.subLine}></div>
                                                    <div className={styles.img}></div>
                                                    <div className={styles.name}>{subComment?.author?.name || '익명'}</div> {/* 안전한 접근 */}
                                                </div>
                                                <div className={styles.date}>
                                                    {new Date(subComment.createdDate).toLocaleString()}
                                                </div> {/* 답글 날짜 */}
                                            </div>
                                            <div className={styles.contentContainer}>
                                                <div className={styles.content}>{subComment.contents}</div> {/* 답글 내용 */}
                                            </div>
                                            <div className={styles.line}></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {activeReplyId === comment.id && (
                            <div className={styles.addSubReplyContainer}>
                                <div className={styles.containerNew}>
                                    <div className={styles.subLine2}></div>
                                    <div className={styles.addSubReply}>
                                        <div className={styles.profile}>
                                            <div className={styles.img}></div>
                                            <div className={styles.name}>로그인유저이름</div>
                                        </div>
                                        <input
                                            placeholder="답글을 작성해주세요."
                                            value={replyContent}
                                            onChange={handleReplyContentChange}
                                            className={styles.replyInput}
                                        />
                                        <div className={styles.buttonContainer}>
                                            <div className={styles.letter}>{replyContent.length}/1000</div>
                                            <button onClick={() => handleSubCommentSubmit(comment.id)} className={styles.commit}>
                                                답글 등록
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 댓글 작성 UI */}
            <div className={styles.addReply}>
                <div className={styles.profile}>
                    <div className={styles.img}></div>
                    <div className={styles.name}>로그인유저이름</div>
                </div>
                <input
                    placeholder="댓글을 작성해주세요."
                    value={newComment}
                    onChange={handleNewCommentChange}
                    className={styles.replyInput}
                />
                <div className={styles.buttonContainer}>
                    <div className={styles.letter}>{newComment.length}/1000</div>
                    <button onClick={handleCommentSubmit} className={styles.commit}>
                        등록하기
                    </button>
                </div>
            </div>
        </div>
    );
}
