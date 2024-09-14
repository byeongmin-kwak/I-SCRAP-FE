import React from 'react';
import './PublicSetting.css';

export default function PublicSetting({open, setOpen, className}) {
    return (
        <div className={className}>
            <button
                className={`open-button ${open === 'open' ? 'active' : ''}`}
                onClick={() => setOpen('open')}
            >
                공개
            </button>
            <button
                className={`open-button ${open === 'not-open' ? 'active' : ''}`}
                onClick={() => setOpen('not-open')}
            >
                비공개
            </button>
        </div>
    )
}
