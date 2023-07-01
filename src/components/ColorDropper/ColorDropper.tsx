import { useState, memo, useCallback, useEffect, useRef, useMemo } from 'react';

// Component
import { MagnifierGlass, IconButton } from '../index';

// Images
import IconColorPicker from './assets/IconColorPicker.svg';

// Type definition
import {ColorDropperProps, UpdateGlassPosition} from './ColorDropper.types';

// Utils
import { rgbToHex, getGlassCoordinates } from './utils';

// Constants
import { ESC_BUTTON_NAME, PICK_COLOR_EVENT_NAME } from './constants';

// Styles
import styles from './ColorDropper.module.css'
import variables from './components/MagnifierGlass/MagnifierGlassVariables.module.css'

// HOCs
import { withCanvasSize } from './hocs';

// Libs
import compose from 'lodash/fp/compose';
import debounce from 'lodash/debounce';

const borderWidth = parseFloat(variables.glassBorderWidth);
const pickColorEvent = new CustomEvent(PICK_COLOR_EVENT_NAME, {
    detail: { selectedColor: '' }
});

const ColorDropper = (props: ColorDropperProps) => {
    const { zoom, zoomingImage, canvasRef, canvasSize } = props

    // State
    const [isActive, setIsActive] = useState(false);
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null)

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

        const [r, g, b,] = ctxRef.current.getImageData(x * 1.99, y  * 2.09, 1, 1).data;
        const hexColor = rgbToHex(r, g, b);

        glassRef.current.style.setProperty('--border-color', hexColor);
        setHoveredColor(hexColor);
    }, [canvasRef, canvasSize, updateGlassPosition, zoom]);

    const handleDebouncedMove = useMemo(() => debounce(handleMove, 10), [handleMove]);

    const handleGlassClick = useCallback(() => {
        setSelectedColor(hoveredColor);
    }, [hoveredColor])

    const handleCloseGlassByKeyPress = useCallback((event: KeyboardEvent) => {
        if(event.code === ESC_BUTTON_NAME) {
            setIsActive(false);
        }
    }, []);

    // Effects
    useEffect(() => {
        pickColorEvent.detail.selectedColor = selectedColor as string;
        window.dispatchEvent(pickColorEvent);
    }, [selectedColor])

    useEffect(() => {
        !isActive && setHoveredColor(null);
    }, [isActive])

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

        canvas?.addEventListener('mousemove', handleDebouncedMove);
        canvas?.addEventListener('touchmove', handleDebouncedMove);

        return () => {
            canvas?.removeEventListener('mousemove', handleDebouncedMove);
            canvas?.removeEventListener('touchmove', handleDebouncedMove);
        }
    }, [canvasRef, handleDebouncedMove]);


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
                    onMouseMove={handleDebouncedMove}
                    onTouchMove={handleDebouncedMove}
                    onClick={handleGlassClick}
                >
                    <span className={styles.hoveredColor}>{hoveredColor}</span>
                </MagnifierGlass>
            )}
        </>
    );
}

ColorDropper.displayName = 'ColorDropper';

export default compose(withCanvasSize, memo)(ColorDropper);