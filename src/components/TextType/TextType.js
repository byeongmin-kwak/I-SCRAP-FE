import React from 'react';
import { useDispatch } from 'react-redux';
import { setFont } from '../../store/fontSlice';
import './TextType.css';

export default function TextType() {
    const dispatch = useDispatch();

    const handleFontSelect = (fontFamily) => {
        dispatch(setFont(fontFamily)); // 폰트 선택 시 리덕스에 업데이트
    };
    return (
        <div>
            <div className='font-text'>폰트</div>
            <div className='select-fonts'>
                <div className='select-font' >
                    <div className='text-number'>01</div>
                    <div className='font1' onClick={() => handleFontSelect('Cafe24 Simplehae')}>가나다라 ABCD</div>
                </div>
                <div className='select-font'>
                    <div className='text-number'>02</div>
                    <div className='font2' onClick={() => handleFontSelect('Cafe24 Ssurround')}>가나다라 ABCD</div>
                </div>
                <div className='select-font'>
                    <div className='text-number'>03</div>
                    <div className='font3' onClick={() => handleFontSelect('Cafe24 Moyamoya')}>가나다라 ABCD</div>
                </div>
                <div className='select-font'>
                    <div className='text-number'>04</div>
                    <div className='font4' onClick={() => handleFontSelect('CWDangamAsac-Bold')}>가나다라 ABCD</div>
                </div>
                <div className='select-font'>
                    <div className='text-number'>05</div>
                    <div className='font5' onClick={() => handleFontSelect('RixInooAriDuriR')}>가나다라 ABCD</div>
                </div>
                <div className='select-font'>
                    <div className='text-number'>06</div>
                    <div className='font6'onClick={() => handleFontSelect('LOTTERIACHAB')}>가나다라 ABCD</div>
                </div>
                <div className='select-font'>
                    <div className='text-number'>07</div>
                    <div className='font7' onClick={() => handleFontSelect('Hakgyoansim Mulgyeol')}>가나다라 ABCD</div>
                </div>
                <div className='select-font'>
                    <div className='text-number'>08</div>
                    <div className='font8' onClick={() => handleFontSelect('OdibeeSans')}>가나다라 ABCD</div>
                </div>
            </div>
        </div>
    )
}
