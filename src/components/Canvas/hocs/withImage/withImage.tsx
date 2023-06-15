import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import { JSX } from 'react/jsx-runtime';
import {CanvasProps} from "../../Canvas.types";
import {withCanvasProps} from "./withImage.types";

// Instances
const imageInstance = new Image();


const withImage = (WrappedComponent: (props: CanvasProps) => JSX.Element) => {
    const Component = (props: withCanvasProps) => {
        const {imageSrc, ...rest} = props;

        // State
        const [image, setImage] = useState<HTMLImageElement | null>(null);


        //Handlers
        const handleImageLoad = useCallback((event: Event) => {
            setImage(event.target as HTMLImageElement);
        }, []);


        // Effects
        useEffect(() => {
            imageInstance.src = imageSrc;
            imageInstance.addEventListener('load', handleImageLoad);

            return () => {
                imageInstance.removeEventListener('load', handleImageLoad);
            }
        }, [handleImageLoad, imageSrc])

        return <WrappedComponent image={image} {...rest} />
    }

    return memo(Component);
}

export default withImage;