import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const img = "/assets/heroIMG.png";
  const heroRef = useRef();

  useEffect(() => {
    heroRef.current.classList.add("Animate-hero-section");
  }, []);

  const scrollToSection = () => {
    const target = document.getElementById("targetSection");
    const posH = target.getBoundingClientRect().top;
    const hei = window.pageYOffset + posH - 50;
    window.scrollTo({
      top: hei,
      behavior: "smooth",
    });
  };

  return (
    <section className="hero-wrapper">
      <div className="hero-section-center" ref={heroRef}>
        <div className="sub hero-txt">
          <div className="main-header">
            <h1>Discover the Nutritional Benefits of Your Favorite Foods.</h1>
          </div>
          <p>
            Discover the nutritional benefits of your favorite foods, search for
            nutrient information on thousands of recipes, and find healthy
            alternatives to your favorite comfort foods.
          </p>
          <button type="button" onClick={scrollToSection}>
            Discover More
          </button>
        </div>
        <div className="sub hero-img">
          <h3>American Special Salad</h3>
          <img src={img} alt="Hero" />
          <Link to={`/Search`}>
            <button className="explore-btn">Explore More</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
