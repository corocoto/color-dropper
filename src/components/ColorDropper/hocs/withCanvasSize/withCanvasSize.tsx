import React, { useCallback, useEffect, useState, memo } from 'react';

// Type definitions
import { WithCanvasSizeProps } from './withCanvasSize.types';
import { ColorDropperProps } from '../../ColorDropper.types';

const withCanvasSize = (WrappedComponent: React.ForwardRefExoticComponent<React.PropsWithoutRef<ColorDropperProps>>) => {
    const Component = (props: WithCanvasSizeProps) => {
        const { canvasRef } = props;

        // State
        const [canvasSize, setCanvasSize] = useState({
            width: 0,
            height: 0
        });

        // Handlers
        const handleUpdateCanvasParamSize = useCallback(() => {
            setCanvasSize({
                width: canvasRef.current?.offsetWidth ?? 0,
                height: canvasRef.current?.offsetHeight ?? 0
            })
        }, [canvasRef])

        // Effects
        useEffect(() => {
            handleUpdateCanvasParamSize();
            window.addEventListener('resize', handleUpdateCanvasParamSize);

            return () => {
                window.removeEventListener('resize', handleUpdateCanvasParamSize);
            }
        }, [handleUpdateCanvasParamSize]);

        return <WrappedComponent {...props} canvasSize={canvasSize} />
    }

    return memo(Component);
}

export default withCanvasSize;