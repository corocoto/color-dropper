import React, { memo, useMemo } from "react";

// Styles
import styles from './MagnifierGlass.module.css';

// Type definition
import {MagnifierGlassProps} from "./MagnifierGlass.types";

const MagnifierGlass = (props: MagnifierGlassProps) => {
    const {imageSource, zoom, imageWidth, imageHeight} = props;

    // Memoized values
    const inlineStyles = useMemo(() => {
        return {
            backgroundImage: `url('${imageSource}')`,
            backgroundSize:
            imageWidth * zoom + imageHeight * zoom
        }
    }, [imageHeight, imageSource, imageWidth, zoom]);

    return (
        <div style={inlineStyles} className={styles.magnifierGlass}>
            <div className={styles.grid}></div>
        </div>
    )
}

MagnifierGlass.displayName = 'MagnifierGlass';

export default memo(MagnifierGlass);