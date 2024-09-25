import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import StarFilled from '../../assets/StarIcon/star-filled.svg';
import Star from '../../assets/StarIcon/star.svg';
import SearchButton from '../../assets/search-button.svg';
import PublicSetting from '../../components/PublicSetting/PublicSetting';
import PopupSearchModal from '../../components/PopupSearchModal/PopupSearchModal';
import { setOpen } from '../../store/publicSlice';  // Redux 액션 추가
import { setDate, setPlace, setPrice, setComment, setRating, setCompanion } from '../../store/backInfoSlice';
import BasicMakingModal from '../../components/BasicMakingModal/BasicMakingModal';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import './CardBasicPage.css';

export default function CardBasicPage() {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const open = useSelector((state) => state.publicSetting.open); // 전역 상태로부터 공개/비공개 상태 가져오기
    const selectedPopup = useSelector((state) => state.popup.selectedPopup); // popupId를 가져옴
    const date = useSelector((state) => state.backInfo.date);
    const rating = useSelector((state) => state.backInfo.rating);
    const place = useSelector((state) => state.backInfo.place);
    const amount = useSelector((state) => state.backInfo.price);
    const companions = useSelector((state) => state.backInfo.companion);
    const comment = useSelector((state) => state.backInfo.comment);
    const baseUrl = 'https://mbnbcpl609.execute-api.ap-northeast-2.amazonaws.com/dev/';

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openModal2 = () => setModalOpen(true);
    const closeModal2 = () => setModalOpen(false);

    // 별을 렌더링하는 함수
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <img
                    key={i}
                    src={i <= rating ? Star : StarFilled}
                    alt={`${i} star`}
                    className='star-icon'
                    onClick={() => dispatch(setRating(i))}
                />
            );
        }
        return stars;
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${baseUrl}search/popups?popupName=${searchInput}`);
            console.log(response.data);
            setSearchResults(response.data); // API 응답 데이터를 상태로 저장
            openModal(); // 모달 열기
        } catch (error) {
            console.error('검색 요청 중 오류가 발생했습니다:', error);
        }
    };

    // 팝업카드 바로 저장하기 버튼 클릭 시 호출되는 함수
    const handleSavePopupCard = async () => {
        if (!selectedPopup) {
            alert('필수 정보가 부족합니다.');
            return;
        }

        const reviewData = {
            place: place || 'Unknown Place', // 장소 입력 없으면 기본값
            visitDate: date,  // 기본으로 오늘 날짜를 전달
            amount: amount,
            companions: companions || 'None', // 동행인 입력 없으면 기본값
            rating: rating,
            popupId: selectedPopup.id,  // 필수 데이터
            isPublic: open === 'open',  // 공개 상태를 Redux에서 가져옴
            cardImage: 'defaultImage.png',
        };

        try {
            const response = await axios.post(`${baseUrl}reviews`, reviewData);
            console.log('리뷰가 성공적으로 저장되었습니다:', response.data);
        } catch (error) {
            console.error('리뷰 저장 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(()=>{
        console.log(comment);
    }, [comment])

    return (
        <>
            <Nav />
            <div className='card-basic-container'>
                <div className='popup-search-container'>
                    <input
                        className='popup-search'
                        placeholder='팝업을 검색하세요'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <img src={SearchButton} className='search-icon' onClick={handleSearch} />
                </div>
                <div className='popup-detail-container'>
                    <div className='popup-post-container'>
                        <PublicSetting className={'card-basic-setting'} /> {/* Redux 기반의 PublicSetting 사용 */}

                        {selectedPopup ? (
                            <>
                                <img src={selectedPopup.image} className='selected-popup-post' />
                                <div className='popup-name'>{selectedPopup.name}</div>
                            </>
                        ) : (
                            <>
                                <div className='popup-post'> </div>
                                <div className='popup-name'>팝업이름</div>
                            </>
                        )}
                    </div>
                    <div className='popup-detail'>
                        <div className='details-container'>
                            <p className='popup-detail-title'>관람장소</p>
                            <input
                                className='popup-detail-input'
                                placeholder='관람한 장소'
                                value={place}
                                onChange={(e) => dispatch(setPlace(e.target.value))}
                            />
                        </div>
                        <div className='details-container'>
                            <p className='popup-detail-title'>관람 날짜</p>
                            <input
                                className='popup-detail-input'
                                type='date'
                                value={date}
                                onChange={(e) => dispatch(setDate(e.target.value))}
                            />
                        </div>
                        <div className='details-container'>
                            <p className='popup-detail-title'>금액</p>
                            <input
                                className='popup-detail-input'
                                placeholder='팝업스토어의 입장료'
                                value={amount}
                                onChange={(e) => dispatch(setPrice(e.target.value))}
                            />
                        </div>
                        <div className='details-container'>
                            <p className='popup-detail-title'>동행인</p>
                            <input
                                className='popup-detail-input'
                                placeholder='같이 관람한 동행인을 입력해주세요'
                                value={companions}
                                onChange={(e) => dispatch(setCompanion(e.target.value))}
                            />
                        </div>
                        <div className='details-container'>
                            <p className='popup-detail-title'>별점</p>
                            <div className='star-rating'>
                                {renderStars()}
                            </div>
                        </div>
                        <div className='details-container'>
                            <p className='popup-detail-title'>한줄평</p>
                            <input
                                className='popup-detail-input'
                                placeholder='팝업에 대한 평을 입력해주세요 (50자 이내)'
                                value={comment}
                                onChange={(e) => dispatch(setComment(e.target.value))} // 카드 이미지 입력 처리
                            />
                        </div>
                    </div>
                </div>
                <div className='button-container'>
                    <button className='save-button' onClick={openModal2}>팝업카드 바로 저장하기</button> {/* 저장 버튼에 onClick 추가 */}
                    <button className='custom-button'>카드 커스텀&기록 작성</button>
                </div>
                <PopupSearchModal isOpen={isModalOpen} onClose={closeModal} searchQuery={searchInput} searchResults={searchResults} />
                <BasicMakingModal isOpen={modalOpen} onClose={closeModal2}/>
            </div>
        </>
    );
}
