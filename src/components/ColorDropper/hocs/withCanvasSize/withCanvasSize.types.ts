import {RefObject} from "react";

export type WithCanvasSizeProps = {
    zoom: number;
    zoomingImage: string;
    canvasRef: RefObject<HTMLCanvasElement>
}