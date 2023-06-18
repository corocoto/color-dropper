import React, { forwardRef, memo, useCallback, useEffect, useState } from 'react';

// Type definitions
import { CanvasProps } from '../../Canvas.types';
import { withCanvasProps } from './withImage.types';

// Instances
const imageInstance = new Image();


const withImage = (WrappedComponent: React.ForwardRefExoticComponent<React.PropsWithoutRef<CanvasProps> & React.RefAttributes<HTMLCanvasElement>>) => {
    const Component = forwardRef<HTMLCanvasElement, withCanvasProps>((props, canvasRef) => {
        const { imageSource, ...rest } = props;

        // State
        const [image, setImage] = useState<HTMLImageElement | null>(null);

        //Handlers
        const handleImageLoad = useCallback((event: Event) => {
            setImage(event.target as HTMLImageElement);
        }, []);


        // Effects
        useEffect(() => {
            imageInstance.src = imageSource;
            imageInstance.addEventListener('load', handleImageLoad);

            return () => {
                imageInstance.removeEventListener('load', handleImageLoad);
            }
        }, [handleImageLoad, imageSource])

        return <WrappedComponent ref={canvasRef} image={image} {...rest} />
    });

    Component.displayName = 'ImageCanvas';

    return memo(Component);
}

export default withImage;