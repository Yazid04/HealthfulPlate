import React, {useRef} from "react";
import { useCalculatorContext } from "./CalculatorContext";
import { BsFillClipboard2Fill } from "react-icons/bs";

const Result = () => {
  const { ALL_INPUTS_VALID_MSG, showResultCard, userData, inputsValidity } =
    useCalculatorContext();

    const iconRef = useRef(null);

    function showCopiedMsg(){
      // Add the "show" class
    iconRef.current.classList.add("show");
    navigator.clipboard.writeText("Yazid, i love you!")

    // Remove the "show" class after 2 seconds
    setTimeout(() => {
      iconRef.current.classList.remove("show");
    }, 2000);
    }

    if (inputsValidity.msg === ALL_INPUTS_VALID_MSG && showResultCard) {
    return (
      <div
        className={`${
          showResultCard ? "results-wrapper" : "results-wrapper collapsed"
        }`}
      >
        <div className="user-result">
          <div className="clipbaord-icon" ref={iconRef}>
            <p className="copied-msg">copied to clipbord!</p>
            <BsFillClipboard2Fill onClick={showCopiedMsg} className="icon" />
          </div>
          <div className="result-msg">
            <p className="sub">
              For your goal of "{userData["Weight Goal"].val}" we've calculated
              your daily calorie intake to help you achieve this. Your
              recommended daily calorie intake is [Calories/day].
            </p>
          </div>
          <div className="disclaimer-msg">
            <p className="sub">
              *Disclaimer: Information here is for general knowledge only.
              Consult a healthcare professional before changing your diet or
              exercise routine. We're not responsible for any consequences. Your
              health is in your hands, so choose wisely for your weight goals.
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Result;