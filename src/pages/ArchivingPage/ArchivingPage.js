import React, { useState, useEffect } from 'react';
import './ArchivingPage.css';
import ExampleBack from '../../assets/CardBackImages/rayout1.svg';
import DeletButton from '../../assets/deletbutton.svg';
import ArchivingPopup from '../../components/ArchivingPopup/ArchivingPopup';
import ArchivingDetailModal from '../../components/ArchivingDetailModal/ArchivingDetailModal';
import SaveConfirmModal from '../../components/SaveConfirmModal/SaveConfirmModal';
import axios from 'axios';

export default function ArchivingPage() {
    const [popups, setPopups] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedPopups, setSelectedPopups] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedPopupDetail, setSelectedPopupDetail] = useState(null);
    const savedUsername = localStorage.getItem("username") ? localStorage.getItem("username") : '익명';
    const itemsPerPage = 18;
    const totalPages = 5; // 페이지네이션을 5페이지로 제한

    useEffect(() => {
        const fetchPopups = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/reviews?page=${currentPage}`, {
                    withCredentials: true,
                });
                const fetchedData = response.data.map((item) => ({
                    id: item.id,
                    title: item.title,
                    image: item.cardFront,
                    name: item.popupName,
                    date: item.visitDate,
                }));
                console.log(response.data);
                setPopups(fetchedData);
            } catch (error) {
                console.error('팝업 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchPopups();
    }, [currentPage]);
    
    const container1Data = popups.slice(0, 9);
    const container2Data = popups.slice(9, 18);
    const placeholders = Array(9 - container2Data.length).fill(null);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteButtonClick = () => {
        setIsDeleted(true);
    };

    const handleCompleteButtonClick = () => {
        if (selectedPopups.length === 0) {
            setIsDeleted(false);
        } else {
            setIsConfirmModalOpen(true);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/reviews`, {
                data: {
                    reviewIds: selectedPopups
                },
                withCredentials: true,
            });

            const remainingPopups = popups.filter(popup => !selectedPopups.includes(popup.id));
            setPopups(remainingPopups);
            setSelectedPopups([]);
            setIsDeleted(false);
            setIsConfirmModalOpen(false);
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
            setSelectedPopupDetail(popup);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPopupDetail(null);
    };

    const handleAddRecord = () => {
        window.location.href = '/card-basic';
    };

    return (
        <>
            <div className='archivingpage-container'>
                <div className={`archiving-note ${isDeleted ? 'deleted' : ''}`}>
                    <div className='archiving-title-container'>
                        <div className='note-title-text'>{savedUsername}의 팝업노트</div>
                        <button className='popup-search-button' onClick={handleAddRecord}>기록 추가하기</button>
                        {(!isDeleted) ? (
                            <img
                                className='archiving-delete-button'
                                src={DeletButton}
                                onClick={handleDeleteButtonClick}
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
                                    key={popup.id}
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
                                    key={popup.id}
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
                            {/* placeholder 추가 */}
                            {placeholders.map((_, index) => (
                                <div key={index} className="popup-placeholder"></div>
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

            <SaveConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}
