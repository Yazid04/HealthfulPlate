import React from "react";
import HeroImg from '../../assets/heroIMG.png';
//import './heroStyles.scss';

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="hero-section-center">
        <div className="sub hero-txt">
          <div className='main-header'>
            <h1>Discover the Nutritional Benefits of Your Favorite Foods.</h1>
          </div>
          <p>
          Discover the nutritional benefits of your favorite foods, search for
          nutrient information on thousands of recipes, and find healthy
          alternatives to your favorite comfort foods.
         </p>
          <button type='button'>Discover More</button>
        </div>
        <div className="sub hero-img">
          <h3>American Special Salad</h3>
          <img src={HeroImg} alt="Hero" />
          <button className="explore-btn">Explore More</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
