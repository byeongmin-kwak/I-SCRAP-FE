import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import StarFilled from '../../assets/StarIcon/star-filled.svg';
import Star from '../../assets/StarIcon/star.svg';
import SearchButton from '../../assets/search-button.svg';
import PublicSetting from '../../components/PublicSetting/PublicSetting';
import PopupSearchModal from '../../components/PopupSearchModal/PopupSearchModal';
import './CardBasicPage.css';

export default function CardBasicPage() {
    // 별점 상태 (1~5)
    const [rating, setRating] = useState(0);
    const [open, setOpen] = useState('open');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const selectedPopup = useSelector((state) => state.popup.selectedPopup);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 별을 렌더링하는 함수
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <img
                    key={i}
                    src={i <= rating ? Star : StarFilled} // 현재 rating 값에 따라 StarFilled 혹은 Star 사용
                    alt={`${i} star`}
                    className='star-icon'
                    onClick={() => setRating(i)} // 클릭하면 rating 상태를 해당 i로 설정
                />
            );
        }
        return stars;
    };

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
                    <img src={SearchButton} className='search-icon' onClick={openModal} />
                </div>
                <div className='popup-detail-container'>
                    <div className='popup-post-container'>
                        <PublicSetting open={open} setOpen={setOpen} className={'card-basic-setting'} />

                        {selectedPopup ? (
                            <>
                                <img src={selectedPopup.image} alt={selectedPopup.name} className='selected-popup-post' />
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
                            <input className='popup-detail-input' placeholder='관람한 장소'></input>
                        </div>
                        <div className='details-container'>
                            <p className='popup-detail-title'>관람 날짜</p>
                            <input className='popup-detail-input' placeholder='관람한 날짜'></input>
                        </div>
                        <div className='details-container'>
                            <p className='popup-detail-title'>금액</p>
                            <input className='popup-detail-input' placeholder='팝업스토어의 입장료'></input>
                        </div>
                        <div className='details-container'>
                            <p className='popup-detail-title'>동행인</p>
                            <input className='popup-detail-input' placeholder='같이 관람한 동행인을 입력해주세요'></input>
                        </div>
                        <div className='details-container'>
                            <p className='popup-detail-title'>별점</p>
                            <div className='star-rating'>
                                {renderStars()}
                            </div>
                        </div>
                        <div className='details-container'>
                            <p className='popup-detail-title'>한줄평</p>
                            <input className='popup-detail-input' placeholder='팝업에 대한 평을 입력해주세요 (50자 이내)'></input>
                        </div>
                    </div>
                </div>
                <div className='button-container'>
                    <button className='save-button'>팝업카드 바로 저장하기</button>
                    <button className='custom-button'>카드 커스텀&기록 작성</button>
                </div>
                <PopupSearchModal isOpen={isModalOpen} onClose={closeModal} searchQuery={searchInput} />
            </div >
        </>
    );
}
