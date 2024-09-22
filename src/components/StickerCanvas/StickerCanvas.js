import React from 'react';
import Sticker from '../Sticker/Sticker';
import Avocado from '../../assets/Sticker/Avocado.svg';
import Bear from '../../assets/Sticker/Bear.svg';
import Cherry from '../../assets/Sticker/Cherry.svg';
import Clubber from '../../assets/Sticker/Clubber.svg';
import CupCake from '../../assets/Sticker/CupCake.svg';
import Panda from '../../assets/Sticker/Panda.svg';
import './StickerCanvas.css';
import Smile from '../../assets/Sticker/Smile.svg';
import Star from "../../assets/Sticker/Star.svg";


export default function StickerCanvas() {
  const stickers = [
    { src: Avocado, position: { x: 0, y: 0 } },
    { src: Bear, position: { x: 20, y: 0 } },
    { src: Cherry, position: { x: 40, y: 0 } },
    { src: Clubber, position: { x: 60, y: 0 } },
    { src: CupCake, position: { x: 80, y: 0 } },
    // 추가 스티커...
  ];
  return (
    <div className='sticker'>
      <div>스티커</div>
      <div>
        {stickers.map((sticker, index) => (
          <Sticker key={index} imageSrc={sticker.src} position={sticker.position} />
        ))}
      </div>
    </div>

  );
}

