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

  useEffect(() => {
    localStorage.setItem('likedCount', JSON.stringify(likedCount))
  }, [likedCount])

  function handleLike(like, id) {
    var liked = likedSounds

    if (likedCount > 9 && like===true) {
      return
    }

    if (like) {
      liked[id] = data[id]
      updateLikedCount(likedCount+1)
      if (likedCount < 10) {
        updateLikedSounds({...liked})
      } else {
        return
      }
    } else {
      const remainingLikedSounds = {...likedSounds};  // instead of `deleted`
      delete remainingLikedSounds[id];
      updateLikedSounds(remainingLikedSounds);
      updateLikedCount(likedCount-1)
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
              // const color = ?"#ff6b81":"#a4b0be"
              return(<Button 
                        key={i} 
                        id={i} 
                        total={likedCount}
                        sound={data.audio} 
                        name={data.name} 
                        handleLike={handleLike} 
                        liked={likedSounds.hasOwnProperty(data.id+"")}
                      />)
            })
          }
        </div>
      </div>
    </>
    
  )
}

export default App
