import React, { useState } from 'react';
import './StickerCanvas.css';

const StickerCanvas = ({ onStickerSelect }) => {
  // 폴더 내의 모든 svg 파일을 불러오는 함수
  const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => {
      images[item.replace('./', '')] = r(item); // .default를 사용하지 않고 접근
    });
    return images;
  };

  // '하트' 카테고리의 스티커 불러오기
  const stickers = importAll(require.context('../../assets/HeartSticker', false, /\.svg$/));

  // 카테고리별 스티커 설정
  const categories = {
    "하트": Object.values(stickers),  // stickers 객체에서 값만 추출
    "우주": [],
    "동물": [],
    "자연": [],
    "선/화살표": [],
    "도형/라벨": [],
    "말풍선": [],
    "캐릭터": []
    // 추가적인 카테고리와 스티커 추가 가능
  };

  const [selectedCategory, setSelectedCategory] = useState("하트"); // 기본 선택 카테고리

  return (
    <div className='sticker-canvas'>
      <div className='sticker-text'>스티커</div>
      <div className='sticker-category'>
        <div className='sticker-categories'>
          {Object.keys(categories).map((category, index) => (
            <div
              key={index}
              className={`category-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className='stickers'>
          {categories[selectedCategory].map((sticker, index) => (
            <img
              key={index}
              src={sticker}
              alt="sticker"
              className="sticker-item"
              draggable="true"
              onDragStart={() => onStickerSelect(sticker)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickerCanvas;
