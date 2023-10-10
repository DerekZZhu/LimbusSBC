import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const Button = (props) => {
  var isLiked = props.liked
  const [liked, updateLiked] = useState(isLiked)

  function play() {
    const audio = new Audio(props.sound);
    audio.play();
  }

  function handleClick() {
    if (props.total > 9) {
      return 
    }
    console.log(liked)
    props.handleLike(!liked, props.id)
    updateLiked(!liked)
  }

  return (
    <div className="button">
      <div className="button-mask"onClick={play}>
        {props.name}
      </div>
      <FaHeart style={{color:liked?"#ff6b81":"#a4b0be"}} onClick={handleClick} className="heart"/>
    </div>

  );
};

export default Button;
