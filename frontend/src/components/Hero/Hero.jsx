import React from 'react'
import './Hero.css';
import hand_icon from "../Assets/hand_icon.png";
import hero_img from "../Assets/hero_image.png";
import arrow_img from "../Assets/arrow.png";

const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2 className='heading'>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-logo">
                        <p>new</p>
                        <img src={hand_icon} alt="hand" />
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <button>
                    Latest Collection
                    <img src={arrow_img} alt="" />
                </button>
            </div>
            <div className="hero-right">
                <img src={hero_img} alt="" />
            </div>
        </div>
    )
}

export default Hero
