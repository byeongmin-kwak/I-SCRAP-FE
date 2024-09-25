import React from 'react';
import './CardFrontRayout.css';
import { useDispatch } from 'react-redux';
import { setSelectedLayout } from '../../store/frontLayoutSlice';
import BackGroundColor from '../BackGroundColor/BackGroundColor';
import Rayout6 from '../../assets/CardFrontRayoutBasic/Group 641.svg'
import Rayout8 from '../../assets/CardFrontRayoutBasic/Group 707.svg';
import Rayout7 from '../../assets/CardFrontRayoutBasic/Group 716.svg';
import Rayout5 from '../../assets/CardFrontRayoutBasic/Group 800.svg';
import Rayout4 from '../../assets/CardFrontRayoutBasic/Group 900.svg';
import Rayout2 from '../../assets/CardFrontRayoutBasic/Group 901.svg';
import Rayout3 from '../../assets/CardFrontRayoutBasic/Group.svg';
import Rayout1 from '../../assets/CardFrontRayoutBasic/Vector.svg';

export default function CardFrontRayout() {
    const dispatch = useDispatch();

    const handleLayoutClick = (layout) => {
        dispatch(setSelectedLayout(layout));
    };


    return (
        <div className='rayout'>
            <div className='rayout-text'>레이아웃</div>
            <div className='frot-rayout-container'>
                <div className='card-front-rayouts'>
                    <img src={Rayout1} className='card-front-rayout' onClick={() => handleLayoutClick('layout1')} />
                    <img src={Rayout2} className='card-front-rayout' onClick={() => handleLayoutClick('layout2')} />
                    <img src={Rayout3} className='card-front-rayout' onClick={() => handleLayoutClick('layout3')} />
                    <img src={Rayout4} className='card-front-rayout' onClick={() => handleLayoutClick('layout4')} />
                    <img src={Rayout5} className='card-front-rayout' onClick={() => handleLayoutClick('layout5')} />
                    <img src={Rayout6} className='card-front-rayout' onClick={() => handleLayoutClick('layout6')} />
                    <img src={Rayout7} className='card-front-rayout' onClick={() => handleLayoutClick('layout7')} />
                    <img src={Rayout8} className='card-front-rayout' onClick={() => handleLayoutClick('layout8')} />
                </div>
                <div>
                    <BackGroundColor />
                </div>

            </div>
        </div>
    );
}
