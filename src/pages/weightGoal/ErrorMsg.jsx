import React from "react";
import { useCalculatorContext } from "./CalculatorContext";

const ErrorMsg = () => {
  const { inputsValidity, ALL_INPUTS_VALID_MSG } = useCalculatorContext();
  if (inputsValidity.msg !== null && inputsValidity.msg !== ALL_INPUTS_VALID_MSG) {
    return (
      <div className="error-msg">
        <p>*{inputsValidity.msg}</p>
      </div>
    );
  }
};

export default ErrorMsg;
