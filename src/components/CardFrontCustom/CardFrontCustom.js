import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './CardFrontCustom.css';
import StickerCanvas from '../StickerCanvas/StickerCanvas';
import GoForward from '../../assets/goforward.svg';
import GoBack from '../../assets/reset.svg';
import { useSelector } from 'react-redux';
import ImageUploader from '../ImageUploader/ImageUploader';
import CardFrontRayout from '../CardFrontRayout/CardFrontRayout';
import CardFrontLayoutRender from '../CardFrontLayoutRender/CardFrontLayoutRender';
import TextEditor from '../TextEditor/TextEditor';

export default function CardFrontCustom() {
  const [texts, setTexts] = useState([]);
  const [stickers, setStickers] = useState([]);
  const selectedLayout = useSelector((state) => state.frontLayout.selectedLayout);
  const selectedFont = useSelector((state) => state.font.selectedFont); // 선택된 폰트
  const selectedFontColor = useSelector((state) => state.font.selectedFontColor); // 선택된 폰트 색상
  const selectedColor = useSelector((state) => state.frontLayout.backgroundColor);
  const [activeButton, setActiveButton] = useState('image');
  const [selectedTextIndex, setSelectedTextIndex] = useState(null); // 선택된 텍스트 인덱스
  const [image, setImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [hue, setHue] = useState(0);

  // 글자의 크기를 측정하는 함수
  const measureTextSize = (text, fontSize) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `${fontSize}px Arial`; // 기본 폰트 사용
    const width = context.measureText(text).width * 1.2;
    const height = fontSize * 1.2; // 대략적인 높이 계산 (줄 간격 포함)
    return { width, height };
  };

  const handleTextAdd = (text) => {
    if (text.trim()) {
        const fontSize = 16; // 기본 폰트 크기
        const { width, height } = measureTextSize(text, fontSize); // 글자 크기 측정

        const newText = {
            text: text,
            x: 50,
            y: 50,
            width: width,  // 글자 너비로 초기화
            height: height, // 글자 높이로 초기화
            fontSize: fontSize, // 폰트 크기
            fontFamily: 'Cafe24 Simplehae', // 기본 폰트
            color: '#000', // 기본 색상
        };
        setTexts([...texts, newText]);
    }
  };

  const handleTextClick = (index) => {
    // 이미 선택된 글자를 다시 클릭하면 선택 해제
    if (selectedTextIndex === index) {
      setSelectedTextIndex(null);
    } else {
      setSelectedTextIndex(index); // 선택된 텍스트 인덱스를 저장
    }
  };

  // 선택된 텍스트에 폰트와 색상 적용
  useEffect(() => {
    if (selectedTextIndex !== null) {
      const updatedTexts = texts.map((text, idx) => {
        if (idx === selectedTextIndex) {
          return {
            ...text,
            fontFamily: selectedFont, // 선택된 폰트 적용
            color: selectedFontColor, // 선택된 폰트 색상 적용
          };
        }
        return text;
      });
      setTexts(updatedTexts);
    }
  }, [selectedFont, selectedFontColor]);

  const handleStickerSelect = (stickerSrc) => {
    const newSticker = {
      src: stickerSrc,
      x: 50,
      y: 50,
      width: 50,
      height: 50,
    };
    setStickers([...stickers, newSticker]);
  };

  // 카드 이미지나 빈 공간을 클릭했을 때 선택 해제
  const handleDeselect = () => {
    setSelectedTextIndex(null); // 선택 해제
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
              onClick={handleDeselect} // 빈 공간 클릭 시 선택 해제
            >
              {image && (
                <img
                  src={image}
                  alt="Selected"
                  className="card-image"
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg)`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // 이미지 클릭 시 선택 해제 방지
                    handleDeselect();
                  }}
                />
              )}
              <CardFrontLayoutRender selectedLayout={selectedLayout} selectedColor={selectedColor} />
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
                      const newFontSize = Math.min(Math.max(data.size.width / 6, 12), 48);

                      updatedTexts[index] = {
                        ...updatedTexts[index],
                        width: data.size.width,
                        height: data.size.height,
                        fontSize: newFontSize,
                      };

                      setTexts(updatedTexts);
                    }}
                  >
                    <div
                      className={`draggable-text ${selectedTextIndex === index ? 'selected' : ''}`}
                      style={{
                        fontSize: `${texts[index].fontSize}px`,
                        fontFamily: texts[index].fontFamily,
                        color: texts[index].color,
                        lineHeight: 'normal',
                        borderRadius: '3px',
                        cursor: 'move',
                        overflow: 'hidden',
                        border: selectedTextIndex === index ? '1px solid black' : 'none',
                      }}
                      onClick={(e) => {
                        e.stopPropagation(); // 텍스트 클릭 시 상위 요소 클릭 이벤트 방지
                        handleTextClick(index);
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
      <div className='front-custom-canvas-container'>
        <div className='front-custom-canvas'>
          {activeButton === 'image' &&
            <ImageUploader
              image={image}
              setImage={setImage}
              brightness={brightness}
              setBrightness={setBrightness}
              contrast={contrast}
              setContrast={setContrast}
              saturation={saturation}
              setSaturation={setSaturation}
              hue={hue}
              setHue={setHue}
            />}
          {activeButton === 'rayout' &&
            <CardFrontRayout />}
          {activeButton === 'sticker' &&
            <StickerCanvas onStickerSelect={handleStickerSelect} />}
          {activeButton === 'text' &&
            <TextEditor onClick={handleTextAdd} />}
        </div>
        <div className='front-custom-button-container'>
          <button className={`front-custom-button-a ${activeButton === 'image' ? 'active' : ''}`} onClick={() => setActiveButton('image')}>사진</button>
          <button className={`front-custom-button-b ${activeButton === 'rayout' ? 'active' : ''}`} onClick={() => setActiveButton('rayout')}>레이아웃</button>
          <button className={`front-custom-button-c ${activeButton === 'sticker' ? 'active' : ''}`} onClick={() => setActiveButton('sticker')}>스티커</button>
          <button className={`front-custom-button-b ${activeButton === 'text' ? 'active' : ''}`} onClick={() => setActiveButton('text')}>텍스트</button>
        </div>
      </div>
    </>
  );
}
