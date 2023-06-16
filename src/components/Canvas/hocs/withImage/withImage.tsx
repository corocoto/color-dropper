import React, {forwardRef, memo, useCallback, useEffect, useState} from 'react';
import {CanvasProps} from "../../Canvas.types";
import {withCanvasProps} from "./withImage.types";

// Instances
const imageInstance = new Image();


const withImage = (WrappedComponent: React.ForwardRefExoticComponent<React.PropsWithoutRef<CanvasProps> & React.RefAttributes<HTMLCanvasElement>>) => {
    const Component = forwardRef<HTMLCanvasElement, withCanvasProps>((props, canvasRef) => {
        const {imageSrc, ...rest} = props;

        // State
        const [image, setImage] = useState<HTMLImageElement | null>(null);

        //Handlers
        const handleImageLoad = useCallback((event: Event) => {
            setImage(event.target as HTMLImageElement);
        }, []);


        useEffect(() => {
            imageInstance.src = imageSrc;
            imageInstance.addEventListener('load', handleImageLoad);

            return () => {
                imageInstance.removeEventListener('load', handleImageLoad);
            }
        }, [handleImageLoad, imageSrc])

        return <WrappedComponent ref={canvasRef} image={image} {...rest} />
    });

    return memo(Component);
}

export default withImage;