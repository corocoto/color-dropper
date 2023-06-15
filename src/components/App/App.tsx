import React from 'react';
import './App.css';

// Components
import {ImageCanvas} from "../index";

// Images
import image from '../../assets/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg';

function App() {
  return (
    <div className="App">
        <ImageCanvas imageSrc={image} width={1920} height={1080}/>
    </div>
  );
}

export default App;
