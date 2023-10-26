import React from "react";
import { useCalculatorContext } from "./CalculatorContext";

const Result = () => {
  const { ALL_INPUTS_VALID_MSG, showResultCard, userData, inputsValidity } = useCalculatorContext();
  if (inputsValidity.msg === ALL_INPUTS_VALID_MSG && showResultCard) {
    return (
      <div
        className={`${showResultCard ? "results-wrapper" : "results-wrapper collapsed"}`}>
        <div className="user-result">
          <p className="sub">
            For your goal of "{userData["Weight Goal"].val}" we've calculated
            your daily calorie intake to help you achieve this. Your recommended
            daily calorie intake is [Calories/day].
          </p>
        </div>
      </div>
    );
  }
};

export default Result;