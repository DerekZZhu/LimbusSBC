import { useState, useEffect } from 'react'
import data from "./data.json"
import Button from "./Button"
import './App.css'

function App() {
  const flavors = ["PEACH VORRIBURR", "Limbus Company", "AUUUghh!!"]

  const [likedSounds, updateLikedSounds] = useState({})
  const [likedCount, updateLikedCount] = useState(0)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('likedsounds'));
    if (items) {
      updateLikedSounds(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likedsounds', JSON.stringify(likedSounds));
  }, [likedSounds]);

  function handleLike(like, id) {
    var liked = likedSounds

    if (like && likedCount > 10) {
      console.log("NO MORE");
      return
    }

    if (like) {
      liked[id] = data[id]
      updateLikedCount(likedCount+1)
      if (likedCount < 10) {
        updateLikedSounds({...liked})
      }
    } else {
      var deleted = {}
      updateLikedCount(likedCount-1)
      Object.entries(liked).forEach((data) => {
        if (data[0] != id+"") {
          deleted[data[0]] = data[1]
        }
      })
      updateLikedSounds({...deleted})
    }
  }

  return (
    <>
      <h1>L Soundboard</h1>
      <h2>PEACH VORRIBURR, anytime, anywhere</h2>
      <div className="container">
        <div className="liked-section">
          {likedCount}
          {
            (Object.values(likedSounds)).map((data, i) => {
              return(<Button key={i} sound={data.audio} name={data.name}/>)
            })
          }
        </div>
        <div className="soundboard">
          {
            data.map((data, i) => {
              const color = likedSounds.hasOwnProperty(data.id+"")?"#ff6b81":"#a4b0be"
              return(<Button 
                        key={i} 
                        kkey={i} 
                        sound={data.audio} 
                        name={data.name} 
                        handleLike={handleLike} 
                        color={color}
                      />)
            })
          }
        </div>
      </div>
    </>
    
  )
}

export default App
