import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

const Button = (props) => {
  var isLiked = props.liked
  console.log(isLiked);
  const [liked, updateLiked] = useState(isLiked)

  useEffect(() => {
    const checkLiked = localStorage.getItem('likedsounds');
    if (!checkLiked) {
      return
    }
    
    if (JSON.parse(checkLiked).hasOwnProperty(props.id+"")) {
      updateLiked(true)
    }
  }, [])
  const color = liked?"#ff6b81":"#a4b0be"



  function play() {
    const audio = new Audio(props.sound);
    audio.play();
  }

  function handleClick() {
    if (props.total > 9) {
      return 
    }
    // console.log(liked)
    props.handleLike(!liked, props.id)
    updateLiked(!liked)
  }

  return (
    <div className="button">
      <div className="button-mask"onClick={play}>
        {props.name}
      </div>
      <FaHeart style={{color:color}} onClick={handleClick} className="heart"/>
    </div>

  );
};

export default Button;
