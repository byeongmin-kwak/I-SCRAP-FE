import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // 기본 스타일 불러오기
import './CardFrontContent.css';
import StickerCanvas from '../StickerCanvas/StickerCanvas';
import GoForward from '../../assets/goforward.svg';
import GoBack from '../../assets/reset.svg';

export default function CardFrontContent() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const [texts, setTexts] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpacityChange = (event) => {
    setOpacity(event.target.value);
  };

  const handleTextAdd = () => {
    const input = document.querySelector('.add-text-input');
    if (input.value.trim()) {
      const newText = {
        text: input.value,
        x: 50, // 초기 X 위치
        y: 50, // 초기 Y 위치
        width: 100, // 기본 너비
        height: 50, // 기본 높이
      };
      setTexts([...texts, newText]);
      input.value = ''; // 입력 필드 초기화
    }
  };

  return (
    <>
      <div className='card-container'>
        <div className='making-card-text'>
          <p>팝업카드 만들기</p>
          <p className='making-card-option'>FRONT</p>
        </div>
        <div className='making-card-view'>
          <div className='adjust-buttons'>
            <img src={GoBack} alt="Go back" />
            <img src={GoForward} alt="Go forward" />
          </div>
          <div>
            {selectedImage && (
              <div className='opacity-slider'>
                <label htmlFor="opacityRange">투명도</label>
                <input
                  type="range"
                  id="opacityRange"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={handleOpacityChange}
                />
              </div>
            )}
            <div className='maked-card'>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="card-image"
                  style={{ opacity: opacity }}
                />
              )}
              {texts.map((text, index) => (
                <Draggable
                  key={index}
                  bounds="parent"
                >
                  <ResizableBox
                    width={text.width}
                    height={text.height}
                    minConstraints={[50, 20]}
                    maxConstraints={[300, 200]}
                    className="resizable-box"
                  >
                    <div
                      className="draggable-text"
                      style={{
                        fontSize: '16px', // 기본 폰트 크기
                        lineHeight: '20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '3px',
                        padding: '2px 5px',
                        cursor: 'move',
                      }}
                    >
                      {text.text}
                    </div>
                  </ResizableBox>
                </Draggable>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='custom-options'>
        <div className='add-text'>
          <input
            className='add-text-input'
            placeholder='텍스트'
          />
          <button className='add-text-button' onClick={handleTextAdd}>추가하기</button>
        </div>
        <div className='rayout-font'>
          <div className='rayout'>레이아웃</div>
          <div className='font'>폰트</div>
        </div>
        <div className='image-sticker-background'>
          <div className='image'>
            <div style={{
              color: '#2E2E2E',
              fontSize: 15,
              fontFamily: 'Noto Sans KR',
              fontWeight: '500',
              wordWrap: 'break-word',
              marginTop: '17px',
              marginLeft: '-17px',
              marginBottom: '17px'
            }}>
              사진 선택
            </div>
            <div className='select-image'>
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" className="selected-image" />
              ) : null}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="image-select-input"
              style={{ display: 'none' }}
              id="imageUpload"
            />
            <label htmlFor="imageUpload" className="image-select-button">불러오기</label>
          </div>
          <StickerCanvas />
          <div className='background'>배경색</div>
        </div>
      </div>
    </>
  );
}
