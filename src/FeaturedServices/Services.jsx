import React from "react";
import SingleProduct from "./SingleProduct";
import { data } from "./data";

const Services = () => {
  return (
    <section className="services-wrapper" id="targetSection">
      <div className="header">
        <div>
          <h1>
            Unlock the Power of Nutrition with our Comprehensive Services!
          </h1>
        </div>
      </div>
      {data.map((item) => {
        return <SingleProduct key={item.id} {...item} />;
      })}
    </section>
  );
};

export default Services;
