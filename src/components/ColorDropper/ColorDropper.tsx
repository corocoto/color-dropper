import React, { useState, memo, useCallback, useEffect, useRef } from 'react';

// Component
import { MagnifierGlass, IconButton } from '../index';

// Images
import IconColorPicker from './assets/IconColorPicker.svg';

// Type definition
import {ColorDropperProps, UpdateGlassPosition} from './ColorDropper.types';

// Utils
import { rgbToHex, getGlassCoordinates } from './utils';

// Constants
import { ESC_BUTTON_NAME } from './constants';

// Styles
import variables from './components/MagnifierGlass/MagnifierGlassVariables.module.css'

// HOCs
import { withCanvasSize } from './hocs';

// Libs
import compose from 'lodash/fp/compose';

const borderWidth = parseFloat(variables.glassBorderWidth);

const ColorDropper = (props: ColorDropperProps) => {
    const { zoom, zoomingImage, canvasRef, canvasSize } = props

    // State
    const [isActive, setIsActive] = useState(false);

    // Refs
    const glassRef = useRef<HTMLDivElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    // Handlers
    const handleButtonClick = useCallback(() => {
        setIsActive(prevState => !prevState);
    }, []);

    const updateGlassPosition = useCallback(({glass, updatedX, updatedY, glassRadius}: UpdateGlassPosition) => {
        glass.style.left = `${updatedX - glassRadius}px`;
        glass.style.top = `${(updatedY - glassRadius / 2)}px`;

        glass.style.backgroundPosition = `-${(updatedX * zoom - glassRadius + borderWidth) * 1.5}px -${(updatedY * zoom - glassRadius + borderWidth) * 1.6}px`;
    }, [zoom]);

    const handleMove = useCallback((event: MouseEvent | TouchEvent) => {
        event.preventDefault();
        if (!canvasRef.current || !glassRef.current || !ctxRef.current) {
            return;
        }

        const glassRadius = glassRef.current.offsetWidth / 2;
        const { x, y } = getGlassCoordinates({
            moveEvent: event,
            canvas: canvasRef.current,
            canvasSize,
            glassRadius,
            zoom
        });
        updateGlassPosition({ glass: glassRef.current, updatedX: x, updatedY: y, glassRadius });

        const [r, g, b,] = ctxRef.current.getImageData(x * 1.97, y  * 2.13, 1, 1).data;
        const hexColor = rgbToHex(r, g, b);
        glassRef.current.style.border = `2px solid ${hexColor}`;
    }, [canvasRef, canvasSize, updateGlassPosition, zoom]);

    const handleCloseGlassByKeyPress = useCallback((event: KeyboardEvent) => {
        if(event.code === ESC_BUTTON_NAME) {
            setIsActive(false);
        }
    }, [])

    // Effects
    useEffect(() => {
        ctxRef.current = canvasRef.current?.getContext('2d', { willReadFrequently: true }) ?? null;
    }, [canvasRef]);

    useEffect(() => {
        window.addEventListener('keydown', handleCloseGlassByKeyPress);
        return () => {
            window.removeEventListener('keydown', handleCloseGlassByKeyPress);
        }
    }, [handleCloseGlassByKeyPress]);

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas?.addEventListener('mousemove', handleMove);
        canvas?.addEventListener('touchmove', handleMove);

        return () => {
            canvas?.removeEventListener('mousemove', handleMove);
            canvas?.removeEventListener('touchmove', handleMove);
        }
    }, [canvasRef, handleMove]);

    return (
        <>
            <IconButton isActive={isActive} onClick={handleButtonClick} icon={IconColorPicker} alt="color picker icon"/>
            {isActive && (
                <MagnifierGlass
                    ref={glassRef}
                    imageSource={zoomingImage}
                    zoom={zoom}
                    imageWidth={canvasSize.width}
                    imageHeight={canvasSize.height}
                    onMouseMove={handleMove}
                    onTouchMove={handleMove}
                />
            )}
        </>
    );
}

ColorDropper.displayName = 'ColorDropper';

export default compose(withCanvasSize, memo)(ColorDropper);