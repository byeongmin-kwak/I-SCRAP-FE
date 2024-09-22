import React from 'react';
import './PopupModal.css';

export default function PopupModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <p>팝업 기록을 멈추고 보관함으로 가시겠습니까?</p>
        </div>
        <div className="modal-buttons">
          <button className="modal-button no-button" onClick={onClose}>
            아니오
          </button>
          <button className="modal-button yes-button" onClick={onClose}>
            예
          </button>
        </div>
      </div>
    </div>
  );
}
