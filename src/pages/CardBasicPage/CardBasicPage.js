import React from 'react';
import Nav from '../../components/Nav/Nav';
import './CardBasicPage.css';

export default function CardBasicPage() {
    return (
        <>
            <Nav />
            <div className='card-basic-container'>
                <input className='popup-search' />
                <div className='popup-detail-container'>
                    <div className='popup-post-container'>
                        <div className='popup-post'> </div>
                        <div className='popup-name'>팝업이름</div>
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
                            별
                        </div>
                    </div>
                </div>
                <div className='button-container'>
                    <button className='save-button'>팝업카드 바로 저장하기</button>
                    <button className='custom-button'>카드 커스텀&기록 작성</button>
                </div>
            </div>

        </>

    )
}
