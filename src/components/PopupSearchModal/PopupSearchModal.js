import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedPopup } from '../../store/popupSlice';
import ExamplePost from '../../assets/popupex.PNG';
import './PopupSearchModal.css';
import SearchPopupResult from '../SearchPopupResult/SearchPopupResult';

export default function PopupSearchModal({ isOpen, onClose, searchQuery, searchResults }) {
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState(null);

    if (!isOpen) return null;


    const handleClick = (id) => {
        setSelectedId(id);
    };

    const handleSelect = () => {
        const selectedPopup = searchResults.find((popup) => popup.id === selectedId);
        if (selectedPopup) {
            dispatch(setSelectedPopup(selectedPopup)); // 선택된 팝업을 전역 상태에 저장
            onClose(); // 모달 닫기
        }
    };


    return (
        <div className='popup-search-modal-overlay'>
            <div className='popup-search-modal-container'>
                <div className='search-value-container'>
                    <div className='searchQuery'>{searchQuery}</div>
                    <div onClick={onClose} className='popup-search-modal-close'>x</div>
                </div>
                <div className='search-popups-container'>
                    {searchResults.map((popup) => (
                        <SearchPopupResult
                            name={popup.name}
                            imgSrc={popup.poster}
                            dueDate={`${popup.dateRange.start}-${popup.dateRange.end}`}
                            className={selectedId === popup.id ? 'selected' : ''}
                            onClick={() => handleClick(popup.id)} // 클릭 핸들러 추가  
                        />
                    ))}
                </div>
                <div className='select-button-container'>
                    <button className='select-button' onClick={handleSelect}>선택하기</button>
                </div>
            </div>
        </div>
    );
}
