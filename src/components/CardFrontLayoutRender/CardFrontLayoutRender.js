import React from 'react'
import { ReactComponent as Layout1 } from '../../assets/CardFrontRayout/layout1.svg';
import { ReactComponent as Layout2 } from '../../assets/CardFrontRayout/layout2.svg';
import { ReactComponent as Layout3 } from '../../assets/CardFrontRayout/layout3.svg';
import { ReactComponent as Layout4 } from '../../assets/CardFrontRayout/layout4.svg';
import { ReactComponent as Layout5 } from '../../assets/CardFrontRayout/layout5.svg';
import { ReactComponent as Layout6 } from '../../assets/CardFrontRayout/layout6.svg';
import { ReactComponent as Layout7 } from '../../assets/CardFrontRayout/layout7.svg';
import { ReactComponent as Layout8 } from '../../assets/CardFrontRayout/layout8.svg';

export default function CardFrontLayoutRender({ selectedLayout, selectedColor }) {
    return (
        <div>
            {(selectedLayout === 'layout1') && (
                <Layout1
                    fill={selectedColor}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // 드래그 방지
                    }} />

            )}
            {(selectedLayout === 'layout2') && (
                <Layout2
                    fill={selectedColor}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // 드래그 방지
                    }} />

            )}
            {(selectedLayout === 'layout3') && (
                <Layout3
                    fill={selectedColor}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // 드래그 방지
                    }} />

            )}
            {(selectedLayout === 'layout4') && (
                <Layout4
                    fill={selectedColor}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // 드래그 방지
                    }} />

            )}
             {(selectedLayout === 'layout5') && (
                <Layout5
                    fill={selectedColor}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // 드래그 방지
                    }} />

            )}
             {(selectedLayout === 'layout6') && (
                <Layout6
                    fill={selectedColor}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // 드래그 방지
                    }} />

            )}
             {(selectedLayout === 'layout7') && (
                <Layout7
                    fill={selectedColor}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // 드래그 방지
                    }} />

            )}
             {(selectedLayout === 'layout8') && (
                <Layout8
                    fill={selectedColor}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // 드래그 방지
                    }} />

            )}

        </div>
    )
}
