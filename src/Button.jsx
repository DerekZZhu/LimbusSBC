import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const Button = (props) => {
  const [liked, updateLiked] = useState(false)

  function play() {
    const audio = new Audio(props.sound);
    audio.play();
  }

  function handleClick() {
    updateLiked(!liked)
  }

  return (
    <div className="button" onClick={play}>
      <FaHeart style={{color:liked?"#ff6b81":"#a4b0be"}} onClick={handleClick} className="heart"/>
      {props.name}
    </div>
  );
};

export default Button;
