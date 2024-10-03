import React, { useState, useEffect } from 'react';
import './ArchivingPage.css';
import ExampleBack from '../../assets/CardBackImages/rayout1.svg';
import DeletButton from '../../assets/deletbutton.svg';
import ArchivingPopup from '../../components/ArchivingPopup/ArchivingPopup';
import ArchivingDetailModal from '../../components/ArchivingDetailModal/ArchivingDetailModal'; // 모달 컴포넌트 import
import SaveConfirmModal from '../../components/SaveConfirmModal/SaveConfirmModal'; // SaveConfirmModal import
import axios from 'axios';

export default function ArchivingPage() {
    const [popups, setPopups] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleted, setIsDeleted] = useState(false); // 기본적으로 false로 설정
    const [selectedPopups, setSelectedPopups] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // SaveConfirmModal 상태 추가
    const [selectedPopupDetail, setSelectedPopupDetail] = useState(null); // 선택된 팝업 데이터
    const itemsPerPage = 18; // 한 페이지에 18개의 아이템을 보여줌 (9개씩 두 컨테이너)
    const totalPages = Math.ceil(popups.length / itemsPerPage);

    // 페이지 이동 시 GET 요청을 보냄
    useEffect(() => {
        const fetchPopups = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/reviews?page=${currentPage}`, {
                    withCredentials: true, // 쿠키를 전달할 수 있게 설정
                });
                const fetchedData = response.data.map((item) => ({
                    id: item.id,
                    title: item.title,
                    image: item.cardFront,  // cardFront를 사용해 이미지 설정
                    name: item.popupName,
                    date: item.visitDate,
                }));
                setPopups(fetchedData);
            } catch (error) {
                console.error('팝업 데이터를 가져오는 중 오류 발생:', error);
            }
        };
    
        fetchPopups();
    }, [currentPage]);

    // 현재 페이지에 표시할 데이터 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = popups.slice(startIndex, startIndex + itemsPerPage);
    const container1Data = currentData.slice(0, 9);
    const container2Data = currentData.slice(9, 18);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteButtonClick = () => {
        setIsDeleted(true); // 삭제 버튼 클릭 시 상태를 true로 변경
    };

    // 삭제 확인 모달 열기
    const handleCompleteButtonClick = () => {
        if (selectedPopups.length === 0) {
            setIsDeleted(false);
        } else {
            setIsConfirmModalOpen(true); // 삭제 확인 모달 열기
        }
    };

    // 실제로 삭제 요청을 보내는 함수
    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/reviews`, {
                data: {
                    reviewIds: selectedPopups // 선택된 팝업 ID 배열 전송
                },
                withCredentials: true, // 쿠키 전달 설정
            });
    
            // 선택된 팝업 삭제 후 UI에서 팝업 제거
            const remainingPopups = popups.filter(popup => !selectedPopups.includes(popup.id));
            setPopups(remainingPopups); // 상태 업데이트
            setSelectedPopups([]); // 선택된 상태 초기화
            setIsDeleted(false); // 삭제 모드 해제
            setIsConfirmModalOpen(false); // 삭제 완료 후 모달 닫기
        } catch (error) {
            console.error('팝업 삭제 중 오류 발생:', error);
        }
    };

    
    const handlePopupClick = (id) => {
        if (isDeleted) {
            if (selectedPopups.includes(id)) {
                setSelectedPopups(selectedPopups.filter(popupId => popupId !== id));
            } else {
                setSelectedPopups([...selectedPopups, id]);
            }
        } else {
            const popup = popups.find(popup => popup.id === id);
            setSelectedPopupDetail(popup); // 선택된 팝업 데이터 설정
            setIsModalOpen(true); // 모달 열기
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPopupDetail(null); // 모달 닫을 때 데이터 초기화
    };

    const handleAddRecord = () => {
        window.location.href = '/card-basic';
    };

    return (
        <>
            <div className='archivingpage-container'>
                <div className={`archiving-note ${isDeleted ? 'deleted' : ''}`}>
                    <div className='archiving-title-container'>
                        <div className='note-title-text'>oo의 팝업노트</div>
                        <button className='popup-search-button' onClick={handleAddRecord}>기록 추가하기</button>
                        {(!isDeleted) ? (
                            <img
                                className='archiving-delete-button'
                                src={DeletButton}
                                onClick={handleDeleteButtonClick} // 클릭 이벤트 추가
                                alt="Delete button"
                            />
                        ) : (
                            <button
                                className='delete-complete-button'
                                onClick={handleCompleteButtonClick}>
                                완료
                            </button>
                        )}
                    </div>
                    <div className='note-containers'>
                        <div className='note-container1'>
                            {container1Data.map((popup) => (
                                <ArchivingPopup
                                    key={popup.id} // 각 팝업의 고유한 ID 사용
                                    id={popup.id}
                                    title={popup.title}
                                    image={popup.image}
                                    name={popup.name}
                                    date={popup.date}
                                    isDeleted={isDeleted}
                                    isSelected={selectedPopups.includes(popup.id)}
                                    onClick={handlePopupClick}
                                />
                            ))}
                        </div>
                        <div className='note-container2'>
                            {container2Data.map((popup) => (
                                <ArchivingPopup
                                    key={popup.id} // 각 팝업의 고유한 ID 사용
                                    id={popup.id}
                                    title={popup.title}
                                    image={popup.image}
                                    name={popup.name}
                                    date={popup.date}
                                    isDeleted={isDeleted}
                                    isSelected={selectedPopups.includes(popup.id)}
                                    onClick={handlePopupClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='pagination'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <span
                        key={index + 1}
                        onClick={() => handlePageClick(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </span>
                ))}
            </div>

            {/* 모달 컴포넌트 */}
            {isModalOpen && selectedPopupDetail && (
                <ArchivingDetailModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    id={selectedPopupDetail.id}
                    title={selectedPopupDetail.title}
                    frontImage={selectedPopupDetail.image}
                    backImage={ExampleBack}
                    name={selectedPopupDetail.name}
                    date={selectedPopupDetail.date}
                />
            )}

            {/* 삭제 확인 모달 */}
            <SaveConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)} // 모달 닫기
                onConfirm={handleConfirmDelete} // 삭제 확인 시 호출될 함수
            />
        </>
    );
}
