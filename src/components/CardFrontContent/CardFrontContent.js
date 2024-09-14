import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // 기본 스타일 불러오기
import './CardFrontContent.css';
import StickerCanvas from '../StickerCanvas/StickerCanvas';
import GoForward from '../../assets/goforward.svg';
import GoBack from '../../assets/reset.svg';
import { useSelector } from 'react-redux';
import BackGroundColor from '../BackGroundColor/BackGroundColor';
import CardFrontRayout from '../CardFrontRayout/CardFrontRayout';



export default function CardFrontContent() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [texts, setTexts] = useState([]);
  const [stickers, setStickers] = useState([]);
  const selectedLayout = useSelector((state) => state.frontLayout.selectedLayout); // 'layout' 대신 'frontLayout'

  


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


  const handleTextAdd = () => {
    const input = document.querySelector('.add-text-input');
    if (input.value.trim()) {
      const newText = {
        text: input.value,
        x: 50,
        y: 50,
        width: 80,
        height: 30,
        fontSize: 16, // 기본 폰트 크기
      };
      setTexts([...texts, newText]);
      input.value = '';
    }
  };

  const handleStickerSelect = (stickerSrc) => {
    const newSticker = {
      src: stickerSrc,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
    };
    setStickers([...stickers, newSticker]);
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
            <div
              className='maked-card'
              style={{ position: 'relative' }}
            >
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="card-image"
                />
              )}
              {selectedLayout && (
                <img
                  src={selectedLayout}
                  alt="Layout"
                  className="card-layout"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none', // 드래그 방지
                  }}
                />
              )}
              {stickers.map((sticker, index) => (
                <Draggable
                  key={index}
                  bounds="parent"
                  defaultPosition={{ x: sticker.x, y: sticker.y }}
                >
                  <ResizableBox
                    width={sticker.width}
                    height={sticker.height}
                    minConstraints={[50, 50]}
                    maxConstraints={[300, 300]}
                    className="resizable-box"
                  >
                    <img
                      src={sticker.src}
                      alt="sticker"
                      style={{
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                      }}
                    />
                  </ResizableBox>
                </Draggable>
              ))}
              {texts.map((text, index) => (
                <Draggable
                  key={index}
                  bounds="parent"
                >
                  <ResizableBox
                    width={texts[index].width}
                    height={texts[index].height}
                    minConstraints={[50, 10]}
                    maxConstraints={[300, 50]}
                    className="resizable-box"
                    onResizeStop={(e, data) => {
                      const updatedTexts = [...texts];
                      updatedTexts[index] = {
                        ...updatedTexts[index],
                        width: data.size.width,
                        height: data.size.height,
                        fontSize: Math.min(data.size.width / 3, 48), // 폰트 크기 조절
                      };
                      setTexts(updatedTexts);
                    }}
                  // 텍스트에 맞춰 ResizableBox의 크기를 조정하기 위한 동적 크기 설정
                  >
                    <div
                      className="draggable-text"
                      style={{
                        fontSize: `${texts[index].fontSize}px`, // 폰트 크기 적용
                        lineHeight: 'normal',
                        borderRadius: '3px',
                        cursor: 'move',
                        whiteSpace: 'pre-wrap', // 줄 바꿈을 위해 추가
                        overflow: 'hidden', // 오버플로우를 숨기기 위해 추가
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
          <CardFrontRayout />
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
          <StickerCanvas onStickerSelect={handleStickerSelect} />
          <BackGroundColor />
        </div>
      </div>
    </>
  );
}
