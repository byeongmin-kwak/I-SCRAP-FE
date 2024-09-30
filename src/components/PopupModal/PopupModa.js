import React from 'react';
import Icon from "../../assets/logo.svg";
import { useNavigate } from 'react-router-dom';
import './PopupModal.css';

export default function PopupModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(); // 부모 컴포넌트에서 전달된 handleSaveCard 함수 호출
    onClose();   // 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className='modal-content-top'>
          <img src={Icon} className='modal-icon' />
        </div>
        <div className='modal-content-container'>
          <div className="modal-content">
            <p>팝업 기록을 멈추고 보관함으로 가시겠습니까?</p>
          </div>
          <div className="modal-buttons">
            <button className="modal-button no-button" onClick={onClose}>
              아니오
            </button>
            <button className="modal-button yes-button" onClick={handleConfirm}>
              예
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
