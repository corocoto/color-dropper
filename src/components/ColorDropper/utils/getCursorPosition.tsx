const getCursorPosition = (event: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    let x = 0;
    let y = 0;

    /* Get the x and y positions of the image: */
    const canvasDomRect = canvas.getBoundingClientRect();

    /* Calculate the cursor's x and y coordinates, relative to the image: */
    if ("pageX" in event) {
        x = event.pageX - canvasDomRect.left;
    }

    if ("pageY" in event) {
        y = event.pageY - canvasDomRect.top;
    }

    /* Consider any page scrolling: */
    x -= window.pageXOffset;
    y -= window.pageYOffset;

    return { x, y };
}

export default getCursorPosition;