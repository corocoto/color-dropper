import React, {useState, memo} from 'react';

// Styles
import styles from './IconButton.module.css';

// Libs
import classNames from "classnames";

const IconButton = (props: { [x: string]: any; icon: any; alt: any; }) => {
    const {icon, alt, ...rest} = props;
    return (
        <button className={classNames()} {...rest}>
            <img src={icon} alt={alt}/>
        </button>
    );
}

IconButton.displayName = 'IconButton';

export default memo(IconButton);