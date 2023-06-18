import {getCursorPosition} from "./index";
import {CanvasSizeInterface} from "../ColorDropper.types";

type GetGlassCoordinatesProps = {
    moveEvent: MouseEvent | TouchEvent;
    canvas: HTMLCanvasElement;
    canvasSize: CanvasSizeInterface;
    glassRadius: number;
    zoom: number;
}

const getGlassCoordinates = ({ moveEvent, canvas, canvasSize, glassRadius, zoom }: GetGlassCoordinatesProps) => {
    let { x, y } = getCursorPosition(moveEvent, canvas);

    // Prevent the magnifier glass from being positioned outside the image:
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

    return { x, y };
}

export default getGlassCoordinates;