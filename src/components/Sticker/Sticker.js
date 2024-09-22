import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const Sticker = ({ imageSrc, position }) => {
  const [size, setSize] = useState({ width: 48, height: 48 });
  const [positionOffset, setPositionOffset] = useState(position);

  const handleResize = (event, { size }) => {
    const deltaX = (size.width - size.width) / 2;
    const deltaY = (size.height - size.height) / 2;

    setPositionOffset(prev => ({
      x: prev.x - deltaX,
      y: prev.y - deltaY,
    }));
    
    setSize(size);
  };

  const handleDrag = (e, data) => {
    setPositionOffset({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      position={positionOffset}
      onDrag={handleDrag}
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
