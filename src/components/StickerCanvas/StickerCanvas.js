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
  //const stickers = importAll(require.context('../../assets/3D', false, /\.svg$/));
  //const stickers2 = importAll(require.context('../../assets/2D', false, /\.svg$/));
  //const stickers3 = importAll(require.context('../../assets/Line', false, /\.svg$/));
  //const stickers4 = importAll(require.context('../../assets/Drawing', false, /\.svg$/));
  //const stickers5 = importAll(require.context('../../assets/Real', false, /\.svg$/));
  //const stickers6 = importAll(require.context('../../assets/Frame', false, /\.svg$/));
  //const stickers7 = importAll(require.context('../../assets/Icecream', false, /\.svg$/));
  //const stickers8 = importAll(require.context('../../assets/Character', false, /\.svg$/));
  //Object.values(stickers)

  // 카테고리별 스티커 설정
  const categories = {
    "3D": [],  // stickers 객체에서 값만 추출
    "2D": [],
    "선 드로잉": [],
    "그림": [],
    "실사": [],
    "프레임/말풍선": [],
    "아이스크림": [],
    "캐릭터": [],
    // 추가적인 카테고리와 스티커 추가 가능
  };

  const [selectedCategory, setSelectedCategory] = useState("3D"); // 기본 선택 카테고리

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
          {categories[selectedCategory].slice().reverse().map((sticker, index) => (
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
