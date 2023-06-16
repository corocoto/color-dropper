import React, {useEffect, useRef, useState} from 'react';

// Styles
import style from './App.module.css';

// Components
import {IconButton, ImageCanvas, MagnifierGlass} from "../index";

// Images
import image from '../../assets/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg';
import IconColorPicker from '../../assets/IconColorPicker.svg';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State
  const [canvasSize, setCanvasSize] = useState({
      width: 0,
      height: 0
  })

  useEffect(() => {
      if (canvasRef.current === null) {
          return;
      }

      setCanvasSize({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight
      })
  }, [])

  return (
    <main className={style.wrapper} style={{position: 'relative'}}>
        <header style={{position: 'relative'}}>
            <IconButton icon={IconColorPicker} alt="color picker icon"/>
            <MagnifierGlass zoom={3}  imageSource={image} imageWidth={canvasSize.width} imageHeight={canvasSize.height}/>
        </header>
        <ImageCanvas ref={canvasRef} imageSrc={image} width={1920} height={1080} className={style.canvas}/>
    </main>
  );
}

export default App;
