import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

const WeightCalculator = () => {
  const [systemInfo, setSystemInfo] = useState("Metric system");
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
  const [userData, setUserData] = useState({
    Gender: { optionsss: ["Male", "Female", "Other"], val: "" },
    Age: "",
    Height: "",
    Timeframe: { optionsss: ["gradual", "moderate", "aggresive"], val: "" },
    "Weight Goal": {
      optionsss: ["Gain weight", "loss weight", "maintain current weight"],
      val: "",
    },
    "Current Weight": "",
    "Goal Weight": "",
    "Activity level": "",
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
      name: "Weight Goal",
    },
  ];

  const btnSwitch = () => {
    setSystemInfo((prevState) =>
      prevState === "Metric system" ? "Imperial system" : "Metric system"
    );
    setUserData((prev) => {
      const updatedInputValues = {};
      for (const key in prev) {
        if (typeof prev[key] === "object" && prev[key].hasOwnProperty("val")) {
          updatedInputValues[key] = { ...prev[key], val: "" };
        } else {
          updatedInputValues[key] = "";
        }
      }
      return updatedInputValues;
    });

    setActivityLevel("Sedentary");
  };

  const toggleActivityLevel = (text, idx) => {
    setActivityLevel(text);
    setIndex(idx);
    setUserData((prev) => ({
      ...prev,
      "Activity level": text,
    }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Check if the target element is a radio input
    if (e.target.type === "radio") {
      const newValue = e.target.checked ? value : ""; // Toggle the radio input value
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: { optionsss: prevUserData[name].optionsss, val: newValue },
      }));
    } else {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
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
                const uniqueId = i * 99 * 50;
                return (
                  <div key={i}>
                    <input
                      type="radio"
                      name={item.name}
                      value={item.options[i]}
                      checked={userData[item.title].val === item.options[i]}
                      onChange={(e) => handleChange(e)}
                      id={uniqueId}
                    />

                    <label style={{ whiteSpace: "nowrap" }} htmlFor={uniqueId}>
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
              <span>
                {" "}
                {activityLevel === "Sedentary"
                  ? item.options[0].description
                  : item.options[index].description}
              </span>
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
              type="text"
              name={item.title}
              value={userData[item.title] || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      );
    }
  });

  useEffect(() => {
    setDivStyle((prevDivStyle) => ({
      ...prevDivStyle,
      transform:
        systemInfo === "Imperial system"
          ? "translateX(100%)"
          : "translateX(0%)",
    }));
  }, [systemInfo]);

  //console.log(userData);

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

// add a button for getting the results and it's functionality
// optimize the code && study the calculations
// apply
