import React from 'react';
import { useSelector } from 'react-redux';
import './BackInfo.css';
import BackLayoutColor from '../BackLayoutColor/BackLayoutColor';

export default function BackInfo() {
    // Redux state에서 backInfo 정보를 불러옴
    const { popName, place, date, price, companion, rating } = useSelector((state) => state.backInfo);

    return (
        <div className='card-back-options'>
            <div className='card-back-info-text'>정보</div>
            <div className='card-back-info'>
                <div className='card-back-popname'>{popName}</div>
                <div className='place-date'>
                    <div className='back-place'>{place}</div>
                    <div className='back-date'>{date}</div>
                </div>
                <div className='price-with-star'>
                    <div className='back-price'>{price}</div>
                    <div className='back-with'>{companion}</div>
                    <div className='back-star'>{rating}</div>
                </div>
            </div>
            <BackLayoutColor/>
        </div>
    );
}
