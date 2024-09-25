import React, { useState } from 'react';
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

export default function CardMakingPage() {
  const [activeButton, setActiveButton] = useState('card-front');
  const [open, setOpen] = useState('open');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='card-making-container-new'>
      <div className='card-making-container'>
        <div>
          <PublicSetting open={open} setOpen={setOpen} className={'card-making-setting'} />
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
            <button className='card-save-button'>저장</button>
          </div>
        </div>
        {activeButton === 'card-front' && <CardFrontCustom />}
        {activeButton === 'card-back' && <CardBackCustom />}
        {activeButton === 'card-writing' && <CardWritingCustom />}

      </div>
      <img src={Cloud} className="cloud-image" alt="Cloud Background" />
      <PopupModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
