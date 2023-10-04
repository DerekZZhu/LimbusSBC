import { useState, useEffect } from 'react'
import data from "./data.json"
import Button from "./Button"
import './App.css'

function App() {

  const audioUrl = "https://github.com/DerekZZhu/Assets/raw/main/PM_SOP_ASSETS/audio1.mp3"; // Replace with your GitHub raw URL

  return (
    <>
      <h1>L Soundboard</h1>
      <h2>PEACH VORRIBURR, anytime, anywhere</h2>
      <div className="container">
        {
          data.map((data, i) => {
            return(<Button key={i} sound={data.audio} name={data.name}/>)
          })
        }
      </div>
    </>
  )
}

export default App
