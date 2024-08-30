import React, { useState } from 'react';
import './ArchivingPage.css';
import Example from '../../assets/popupex.PNG';
import ArchivingPopup from '../../components/ArchivingPopup/ArchivingPopup';
import ExampleBack from '../../assets/CardBackImages/rayout1.svg';
import DeletButton from '../../assets/deletbutton.svg';
import ArchivingDetailModal from '../../components/ArchivingDetailModal/ArchivingDetailModal'; // 모달 컴포넌트 import

export default function ArchivingPage() {
    const [popups, setPopups] = useState([
        { id: 1, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 1', date: '08.09' },
        { id: 2, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 2', date: '08.10' },
        { id: 3, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 3', date: '08.11' },
        { id: 4, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 4', date: '08.12' },
        { id: 5, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 5', date: '08.13' },
        { id: 6, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 6', date: '08.14' },
        { id: 7, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 7', date: '08.15' },
        { id: 8, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 8', date: '08.16' },
        { id: 9, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 9', date: '08.17' },
        { id: 10, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 10', date: '08.18' },
        { id: 11, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 11', date: '08.19' },
        { id: 12, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 12', date: '08.20' },
        { id: 13, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 13', date: '08.21' },
        { id: 14, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 14', date: '08.22' },
        { id: 15, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 15', date: '08.23' },
        { id: 16, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 16', date: '08.24' },
        { id: 17, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 17', date: '08.25' },
        { id: 18, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 18', date: '08.26' },
        { id: 19, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 19', date: '08.27' },
        { id: 20, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 20', date: '08.28' },
        { id: 21, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 21', date: '08.29' },
        { id: 22, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 22', date: '08.30' },
        { id: 23, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 23', date: '08.31' },
        { id: 24, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 24', date: '09.01' },
        { id: 25, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 25', date: '09.02' },
        { id: 26, title: '안녕 오피스 어쩌구', image: Example, name: '팝업 이름 26', date: '09.03' },
    ]);

    const itemsPerPage = 18; // 한 페이지에 18개의 아이템을 보여줌 (9개씩 두 컨테이너)
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleted, setIsDeleted] = useState(false); // 기본적으로 false로 설정
    const [selectedPopups, setSelectedPopups] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [selectedPopupDetail, setSelectedPopupDetail] = useState(null); // 선택된 팝업 데이터

    const totalPages = Math.ceil(popups.length / itemsPerPage);

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

    const handleCompleteButtonClick = () => {
        // 선택된 팝업들을 삭제
        const remainingPopups = popups.filter(popup => !selectedPopups.includes(popup.id));
        setPopups(remainingPopups); // 상태 업데이트
        setSelectedPopups([]); // 선택된 상태 초기화
        setIsDeleted(false); // 삭제 모드 해제
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

    return (
        <>
            <div className='archivingpage-container'>
                <div>
                    <input placeholder='팝업을 검색하세요.' className='popup-search-input'></input>
                    <button className='popup-search-button'>기록 추가하기</button>
                </div>
                <div className={`archiving-note ${isDeleted ? 'deleted' : ''}`}>
                    <div className='archiving-title-container'>
                        <div className='note-title-text'>oo의 팝업노트</div>
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
        </>
    );
}
