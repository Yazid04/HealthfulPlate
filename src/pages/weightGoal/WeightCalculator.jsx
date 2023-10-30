import React from "react";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { useCalculatorContext } from "./CalculatorContext";
import Result from "./Result";
import ErrorMsg from "./ErrorMsg";

const WeightCalculator = () => {
  const {
    userData,
    systemInfo,
    activityLevel,
    divStyle,
    btnSwitch,
    toggleActivityLevel,
    handleChange,
    getResult,
    inputsValidity,
  } = useCalculatorContext();

  const invalidInputName = inputsValidity.invalidInputName;

  const elements = Object.keys(userData).map((key) => {
    const item = userData[key];
    if (
      item.title === "Gender" ||
      item.title === "Weight Goal" ||
      item.title === "Timeframe"
    ) {
      return (
        <div
          key={item.id}
          className={`single-parameter-parent custom custom-radio-input ${
            invalidInputName === item.title && "error"
          }`}
        >
          <div className="header">{item.title}: </div>
          <div className="input-parent">
            <form className="center">
              {item.options.map((elm) => {
                const id = elm[1];
                return (
                  <div key={id}>
                    <input
                      type="radio"
                      name={item.title}
                      value={elm[0]}
                      checked={item.val === elm[0]}
                      onChange={(e) => handleChange(e)}
                      id={id}
                    />
                    <label style={{ whiteSpace: "nowrap" }} htmlFor={id}>
                      {elm[0]}
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
          key={item.id}
          className={`single-parameter-parent custom custom-activity-level ${
            invalidInputName === item.title && "error"
          }`}
        >
          <div className="header">
            <div>
              <h2>Activity level:</h2>
              <span>{item.options[activityLevel.idx].description}</span>
            </div>
          </div>
          <div className="input-parent">
            {item.options.map((btn, i) => {
              return (
                <button
                  key={btn.id}
                  onClick={() => toggleActivityLevel(`${btn.name}`, i)}
                  type="button"
                  className={`${
                    activityLevel.name === btn.name ? "active" : ""
                  }`}
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
        <div key={item.id} className="single-parameter-parent">
          <div className="header">{item.title}: </div>
          <div
            className={`input-parent ${
              invalidInputName === item.title && "error"
            }`}
          >
            <input
              type="text"
              name={item.title}
              value={item.val}
              onChange={(e) => handleChange(e)}
            />
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
            <div className="panel-center">{elements}</div>
          </section>
          <ErrorMsg />
        </div>
      </main>
      <div className="btn-wrapper">
        <button onClick={() => getResult()} className="result-btn">
          Result
        </button>
      </div>
      <Result />
      <Footer />
    </>
  );
};
export default WeightCalculator;


// Close the result box when there is invalid Input - DONE
// Put a warning message in the result box - DONE 
// Apply a copy to clipboard functionality - DONE
// reduce the number css lines (apply more dynamic scss) - DONE
// make the messages for gain and lose weight more user-friendly - DONE  
// study the calculation process
// Apply