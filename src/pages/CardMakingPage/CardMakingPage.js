import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CardMakingPage.css';
import CardFront from '../../assets/CardMakingButtons/cardfront.svg';
import CardFront_Click from '../../assets/CardMakingButtons/cardfront_click.svg';
import CardBack from '../../assets/CardMakingButtons/cardback.svg';
import CardBack_Click from '../../assets/CardMakingButtons/cardback_click.svg';
import CardWriting from '../../assets/CardMakingButtons/cardwriting.svg';
import CardWriting_Click from '../../assets/CardMakingButtons/cardwriting_click.svg';
import MakingButton from '../../components/MakingButton/MakingButton'; // 새로운 버튼 컴포넌트
import PopupModal from '../../components/PopupModal/PopupModa';
import PublicSetting from '../../components/PublicSetting/PublicSetting';
import CardFrontCustom from '../../components/CardFrontCustom/CardFrontCustom';
import CardBackCustom from '../../components/CardBackCustom/CardBackCustom';
import CardWritingCustom from '../../components/CardWritingCustom/CardWritingCustom';
import Cloud from '../../assets/background-cloud.svg';
import axios from 'axios';

export default function CardMakingPage() {
  const [activeButton, setActiveButton] = useState('card-front');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedPopup = useSelector((state) => state.popup.selectedPopup); // popupId를 가져옴
  const open = useSelector((state) => state.publicSetting.open); // 전역 상태로부터 공개/비공개 상태 가져오기
  const { place, date, price, companion, comment, rating, reviewId, title, detailedReview, photosName } = useSelector((state) => state.backInfo);
  const { texts, stickers, savedCardImage, savedBackImage } = useSelector((state) => state.card);
  const { selectedLayout, backgroundColor } = useSelector((state) => state.frontLayout);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    console.log(open, selectedPopup.id, place, date, price, companion, comment, texts, stickers, selectedLayout, backgroundColor);
    console.log("리뷰아이디", reviewId);
  }, [])


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // Base64 데이터를 Blob으로 변환하는 함수
const base64ToBlob = (base64, mimeType) => {
  const byteString = atob(base64.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([intArray], { type: mimeType });
};

// 예시에서 savedCardImage와 savedBackImage가 Base64라고 가정
const handleSaveCard = async () => {
  if (!selectedPopup) {
    alert('필수 정보가 부족합니다.');
    return;
  }

  try {
    // savedCardImage를 Blob으로 변환
    const frontImageFileName = `${selectedPopup.id}-cardFront`;  // 파일 이름 생성
    const frontBlob = base64ToBlob(savedCardImage, 'image/png'); // Blob으로 변환
    
    const frontUploadResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/files/upload-url/${frontImageFileName}`, null, {
      withCredentials: true, // withCredentials 추가
    });
    const frontUploadUrl = frontUploadResponse.data.uploadUrl;

    await axios.put(frontUploadUrl, frontBlob, { 
      headers: { 'Content-Type': 'image/png' },
      withCredentials: true,  // withCredentials 추가
    });

    console.log('카드 앞면 이미지 업로드 성공');
    
    // savedBackImage도 Blob으로 변환하여 업로드
    const backImageFileName = `${selectedPopup.id}-cardBack`;  // 파일 이름 생성
    const backBlob = base64ToBlob(savedBackImage, 'image/png'); // Blob으로 변환

    const backUploadResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/files/upload-url/${backImageFileName}`, null, {
      withCredentials: true, // withCredentials 추가
    });
    const backUploadUrl = backUploadResponse.data.uploadUrl;

    await axios.put(backUploadUrl, backBlob, { 
      headers: { 'Content-Type': 'image/png' },
      withCredentials: true,  // withCredentials 추가
    });

    console.log('카드 뒷면 이미지 업로드 성공');

    // 파일 업로드가 성공하면 카드 데이터를 저장
    const textElements = texts.map((text) => ({
      type: 'text',
      content: text.text,
      font: text.fontFamily,
      size: text.fontSize,
      color: text.color,
      position: { x: text.x, y: text.y },
      rotation: text.rotation,
    }));

    const stickerElements = stickers.map((sticker) => ({
      type: 'sticker',
      sticker_id: sticker.src, // 서버에서 요구하는 sticker_id로 매핑
      size: { width: sticker.width, height: sticker.height },
      rotation: sticker.rotation,
      position: {
        x: sticker.x, // x 좌표를 반올림
        y: sticker.y, // y 좌표를 반올림
      },
    }));

    const elements = [...textElements, ...stickerElements];

    const cardData = {
      place: place,
      visitDate: date,
      amount: Number(price),
      companions: companion,
      rating: rating,
      title: title,
      shortComment: comment,
      detailedReview: detailedReview,
      photos: photosName, // 필요한 경우 사진 데이터 추가
      cardFront: frontImageFileName, // 파일 이름을 사용
      cardBack: backImageFileName, // 파일 이름을 사용
      layout: selectedLayout,
      backgroundColor: backgroundColor,
      elements, // 변환된 텍스트와 스티커 요소들
    };

    console.log(cardData);

    // 최종 PATCH 요청
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/reviews/${reviewId}`, cardData, {
      withCredentials: true, // withCredentials 추가
    });

    console.log('카드가 성공적으로 저장되었습니다.');
    alert("카드가 성공적으로 저장되었습니다.");
    
  } catch (error) {
    console.error('카드 저장 중 오류가 발생했습니다:', error);
  }
};


const handleSaveCard2 = async () => {
  if (!selectedPopup) {
    alert('필수 정보가 부족합니다.');
    return;
  }

  try {
    // savedCardImage를 Blob으로 변환
    const frontImageFileName = `${selectedPopup.id}-cardFront`;  // 파일 이름 생성
    const frontBlob = base64ToBlob(savedCardImage, 'image/png'); // Blob으로 변환
    
    const frontUploadResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/files/upload-url/${frontImageFileName}`, null, {
      withCredentials: true, // withCredentials 추가
    });
    const frontUploadUrl = frontUploadResponse.data.uploadUrl;

    await axios.put(frontUploadUrl, frontBlob, { 
      headers: { 'Content-Type': 'image/png' },
      withCredentials: true,  // withCredentials 추가
    });

    console.log('카드 앞면 이미지 업로드 성공');
    
    // savedBackImage도 Blob으로 변환하여 업로드
    const backImageFileName = `${selectedPopup.id}-cardBack`;  // 파일 이름 생성
    const backBlob = base64ToBlob(savedBackImage, 'image/png'); // Blob으로 변환

    const backUploadResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/files/upload-url/${backImageFileName}`, null, {
      withCredentials: true, // withCredentials 추가
    });
    const backUploadUrl = backUploadResponse.data.uploadUrl;

    await axios.put(backUploadUrl, backBlob, { 
      headers: { 'Content-Type': 'image/png' },
      withCredentials: true,  // withCredentials 추가
    });

    console.log('카드 뒷면 이미지 업로드 성공');

    // 파일 업로드가 성공하면 카드 데이터를 저장
    const textElements = texts.map((text) => ({
      type: 'text',
      content: text.text,
      font: text.fontFamily,
      size: text.fontSize,
      color: text.color,
      position: { x: text.x, y: text.y },
      rotation: text.rotation,
    }));

    const stickerElements = stickers.map((sticker) => ({
      type: 'sticker',
      sticker_id: sticker.src, // 서버에서 요구하는 sticker_id로 매핑
      size: { width: sticker.width, height: sticker.height },
      rotation: sticker.rotation,
      position: {
        x: Math.round(sticker.x), // x 좌표를 반올림
        y: Math.round(sticker.y), // y 좌표를 반올림
      },
    }));

    const elements = [...textElements, ...stickerElements];

    const cardData = {
      place: place,
      visitDate: date,
      amount: Number(price),
      companions: companion,
      rating: rating,
      title: title,
      shortComment: comment,
      detailedReview: detailedReview,
      photos: photosName, // 필요한 경우 사진 데이터 추가
      cardFront: frontImageFileName, // 파일 이름을 사용
      cardBack: backImageFileName, // 파일 이름을 사용
      layout: selectedLayout,
      backgroundColor: backgroundColor,
      elements, // 변환된 텍스트와 스티커 요소들
    };

    console.log(cardData);

    // 최종 PATCH 요청
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/reviews/${reviewId}`, cardData, {
      withCredentials: true, // withCredentials 추가
    });

    console.log('카드가 성공적으로 저장되었습니다.');
    alert("카드가 성공적으로 저장되었습니다.");
    navigate("/archiving");
    
  } catch (error) {
    console.error('카드 저장 중 오류가 발생했습니다:', error);
  }
};


  
  return (
    <div className='card-making-container-new'>
      <div className='card-making-container'>
        <div>
          <PublicSetting className={'card-making-setting'} />
          <div className='making-button-container'>
            <MakingButton
              isActive={activeButton === 'card-front'}
              onClick={() => setActiveButton('card-front')}
              imgSrc={CardFront}
              activeImgSrc={CardFront_Click}
              text="카드제작"
            />
            <MakingButton
              isActive={activeButton === 'card-back'}
              onClick={() => setActiveButton('card-back')}
              imgSrc={CardBack}
              activeImgSrc={CardBack_Click}
              text="뒷면제작"
            />
            <MakingButton
              isActive={activeButton === 'card-writing'}
              onClick={() => setActiveButton('card-writing')}
              imgSrc={CardWriting}
              activeImgSrc={CardWriting_Click}
              text="기록쓰기"
            />
          </div>
          <div className='saving-button-container'>
            <button className='moving-button' onClick={openModal}>보관함</button>
            <button className='card-save-button' onClick={handleSaveCard}>저장</button>
          </div>
        </div>
        {activeButton === 'card-front' && <CardFrontCustom />}
        {activeButton === 'card-back' && <CardBackCustom />}
        {activeButton === 'card-writing' && <CardWritingCustom />}

      </div>
      <img src={Cloud} className="cloud-image" alt="Cloud Background" />
      <PopupModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleSaveCard2}/>
    </div>
  );
}
