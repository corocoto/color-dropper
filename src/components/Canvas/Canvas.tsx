import React, {memo, useEffect, useRef} from 'react';

// Type definition
import {CanvasProps} from "./Canvas.types";

// HOCs
import {withImage} from "./hocs";

const Canvas = (props: CanvasProps) => {
    const { image, ...rest} = props

    // Refs
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null)



    // Effects
    useEffect(() => {
        ctx.current = canvasRef.current?.getContext('2d');
    }, [])

    useEffect(() => {
        if (image && ctx.current) {
            ctx.current.drawImage(image, 0, 0);
        }
    }, [image]);

    return (
        <canvas ref={canvasRef} {...rest} />
    )
}

export default memo(Canvas);
export const ImageCanvas = withImage(Canvas);