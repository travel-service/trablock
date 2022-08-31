import React from 'react';
import './Slider.css';

const BtnSlider = ({ direction, moveSlide }) => {
  return (
    <button
      onClick={moveSlide}
      className={direction === 'next' ? 'btn-slide next' : 'btn-slide prev'}
    >
      {direction === 'next' ? '>' : '<'}
    </button>
  );
};

export default BtnSlider;
