import React from 'react';
import { ReactComponent as Layout1 } from '../../assets/CardFrontRayout/layout1.svg';
import { ReactComponent as Layout2 } from '../../assets/CardFrontRayout/layout2.svg';
import { ReactComponent as Layout2_b } from '../../assets/BlackLayouts/layout2.svg';
import { ReactComponent as Layout3 } from '../../assets/CardFrontRayout/layout3.svg';
import { ReactComponent as Layout4 } from '../../assets/CardFrontRayout/layout4.svg';
import { ReactComponent as Layout4_b } from '../../assets/BlackLayouts/layout4.svg';
import { ReactComponent as Layout5 } from '../../assets/CardFrontRayout/layout5.svg';
import { ReactComponent as Layout6_b } from '../../assets/Layout6/Frame 113.svg';
import { ReactComponent as Layout6_w } from '../../assets/Layout6/Frame 114.svg';
import { ReactComponent as Layout7 } from '../../assets/CardFrontRayout/layout7.svg';
import { ReactComponent as Layout7_b } from '../../assets/BlackLayouts/layout7.svg';
import { ReactComponent as Layout8 } from '../../assets/CardFrontRayout/layout8.svg';
import { ReactComponent as Layout8_b } from '../../assets/BlackLayouts/layout8.svg';

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
                selectedColor === '#000000' ? (
                    <Layout2_b
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                        }} />
                ) : (
                    <Layout2
                        fill={selectedColor}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                        }} />
                )
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
                selectedColor === '#000000' ? (
                    <Layout4_b
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                        }} />
                ) : (
                    <Layout4
                        fill={selectedColor}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                        }} />
                )
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
                selectedColor === '#FFFFFF' ? (
                    <Layout6_w
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none', // 드래그 방지
                        }} />
                ) : (
                    <Layout6_b
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none', // 드래그 방지
                        }} />
                )
            )}

            {(selectedLayout === 'layout7') && (
                selectedColor === '#000000' ? (
                    <Layout7_b
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                        }} />
                ) : (
                    <Layout7
                        fill={selectedColor}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                        }} />
                )
            )}

            {(selectedLayout === 'layout8') && (
                 selectedColor === '#000000' ? (
                    <Layout8_b
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                        }} />
                ) : (
                    <Layout8
                        fill={selectedColor}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                        }} />
                )
            )}
        </div>
    );
}
