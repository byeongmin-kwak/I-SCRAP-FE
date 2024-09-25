import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';


const Sticker = ({ imageSrc, position, onDragStart }) => {
  const [size, setSize] = useState({ width: 48, height: 48 });
  const [positionOffset, setPositionOffset] = useState(position);

  // 드래그 중인 스티커의 크기와 위치를 조절하는 함수
  const handleResize = (event, { size }) => {
    setSize(size);
  };

  // 드래그할 때 스티커의 위치를 조절하는 함수
  const handleDrag = (e, data) => {
    setPositionOffset({ x: data.x, y: data.y });
  };

  // 드래그를 시작할 때 호출되는 함수
  const handleStart = (e) => {
    onDragStart && onDragStart();
  };

  return (
    <Draggable
      position={positionOffset}
      onDrag={handleDrag}
      onStart={handleStart}
    >
      <div style={{ display: 'inline-block' }}>
        <ResizableBox 
          width={size.width}
          height={size.height}
          resizeHandles={['se']}
          onResize={handleResize}
          minConstraints={[20, 20]}
          maxConstraints={[200, 200]}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
          lockAspectRatio={true}
        >
          <img src={imageSrc} alt="sticker" style={{ width: '100%', height: '100%' }} />
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Sticker;
