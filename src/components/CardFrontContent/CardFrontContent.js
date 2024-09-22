// src/components/CardFrontContent/CardFrontContent.js
import React from 'react';
import './CardFrontContent.css';
import StickerCanvas from '../StickerCanvas/StickerCanvas';
import GoForward from '../../assets/goforward.svg';
import GoBack from '../../assets/reset.svg';


export default function CardFrontContent() {
  return (
    <>
      <div className='card-container'>
        <div className='making-card-text'>
          <p>팝업카드 만들기  </p>
          <p className='making-card-option'>FRONT</p>
        </div>
        <div className='making-card-view'>
          <div className='adjust-buttons'>
            <img src={GoBack} />
            <img src={GoForward} />
          </div>
          <div className='maked-card'>만드는 카드 그림</div>
        </div>
      </div>
      <div className='custom-options'>
        <div className='add-text'>
          <div>텍스트</div>
          <button className='add-text-button'>추가하기</button>
        </div>
        <div className='rayout-font'>
          <div className='rayout'>레이아웃</div>
          <div className='font'>폰트</div>
        </div>
        <div className='image-sticker-background'>
          <div className='image'>사진선택</div>
          <StickerCanvas />
          <div className='background'>배경색</div>
        </div>
      </div>
    </>

  );
}
