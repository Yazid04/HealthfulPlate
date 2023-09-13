import React, { useEffect, useRef, useState } from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

const WeightCalculator = () => {
  const [systemInfo, setSystemInfo] = useState("metric system");
  const [divStyle, setDivStyle] = useState({
    position: "absolute",
    transform: "translateX(0%)",
    width: '50%',
    color: "white",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#084941',
  });

  const btnSwitch = () => {
    setSystemInfo((prevState) =>
      prevState === "metric system" ? "Imperial system" : "metric system"
    );
  };

  useEffect(() => {
    //if(systemInfo === 'Imperial system' && divStyle.transform === 'translateX(0%)') return;
    //if(systemInfo === 'metric system' && divStyle.transform === 'translateX(100%)') return;
    if (systemInfo === "Imperial system") {
      setDivStyle({
        ...divStyle,
        transform: "translateX(100%)",
      });
    } else {
      setDivStyle({
        ...divStyle,
        transform: "translateX(0%)",
      });
    }
  }, [systemInfo]);

  return (
    <>
      <Nav />
      <main className="wrapper">
        <div className="wrapper-center">
          <div className="sec-1 section">
            <h2 className="title">Body parameters</h2>
            <section className="switch-btns-parent" onClick={btnSwitch}>
              <button className="btn 0 button" style={divStyle}>
                <p>{systemInfo}</p>
              </button>
              <button className="btn default button">
                <p>metric system</p>
              </button>
              <button className="btn button">
                <p>Imperial system</p>
              </button>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WeightCalculator;
