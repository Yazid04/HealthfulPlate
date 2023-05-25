import React from "react";
import NavBar from "../../components/Nav/Nav";
import Hero from "../../components/Hero/Hero";
import Services from "../../FeaturedServices/Services";
import Footer from "../../components/Footer/Footer";

export const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Services />
      <Footer />
    </>
  );
};
