import React from 'react';
import './CardBackLayout.css';
import { useDispatch } from 'react-redux';
import { setSelectedBackLayout } from '../../store/backLayoutSlice';
import Layout1 from '../../assets/CardBackLayout/layout1.svg';
import Layout2 from '../../assets/CardBackLayout/layout2.svg';
import Layout3 from '../../assets/CardBackLayout/layout3.svg';
import Layout4 from '../../assets/CardBackLayout/layout4.svg';
import Layout5 from '../../assets/CardBackLayout/layout5.svg';
import Layout6 from '../../assets/CardBackLayout/layout6.svg';


export default function CardBackLayout() {
    const dispatch = useDispatch();

    const handleLayoutClick = (layout) => {
        dispatch(setSelectedBackLayout(layout));
    };


    return (
        <div className='back-layout'>
            <div className='back-layout-text'>레이아웃</div>
            <div className='back-layout-container'>
                <div className='card-back-layouts'>
                    <img src={Layout1} className='card-back-layout' onClick={() => handleLayoutClick('layout1')} />
                    <img src={Layout2} className='card-back-layout' onClick={() => handleLayoutClick('layout2')} />
                    <img src={Layout3} className='card-back-layout' onClick={() => handleLayoutClick('layout3')} />
                    <img src={Layout4} className='card-back-layoutt' onClick={() => handleLayoutClick('layout4')} />
                    <img src={Layout5} className='card-back-layout' onClick={() => handleLayoutClick('layout5')} />
                    <img src={Layout6} className='card-back-layout' onClick={() => handleLayoutClick('layout6')} />
                </div>
            </div>
        </div>
    );
}
