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
  const [activityLevel, setActivityLevel] = useState("Sedentary");
  const [index, setIndex] = useState(0);

  const [inputValues, setInputValues] = useState({
    "Current Weight": "",
    "Goal Weight": "",
    Age: "",
    Height: "",
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
      name: "Gender",
    },
    {
      title: "Age",
    },
    {
      title: "Activity level",
      options: [
        {
          name: "Sedentary",
          description:
            "Sedentary: Individuals who have a predominantly inactive lifestyle, often involving minimal physical activity. Examples include office workers with little exercise or those with limited mobility.",
        },
        {
          name: "lightly Active",
          description:
            "Lightly Active: People who engage in some light physical activity or exercise, such as walking or light housework, but spend most of their day in a seated or low-activity role.",
        },
        {
          name: "Moderately Active",
          description:
            "Moderately Active: Individuals who have a moderate level of physical activity throughout the day. This may include regular exercise, such as jogging or cycling, or a job that involves moderate physical effort.",
        },
        {
          name: "Very Active",
          description:
            "Very Active: Those with a highly active lifestyle, often characterized by demanding physical jobs or regular vigorous exercise, such as competitive athletes or construction workers.",
        },
      ],
    },
    {
      title: "Height",
    },
    {
      title: "Timeframe",
      options: ["gradual", "moderate", "aggresive"],
      name: "Timeframe",
    },
    {
      title: "Weight Goal",
      options: ["Gain weight", "loss weight", "maintain current weight"],
      name: "weight goal",
    },
  ];

  const data = {
    currentWeight: "",
    goalWeight: "",
    gender: "",
    age: "",
    height: "",
    timeFrame: "",
    weightGoal: "",
  };

  const btnSwitch = () => {
    setSystemInfo((prevState) =>
      prevState === "metric system" ? "Imperial system" : "metric system"
    );
    setInputValues((prev) => {
      const updatedInputValues = {};
      for (const key in prev) {
        updatedInputValues[key] = "";
      }
      return updatedInputValues;
    });
  };

  const toggleActivityLevel = (text, idx) => {
    setActivityLevel(text);
    setIndex(idx);
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const elements = titles.map((item, i) => {
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
              {item.options.map((elm, i) => {
                const uni = i * 50;
                return (
                  <div key={i}>
                    <input
                      type="radio"
                      id={uni}
                      name={item.name}
                      value={item.options[i]}
                      onChange={(e) => handleChange(e)}
                    />
                    <label style={{ whiteSpace: "nowrap" }} htmlFor={uni}>
                      {item.options[i]}
                    </label>
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
              <h2>Activity level:</h2>
              <span> {item.options[index].description}</span>
            </div>
          </div>
          <div className="input-parent">
            {item.options.map((btn, i) => {
              return (
                <button
                  key={i}
                  onClick={() => toggleActivityLevel(`${btn.name}`, i)}
                  type="button"
                  className={`${activityLevel === btn.name ? "active" : ""}`}
                >
                  {btn.name}
                </button>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div key={i} className="single-parameter-parent">
          <div className="header">{item.title}: </div>
          <div className="input-parent">
            <input
              name={item.title}
              value={inputValues[item.title]}
              onChange={handleInputChange}
              type="text"
            />
          </div>
        </div>
      );
    }
  });

  useEffect(() => {
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
          <section className="calculation-panel-parent">
            <div className="panel-center">{elements}</div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WeightCalculator;

// complete gathering the data
// study the calculations
// then apply
