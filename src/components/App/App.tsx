import React from 'react';

// Styles
import style from './App.module.css';

// Components
import {ImageCanvas} from "../index";

// Images
import image from '../../assets/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg';
import IconColorPicker from '../../assets/IconColorPicker.svg';

function App() {
  return (
    <main className={style.wrapper}>
        <header>
            <button>
                <img src={IconColorPicker} alt=""/>
            </button>
        </header>
        <ImageCanvas imageSrc={image} width={1920} height={1080} className={style.canvas}/>
    </main>
  );
}

export default App;
