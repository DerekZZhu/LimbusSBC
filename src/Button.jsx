import React, { useState } from 'react';

const Button = (props) => {
  function play() {
    const audio = new Audio(props.sound);
    audio.play();
  }

  return (
    <div className="button" onClick={play}>
      {props.name}
    </div>
  );
};

export default Button;
