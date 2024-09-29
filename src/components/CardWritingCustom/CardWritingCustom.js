import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // useDispatch 추가
import { setTitle, setDetailedReview, setPhotos } from '../../store/backInfoSlice'; // 추가된 액션 불러오기
import PhotoModal from '../PhotoModal/PhotoModal';
import FlippedButton from '../../assets/flipped-button.svg';
import Location from "../../assets/location.svg";
import Market from "../../assets/marketplace.svg";
import './CardWritingCustom.css';

export default function CardWritingCustom() {
    const dispatch = useDispatch(); // Redux 액션을 사용하기 위한 dispatch
    const selectedPopup = useSelector((state) => state.popup.selectedPopup);
    const place = useSelector((state) => state.backInfo.place);
    const date = useSelector((state) => state.backInfo.date);
    const savedCardImage = useSelector((state) => state.card.savedCardImage);
    const savedBackImage = useSelector((state) => state.card.savedBackImage);
    const comment = useSelector((state) => state.backInfo.comment);
    const title = useSelector((state) => state.backInfo.title); // 제목 가져오기
    const detailedReview = useSelector((state) => state.backInfo.detailedReview); // 상세 리뷰 가져오기
    const photos = useSelector((state) => state.backInfo.photos); // 사진 배열 가져오기
    const [isFlipped, setIsFlipped] = useState(false); // 카드가 뒤집혔는지 여부를 관리하는 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

    const handleFlip = () => {
        setIsFlipped(!isFlipped); // 클릭할 때마다 상태를 변경하여 카드가 뒤집히도록 함
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleTitleChange = (e) => {
        dispatch(setTitle(e.target.value)); // 제목을 전역 상태로 저장
    };

    const handleDetailedReviewChange = (e) => {
        dispatch(setDetailedReview(e.target.value)); // 상세 리뷰를 전역 상태로 저장
    };

    const handlePhotoAdd = (newPhoto) => {
        dispatch(setPhotos([...photos, newPhoto])); // 새 사진 추가
    };

    return (
        <div className='card-writing'>
            <div className='card-writing-container'>
                <div className='making-card-text'>
                    <p>기록쓰기</p>
                    <p className='making-card-option'>{selectedPopup.name}</p>
                </div>
            </div>

            <div className={`writing-card ${isFlipped ? 'flipped' : ''}`}>
                <div className="writing-card-front">
                    {savedCardImage ? (
                        <img src={savedCardImage} alt="Saved card front" className='writing-card-view' />
                    ) : (
                        <p>저장된 카드 이미지가 없습니다.</p>
                    )}
                </div>
                <div className="writing-card-back">
                    {savedBackImage ? (
                        <img src={savedBackImage} alt="Saved card back" className='writing-card-view' />
                    ) : (
                        <p>저장된 카드 뒷면 이미지가 없습니다.</p>
                    )}
                </div>
                <img src={FlippedButton} alt="Flip Button" className="flipped-button" onClick={handleFlip} />
            </div>
            <div className='writing-info-container'>
                <div className='add-photo-container'>
                    <button className='add-photo' onClick={handleModalOpen}>사진추가</button>
                </div>
                <div className='popup-info'>
                    <div>
                        <div className='writing-date'>{date}</div>
                        <input
                            placeholder='제목'
                            className='writing-title'
                            value={title} // 제목을 전역 상태로부터 가져옴
                            onChange={handleTitleChange} // 제목이 변경될 때 상태 업데이트
                        />
                        <div className='market-locaton-container'>
                            <div className='market-container'>
                                <img src={Market} alt="Market" />
                                <div className='writing-popName'>{selectedPopup.name}</div>
                            </div>
                            <div className='location-container'>
                                <img src={Location} alt="Location" />
                                <div className='writing-place'>{place}</div>
                            </div>
                        </div>
                    </div>
                    <div className='writing-comment'>" {comment} "</div>
                </div>
            </div>
            <textarea
                className='popup-writing'
                placeholder='팝업 스토어에서의 경험을 더 자세하게 글로 적어주세요.'
                rows="1"
                value={detailedReview} // 상세 리뷰를 전역 상태로부터 가져옴
                onChange={handleDetailedReviewChange} // 상세 리뷰가 변경될 때 상태 업데이트
                onInput={(e) => {
                    e.target.style.height = 'auto'; // 높이를 자동으로 재설정
                    e.target.style.height = `${e.target.scrollHeight}px`; // 콘텐츠에 맞춰 높이 조정
                }}
            />
            {isModalOpen && <PhotoModal onClose={handleModalClose} onPhotoAdd={handlePhotoAdd} />} {/* 모달에서 사진 추가 */}
        </div>
    );
}
