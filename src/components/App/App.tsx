import React, { useRef } from 'react';

// Styles
import styles from './App.module.css';

// Components
import { ColorDropper, ImageCanvas } from '../index';

// Images
import image from '../../assets/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg';

const App = () => {
    // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <main className={styles.wrapper}>
        <header className={styles.header}>
            <ColorDropper zoom={3} zoomingImage={image} canvasRef={canvasRef}/>
        </header>
        <ImageCanvas ref={canvasRef} imageSource={image} className={styles.canvas}/>
    </main>
  );
}

App.displayName = 'App';

export default App;
