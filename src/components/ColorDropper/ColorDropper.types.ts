import {RefObject} from 'react';

export type ColorDropperProps = {
    zoom: number;
    zoomingImage: string;
    canvasRef: RefObject<HTMLCanvasElement>
}