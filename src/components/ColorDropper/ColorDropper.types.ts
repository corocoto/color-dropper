import { RefObject } from 'react';

export interface CanvasSizeInterface {
    width: number;
    height: number;
}

export type ColorDropperProps = {
    zoom: number;
    zoomingImage: string;
    canvasRef: RefObject<HTMLCanvasElement>;
    canvasSize: CanvasSizeInterface
}


export type UpdateGlassPosition = {
    glass: HTMLDivElement;
    updatedX: number;
    updatedY: number;
    glassRadius: number;
}
