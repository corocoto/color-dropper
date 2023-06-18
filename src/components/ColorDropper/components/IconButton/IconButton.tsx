import React, { memo } from 'react';

// Styles
import styles from './IconButton.module.css';

// Libs
import classNames from 'classnames';

// Type definition
import { IconButtonProps } from './IconButton.types';

const IconButton = (props: IconButtonProps) => {
    const { icon, alt, isActive, ...rest } = props;

    return (
        <button
            className={classNames(styles.button, {
                [styles.button_isActive]: isActive
            })}
            {...rest}
        >
            <img src={icon} alt={alt}/>
        </button>
    );
}

IconButton.displayName = 'IconButton';

export default memo(IconButton);