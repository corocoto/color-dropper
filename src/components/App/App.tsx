import React, {useCallback, useEffect, useRef, useState} from 'react';

// Styles
import styles from './App.module.css';

// Components
import { ColorDropper, ImageCanvas } from '../index';

// Images
import image from '../../assets/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg';

// Constants
import { PICK_COLOR_EVENT_NAME } from "../ColorDropper/constants";

const App = () => {
    // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    // Handlers
    const handlePickColor = useCallback((event: CustomEvent<{selectedColor: string}>) => {
        setSelectedColor(event.detail.selectedColor)
    }, []);

    // Effects
    useEffect(() => {
        // @ts-ignore
        window.addEventListener(PICK_COLOR_EVENT_NAME, handlePickColor);
        return () => {
            // @ts-ignore
            window.removeEventListener(PICK_COLOR_EVENT_NAME, handlePickColor);
        }
    },[handlePickColor])

  return (
    <main className={styles.wrapper}>
        <header className={styles.header}>
            <ColorDropper zoom={3} zoomingImage={image} canvasRef={canvasRef}/>
            <span>{selectedColor}</span>
        </header>
        <ImageCanvas ref={canvasRef} imageSource={image} className={styles.canvas}/>
    </main>
  );
}

App.displayName = 'App';

export default App;
