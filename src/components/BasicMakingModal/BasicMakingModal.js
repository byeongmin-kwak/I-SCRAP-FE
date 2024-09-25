import React from 'react';
import { useSelector } from 'react-redux';
import basicLayout from '../../assets/CardBackLayout/layout1_new.svg';
import styles from './BasicMakingModal.module.css'; // 스타일은 별도 파일로 관리


export default function BasicMakingModal({ isOpen, onClose }) {
    const selectedPopup = useSelector((state) => state.popup.selectedPopup); // popupId를 가져옴
    const popName = selectedPopup? selectedPopup.name: "";
    const { place, date, price, companion } = useSelector((state) => state.backInfo);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div onClick={onClose} >x</div>
                <div>
                    <div className={styles.cardContainer}>
                        <div>
                            <img src={selectedPopup.image} className={styles.img} />
                        </div>

                        <div className={styles.svgContainer}>
                            <div className={styles.textOverlay}>
                                <div className={styles.info}>
                                    <div>{popName}</div>
                                    <div>{date}</div>
                                    <div>{place}</div>
                                    <div>{price}</div>
                                    <div>{companion}</div>
                                </div>
                            </div>
                            <img src={basicLayout} />
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
