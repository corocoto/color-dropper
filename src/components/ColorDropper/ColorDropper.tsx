import React, {useState, memo, useCallback, useEffect, useRef} from 'react';

// Component
import {MagnifierGlass, IconButton} from "../index";

// Images
import IconColorPicker from "../../assets/IconColorPicker.svg";

// Type definition
import {ColorDropperProps} from "./ColorDropper.types";

// Utils
import {getCursorPosition} from "./utils";

const ColorDropper = (props: ColorDropperProps) => {
    const {zoom, zoomingImage, canvasRef} = props

    // State
    const [isActive, setIsActive] = useState(false);
    const [canvasSize, setCanvasSize] = useState({
        width: 0,
        height: 0
    });

    // Refs
    const glassRef = useRef<HTMLDivElement>(null);

    // Handlers
    const handleButtonClick = useCallback(() => {
        setIsActive(prevState => !prevState);
    }, []);

    const handleMove = useCallback((event: MouseEvent | TouchEvent) => {
        event.preventDefault();

        if (!canvasRef.current || !glassRef.current) {
            return;
        }

        const glassRadius = glassRef.current.offsetWidth / 2;
        let {x, y} = getCursorPosition(event, canvasRef.current);

        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > canvasSize.width - glassRadius / zoom) {
            x = canvasSize.width - glassRadius / zoom;
        }
        if (x < glassRadius / zoom) {
            x = glassRadius / zoom;
        }
        if (y > canvasSize.height - glassRadius / zoom) {
            y = canvasSize.height - glassRadius / zoom;
        }
        if (y < glassRadius / zoom) {
            y = glassRadius / zoom;
        }
        glassRef.current.style.left = `${x - glassRadius}px`;
        glassRef.current.style.top = `${y - glassRadius}px`;

        const borderWidth = 3;
        /* Display what the magnifier glass "sees": */
        glassRef.current.style.backgroundPosition = `-${(x * zoom - glassRadius + borderWidth) * 1.5}px -${(y * zoom - glassRadius + borderWidth) * 1.5}px`;
    }, [canvasRef, canvasSize.height, canvasSize.width, zoom]);

    const handleUpdateCanvasParamSize = useCallback(() => {
        setCanvasSize({
            width: canvasRef.current?.offsetWidth ?? 0,
            height: canvasRef.current?.offsetHeight ?? 0
        })
    }, [canvasRef])

    const handleCloseGlassByKeyPress = useCallback((event: KeyboardEvent) => {
        if(event.code === 'Escape') {
            setIsActive(false);
        }
    }, [])

    // Effects
    useEffect(() => {
        window.addEventListener('resize', handleUpdateCanvasParamSize);
        window.addEventListener('keydown', handleCloseGlassByKeyPress);

        return () => {
            window.removeEventListener('resize', handleUpdateCanvasParamSize);
            window.removeEventListener('keydown', handleCloseGlassByKeyPress);
        }
    }, [handleCloseGlassByKeyPress, handleUpdateCanvasParamSize]);

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas?.addEventListener("mousemove", handleMove);
        canvas?.addEventListener("touchmove", handleMove);

        handleUpdateCanvasParamSize();

        return () => {
            canvas?.removeEventListener("mousemove", handleMove);
            canvas?.removeEventListener("touchmove", handleMove);
        }
    }, [canvasRef, handleMove, handleUpdateCanvasParamSize]);


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

export default memo(ColorDropper);