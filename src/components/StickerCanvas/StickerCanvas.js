import React, { useState } from 'react';
import Sticker from '../../components/Sticker/Sticker';
import Avocado from '../../assets/Sticker/Avocado.svg';
import Bear from '../../assets/Sticker/Bear.svg';
import Cherry from '../../assets/Sticker/Cherry.svg';
import Clubber from '../../assets/Sticker/Clubber.svg';
import CupCake from '../../assets/Sticker/CupCake.svg';
import Panda from '../../assets/Sticker/Panda.svg';
import Smile from '../../assets/Sticker/Smile.svg';
import Star from '../../assets/Sticker/Star.svg';
import Apple from '../../assets/Sticker/Apple.svg';
import Banana from '../../assets/Sticker/Banana.svg';
import Chocolate1 from '../../assets/Sticker/Chocolate1.svg';
import Chocolate2 from '../../assets/Sticker/Chocolate2.svg';
import Chocolate3 from '../../assets/Sticker/Chocolate3.svg';
import Glass from '../../assets/Sticker/Glass.svg';
import Peach from '../../assets/Sticker/Peach.svg';
import Strawberry from '../../assets/Sticker/Strawberry.svg';
import './StickerCanvas.css';

const StickerCanvas = ({ onStickerSelect }) => {
  const stickers = [Avocado, Bear, Cherry, Clubber, CupCake, Panda, Smile, Star, Apple, Banana, Chocolate1, Chocolate2, Chocolate3, Glass, Peach, Strawberry];

  return (

    <div className='sticker-canvas'>
      <div className='sticker-text'>스티커</div>
      <div className='stickers'>
        {stickers.map((sticker, index) => (
          <img
            key={index}
            src={sticker}
            alt="sticker"
            className="sticker-item"
            draggable="true"
            onDragStart={(e) => onStickerSelect(sticker)}
          />
        ))}
      </div>
    </div>

  );
};

export default StickerCanvas;
