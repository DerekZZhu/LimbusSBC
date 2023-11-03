import { useState, useEffect, useLayoutEffect } from 'react'
import { FaGithub, FaInstagram, FaYoutube} from 'react-icons/fa';
import data from "./data.json"
import Button from "./Button"
import './App.css'


function App() {
  const flavors = ["PEACH VORRIBURR", "Limbus Company", "AUUUghh!!"]

  const [likedSounds, updateLikedSounds] = useState({})
  const [likedCount, updateLikedCount] = useState(0)

  useLayoutEffect(() => {
    const items = JSON.parse(localStorage.getItem('likedsounds'));
    const count = JSON.parse(localStorage.getItem('likedCount'));
    if (items && count) {
      updateLikedSounds(items)
      // console.log(likedSounds);
      updateLikedCount(count)
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
    console.log(like)

    if (likedCount > 9 && like === true) {
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

  function clear() {
    updateLikedCount(0)
    updateLikedSounds({})
  }

  return (
    <>
      <h1>L Soundboard</h1>
      <h2>PEACH VORRIBURR, anytime, anywhere</h2>
      <div className="container">
        <div className="liked-section-wrapper">
          <div className="c-container">
            <h3 className="count">{likedCount}/10 Liked Sounds</h3>
            <h3 className="clear" onClick={clear}>Clear</h3>
          </div>
          <div className="liked-section">
          {
            (Object.values(likedSounds)).map((data, i) => {
              return(<Button key={i} sound={data.audio} name={data.name}/>)
            })
          }
          </div>
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
      <div className='footer'>
          <p>All rights for audio go to Project Moon and Limbus Company. Go <a href="https://limbuscompany.com/">check them out!</a></p>
          <p>Hi im Derek. I love PM. Follow me on insta, star a repo on my github, or stress test my site :)</p>
          <div className="links">
            <FaGithub onClick={()=> window.open("https://github.com/DerekZZhu", "_blank")}/>
            <FaInstagram onClick={()=> window.open("https://www.instagram.com/derek_zzzhu/", "_blank")}/>
            <FaYoutube onClick={()=> window.open("https://www.youtube.com/@Rek505", "_blank")}/>
          </div>
      </div>
    </>
  )
}

export default App
