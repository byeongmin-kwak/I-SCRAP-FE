import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';  // react-rnd 사용
import 'react-resizable/css/styles.css';
import './CardFrontCustom.css';
import StickerCanvas from '../StickerCanvas/StickerCanvas';
import GoForward from '../../assets/goforward.svg';
import GoBack from '../../assets/reset.svg';
import Reset from '../../assets/reset-new.svg';
import { useSelector, useDispatch } from 'react-redux';
import ImageUploader from '../ImageUploader/ImageUploader';
import CardFrontRayout from '../CardFrontRayout/CardFrontRayout';
import CardFrontLayoutRender from '../CardFrontLayoutRender/CardFrontLayoutRender';
import TextEditor from '../TextEditor/TextEditor';
import html2canvas from 'html2canvas';
import {
  setImage, addText, addSticker, updateText, updateSticker,
  setSavedCardImage, removeSticker, removeText, setBrightness, setContrast, setSaturation, setHue, setCropScale, setRotation
} from '../../store/cardSlice';
import { setFont, setSelectedFontColor } from '../../store/fontSlice';

export default function CardFrontCustom() {
  const dispatch = useDispatch();
  const texts = useSelector((state) => state.card.texts);
  const stickers = useSelector((state) => state.card.stickers);
  const image = useSelector((state) => state.card.image);
  const selectedLayout = useSelector((state) => state.frontLayout.selectedLayout);
  const selectedFont = useSelector((state) => state.font.selectedFont);
  const selectedFontColor = useSelector((state) => state.font.selectedFontColor);
  const selectedColor = useSelector((state) => state.frontLayout.backgroundColor);
  const selectedPopup = useSelector((state) => state.popup.selectedPopup);
  const [activeButton, setActiveButton] = useState('image');
  const [selectedTextIndex, setSelectedTextIndex] = useState(null); // 선택된 텍스트 인덱스
  const brightness = useSelector((state) => state.card.brightness);
  const contrast = useSelector((state) => state.card.contrast);
  const saturation = useSelector((state) => state.card.saturation);
  const hue = useSelector((state) => state.card.hue);
  const cropScale = useSelector((state) => state.card.cropScale);
  const rotation = useSelector((state) => state.card.rotation);

  const [undoStack, setUndoStack] = useState([]); // undo를 위한 상태 기록
  const [redoStack, setRedoStack] = useState([]);

  const cardRef = useRef(null);

  // 글자의 크기를 측정하는 함수
  const measureTextSize = (text, fontSize) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `${fontSize}px Arial`;
    const width = context.measureText(text).width * 1.2;
    const height = fontSize * 1.2;
    return { width, height };
  };

  const saveCurrentState = () => {
    setUndoStack((prevStack) => [
      ...prevStack,
      { texts, stickers, image, brightness, contrast, saturation, hue, cropScale, rotation },
    ]);
  };

  const handleTextDelete = (index) => {
    dispatch(removeText(index));  // 해당 텍스트를 삭제하는 액션 호출
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1];
      setRedoStack((prevStack) => [
        ...prevStack,
        { texts, stickers, image, brightness, contrast, saturation, hue, cropScale, rotation },
      ]);
      // 마지막 상태로 복원
      setUndoStack((prevStack) => prevStack.slice(0, -1));
      dispatch(setImage(lastState.image));
      // 기타 상태들도 복원
    }
  };

  // Redo 기능
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack((prevStack) => [
        ...prevStack,
        { texts, stickers, image, brightness, contrast, saturation, hue, cropScale, rotation },
      ]);
      setRedoStack((prevStack) => prevStack.slice(0, -1));
      dispatch(setImage(nextState.image));
      // 기타 상태들도 복원
    }
  };

  // Reset 기능
  const handleReset = () => {
    // 카드 상태 초기화
    setUndoStack([]);
    setRedoStack([]);
  };

  const handleTextAdd = (text) => {
    if (text.trim()) {
      const fontSize = 16;
      const { width, height } = measureTextSize(text, fontSize);

      // 새 텍스트는 기본 폰트와 기본 색상으로 설정
      const newText = {
        text: text,
        x: 50,
        y: 50,
        width: width,
        height: height,
        fontSize: fontSize,
        fontFamily: 'Cafe24 Simplehae',  // 기본 폰트
        color: '#000',  // 기본 색상
        rotation: 0,
      };

      dispatch(addText(newText));
      setSelectedTextIndex(texts.length);  // 새로 추가한 텍스트를 선택된 텍스트로 설정
    }
  };

  const handleTextClick = (index) => {
    setSelectedTextIndex(index); // 선택된 텍스트 인덱스 저장
  };

  const applyFontAndColorToText = () => {
    if (selectedTextIndex !== null) {
      const currentText = texts[selectedTextIndex];

      // 기존 텍스트에 대해서만 폰트와 색상을 선택한 값으로 업데이트
      const updatedText = {
        ...currentText,
        fontFamily: selectedFont || currentText.fontFamily,  // 폰트 적용
        color: selectedFontColor || currentText.color,  // 색상 적용
      };

      dispatch(updateText({ index: selectedTextIndex, newText: updatedText }));
    }
  };

  // 사용자가 폰트나 색상을 선택했을 때 텍스트에 적용


  const handleCapture = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, { scale: 2, useCORS: true, }).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        dispatch(setSavedCardImage(imageData));
      });
    }
  };

  const handleStickerSelect = (stickerSrc) => {
    const newSticker = {
      src: stickerSrc,
      x: 50,
      y: 50,
      width: stickerSrc.width,
      height: stickerSrc.height,
      rotation: 0,
    };
    dispatch(addSticker(newSticker));
  };

  const handleDeselect = () => {
    setSelectedTextIndex(null);
  };


  const handleStickerDelete = (index) => {
    dispatch(removeSticker(index));  // removeSticker 액션 호출
  };


  useEffect(() => {
    if (selectedPopup && !image) {
      dispatch(setImage(selectedPopup.poster));
    }
  }, [selectedPopup]);

  useEffect(() => {
    saveCurrentState();
  }, [texts, stickers, image, brightness, contrast, saturation, hue, cropScale, rotation]);

  useEffect(() => {
    handleCapture();
  }, [texts, stickers, image, selectedColor, selectedLayout, selectedFont, selectedFontColor]);

  useEffect(() => {
    applyFontAndColorToText();
  }, [selectedFont, selectedFontColor]);  // 폰트나 색상이 변경되면 해당 텍스트에만 적용



  return (
    <>
      <div className='card-container'>
        <div className='making-card-text'>
          <p>팝업카드 만들기</p>
          <p className='making-card-option'>FRONT</p>
        </div>
        <div className='making-card-view'>
          <div className='adjust-buttons'>
            <img src={GoBack} alt="Go back" onClick={handleUndo} />
            <img src={GoForward} alt="Go forward" onClick={handleRedo} />
            <img src={Reset} alt="Reset" onClick={handleReset} />
          </div>
          <div>
            <div
              className='maked-card'
              style={{ position: 'relative' }}
              onClick={handleDeselect}
            >
              <div
                className="card-image-wrapper"
                ref={cardRef}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)'
                }}
              >
                <img
                  src={image}
                  alt="Selected"
                  className="card-image"
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg)`,
                    transform: `scale(${cropScale}) rotate(${rotation}deg)`, // 자르기 및 회전 적용
                    transformOrigin: 'center', // 회전 중심을 이미지의 중앙으로 설정
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                <CardFrontLayoutRender selectedLayout={selectedLayout} selectedColor={selectedColor} />

                {/* 스티커 요소 */}
                {stickers.map((sticker, index) => (
                  <Rnd
                    key={index}
                    size={{ width: sticker.width, height: sticker.height }}
                    position={{ x: sticker.x, y: sticker.y }}
                    bounds="parent"
                    onDragStop={(e, d) => {
                      const updatedSticker = { ...sticker, x: d.x, y: d.y };
                      dispatch(updateSticker({ index, newSticker: updatedSticker }));
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      const updatedSticker = {
                        ...sticker,
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        ...position,
                      };
                      dispatch(updateSticker({ index, newSticker: updatedSticker }));
                    }}
                    style={{ transform: `rotate(${sticker.rotation}deg)` }} // 회전 적용
                  >
                    <img
                      src={sticker.src}
                      alt="sticker"
                      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                    />
                  </Rnd>
                ))}

                {/* 텍스트 요소 */}
                {texts.map((text, index) => (
                  <Rnd
                    key={index}
                    size={{ width: text.width, height: text.height }}
                    position={{ x: text.x, y: text.y }}
                    bounds="parent"
                    onDragStop={(e, d) => {
                      const updatedText = { ...text, x: d.x, y: d.y };
                      dispatch(updateText({ index, newText: updatedText }));
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      const updatedText = {
                        ...text,
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        fontSize: Math.min(Math.max(ref.offsetWidth / 6, 12), 48),
                        ...position,
                      };
                      dispatch(updateText({ index, newText: updatedText }));
                    }}
                    style={{ transform: `rotate(${text.rotation}deg)` }}
                  >
                    <div
                      className={`draggable-text ${selectedTextIndex === index ? 'selected' : ''}`}
                      style={{
                        fontSize: `${text.fontSize}px`,
                        fontFamily: text.fontFamily,
                        color: text.color,
                        lineHeight: 'normal',
                        borderRadius: '3px',
                        cursor: 'move',
                        overflow: 'visible',
                        border: selectedTextIndex === index ? '1px solid black' : 'none',
                        position: 'relative' // 상대적 위치 설정
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTextClick(index);
                      }}
                    >
                      {text.text}
                      {/* 'x' 버튼 추가 */}
                      {selectedTextIndex === index && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            backgroundColor: '#4AC7CF',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: '10',
                            fontSize: '13px',
                            
                          }}
                          onClick={() => handleTextDelete(index)}
                        >
                          x {/* 'x' 아이콘 */}
                        </div>
                      )}
                    </div>
                  </Rnd>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='front-custom-canvas-container'>
        <div className='front-custom-canvas'>
          {activeButton === 'image' &&
            <ImageUploader />
          }
          {activeButton === 'rayout' &&
            <CardFrontRayout />
          }
          {activeButton === 'sticker' && (
            <>
              <StickerCanvas onStickerSelect={handleStickerSelect} />
              <div className="used-sticker-list">
                <div className='used-sticker-text'>추가된 스티커</div>
                {stickers.map((sticker, index) => (
                  <div key={index} className="used-sticker-item">
                    <div className="delete-sticker" onClick={() => handleStickerDelete(index)}>
                      &#x2716; {/* 'x' 아이콘 */}
                    </div>
                    <img src={sticker.src} alt="sticker" className="used-sticker-image" />
                  </div>
                ))}
              </div>
            </>
          )}
          {activeButton === 'text' &&
            <TextEditor onClick={handleTextAdd} />
          }
        </div>
        <div className='front-custom-button-container'>
          <button className={`front-custom-button-a ${activeButton === 'image' ? 'active' : ''}`} onClick={() => setActiveButton('image')}>사진</button>
          <button className={`front-custom-button-b ${activeButton === 'rayout' ? 'active' : ''}`} onClick={() => setActiveButton('rayout')}>레이아웃</button>
          <button className={`front-custom-button-b ${activeButton === 'sticker' ? 'active' : ''}`} onClick={() => setActiveButton('sticker')}>스티커</button>
          <button className={`front-custom-button-c ${activeButton === 'text' ? 'active' : ''}`} onClick={() => setActiveButton('text')}>텍스트</button>
        </div>
      </div>
    </>
  );
}