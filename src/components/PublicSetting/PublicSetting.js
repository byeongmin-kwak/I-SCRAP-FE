import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOpen } from '../../store/publicSlice'; // Redux 액션 가져오기
import './PublicSetting.css';

export default function PublicSetting({ className }) {
    const open = useSelector((state) => state.publicSetting.open); // Redux 상태 조회
    const dispatch = useDispatch();

    const handleSetOpen = (status) => {
        dispatch(setOpen(status)); // Redux 상태 업데이트
    };

    return (
        <div className={className}>
            <button
                className={`open-button ${open === 'open' ? 'active' : ''}`}
                onClick={() => handleSetOpen('open')} // Redux 액션 디스패치
            >
                공개
            </button>
            <button
                className={`open-button ${open === 'not-open' ? 'active' : ''}`}
                onClick={() => handleSetOpen('not-open')} // Redux 액션 디스패치
            >
                비공개
            </button>
        </div>
    );
}
