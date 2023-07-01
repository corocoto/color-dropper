import { forwardRef, memo, useMemo } from 'react';

// Styles
import styles from './MagnifierGlass.module.css';

// Type definition
import { MagnifierGlassProps } from './MagnifierGlass.types';

const MagnifierGlass = forwardRef<HTMLDivElement, MagnifierGlassProps>((props, divRef) => {
    const { imageSource, zoom, imageWidth, imageHeight, ...rest } = props;

    // Memoized values
    const inlineStyles = useMemo(() => {
        return {
            backgroundImage: `url('${imageSource}')`,
            backgroundSize:
            imageWidth * zoom + imageHeight * zoom,
        }
    }, [imageHeight, imageSource, imageWidth, zoom]);

    return (
        <div ref={divRef} style={inlineStyles} className={styles.magnifierGlass} {...rest} />
    )
})

MagnifierGlass.displayName = 'MagnifierGlass';

export default memo(MagnifierGlass);