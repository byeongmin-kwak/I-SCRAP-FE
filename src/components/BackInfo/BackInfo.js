import React from 'react';
import { useSelector } from 'react-redux';
import './BackInfo.css';
import BackLayoutColor from '../BackLayoutColor/BackLayoutColor';
import StarFilled from '../../assets/StarIcon/star-filled.svg';
import Star from '../../assets/StarIcon/star.svg';

export default function BackInfo() {
    // Redux state에서 backInfo 정보를 불러옴
    const { place, date, price, companion, rating } = useSelector((state) => state.backInfo);
    const selectedPopup = useSelector((state) => state.popup.selectedPopup);
    const name = selectedPopup ? selectedPopup.name : "";

    // rating에 따라 별을 채우는 함수
    const renderStars = (rating) => {
        const totalStars = 5; // 총 별 개수는 5개
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            if (i <= rating) {
                stars.push(<img key={i} src={Star} alt="star-filled" className="star-icon" />);
            } else {
                stars.push(<img key={i} src={StarFilled} alt="star" className="star-icon" />);
            }
        }
        return stars;
    };

    return (
        <div className='card-back-options'>
            <div className='card-back-info-text'>정보</div>
            <div className='card-back-info'>
                <div className='card-back-popname'>{name}</div>
                <div className='place-date'>
                    <div className='back-place'>{place}</div>
                    <div className='back-date'>{date}</div>
                </div>
                <div className='price-with-star'>
                    <div className='back-price'>{price}</div>
                    <div className='back-with'>{companion}</div>
                    <div className='back-star'>
                        {renderStars(rating)}
                    </div>
                </div>
            </div>
            <BackLayoutColor />
        </div>
    );
}
