import React, {memo, useCallback, useState} from 'react';

// Styles
import styles from './IconButton.module.css';

// Libs
import classNames from "classnames";

const IconButton = (props: { [x: string]: any; icon: any; alt: any; }) => {
    const {icon, alt, className, ...rest} = props;

    // State
    const [isActive, setIsActive] = useState(false);

    const handleButtonClick = useCallback(() => {
        setIsActive(prevState => !prevState)
    }, [])

    return (
        <button
            className={classNames(className, styles.button, {
                [styles.button_isActive]: isActive
            })}
            onClick={handleButtonClick}
            {...rest}
        >
            <img src={icon} alt={alt}/>
        </button>
    );
}

IconButton.displayName = 'IconButton';

export default memo(IconButton);