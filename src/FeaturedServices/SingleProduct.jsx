import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ title, paragraph, svgImage, linkAddress }) => {
  return (
    <>
      <main className="single-service">
        <div className="container pt-1">
          <h1>{title}</h1>
          <p>{paragraph}</p>
          <Link to={`/${linkAddress}`}>
            <button>Explore</button>
          </Link>
        </div>
        <div className="container pt-2">
          <img src={svgImage} alt={title} />
        </div>
      </main>
    </>
  );
};

export default SingleProduct;
