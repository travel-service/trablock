import React, { useState} from 'react';
import './Slider.css'
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(1);

    const NextSlide = () => {
        if (currentSlide >= dataSlider.length) { //넘어갈 슬라이드가 없으면
            setCurrentSlide(1); //초기화
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };
    
    const PrevSlide = () => {
        if (currentSlide === 1) {
            setCurrentSlide(dataSlider.length);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const moveDot = (index) => {
        setCurrentSlide(index)
    };

    return (
        <div className="containter-slider">
            {dataSlider.map((obj, index) => {
                return (
                    <div 
                    key={obj.id} 
                    className={currentSlide === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img src={process.env.PUBLIC_URL +`/Imgs/test${index+1}.png`} alt={dataSlider.title}/>
                    </div>
                )
            })}
            <BtnSlider moveSlide={NextSlide} direction={"next"} />
            <BtnSlider moveSlide={PrevSlide} direction={"prev"} />

            <div className='container-dots'>
                {Array.from({length: 2}).map((item, index) => (
                    <div 
                    onClick = {() => moveDot(index + 1)}
                    className={currentSlide === index +1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    );
};


export default Slider;