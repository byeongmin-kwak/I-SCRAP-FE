import React from 'react';
import icon from '../../assets/logo.svg';

export default function SaveConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className='modal-content-top'>
                    <img src={icon} className='modal-icon'/>
                </div>
                <div className='modal-content-container'>
                    <div className="modal-content">
                        <p>당신의 팝업 기록을 정말로 삭제하시겠습니까?</p>
                    </div>
                    <div className="modal-buttons">
                        <button className="modal-button no-button" onClick={onClose}>
                            아니오
                        </button>
                        <button
                            className="modal-button yes-button"
                            onClick={() => {
                                onConfirm(); // 삭제 함수 호출
                            }}
                        >
                            예
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
