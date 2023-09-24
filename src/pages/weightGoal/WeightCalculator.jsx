import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

const WeightCalculator = () => {
  const [systemInfo, setSystemInfo] = useState("metric system");
  const [divStyle, setDivStyle] = useState({
    position: "absolute",
    transform: "translateX(0%)",
    width: "50%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#084941",
  });

  const titles = [
    {
      title: "Current Weight",
    },
    {
      title: "Goal Weight",
    },
    {
      title: "Gender",
      options: ["Male", "Female", "Other"],
      name: "gender",
    },
    {
      title: "Age",
    },
    {
      title: "Height",
    },
    {
      title: "Activity level",
    },
    {
      title: "Weight Goal",
      options: ["Gain weight", "loss weight", "main current weight"],
      name: "weight goal",
    },
    {
      title: "Timeframe",
      options: ["gradual", "moderate", "aggresive"],
      name: "Timeframe",
    },
  ];

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

  const boxes = titles.map((item, i) => {
    if (
      item.title === "Gender" ||
      item.title === "Weight Goal" ||
      item.title === "Timeframe"
    ) {
      return (
        <div
          key={i}
          className="single-parameter-parent custom custom-radio-input"
        >
          <div className="header">{item.title}: </div>
          <div className="input-parent">
            <form className="center">
              {item.options.map((element, i) => {
                return (
                  <div key={i}>
                    <input
                      type="radio"
                      id={item.title}
                      name={item.name}
                      value={item.title}
                    />
                    <label htmlFor={item.name}>{item.options[i]}</label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
      );
    } else if (item.title === "Activity level") {
      return (
        <div
          key={i}
          className="single-parameter-parent custom custom-activity-level"
        >
          <div className="header">
            <div>
              Activity level:
              <span>
                {" "}
                Sedentary: Individuals who have a predominantly inactive
                lifestyle, often involving minimal physical activity. Examples
                include office workers with little exercise or those with
                limited mobility.
              </span>
            </div>
          </div>
          <div className="input-parent">
            <button type="button">Sedentary</button>
            <button type="button">Lightly Active</button>
            <button type="button">Moderately Active</button>
            <button type="button">Very Active</button>
          </div>
        </div>
      );
    } else {
      return (
        <div key={i} className="single-parameter-parent">
          <div className="header">{item.title}: </div>
          <div className="input-parent">
            <input type="text" />
          </div>
        </div>
      );
    }
  });

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
          <section className="calculation-panel-parent">
            <div className="panel-center">{boxes}</div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WeightCalculator;

// make the styles more effeicent
// make the jsx more effecient
//
