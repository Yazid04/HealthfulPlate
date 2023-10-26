import React, { createContext, useContext, useState, useEffect } from "react";
const CalculatorContext = createContext();

const CalculatorProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    "Current Weight": {
      id: "1",
      val: "",
      expectedValueType: "number",
      status: "filled",
      title: "Current Weight",
    },
    "Goal Weight": {
      id: "2",
      val: "",
      expectedValueType: "number",
      status: "filled",
      title: "Goal Weight",
    },
    Gender: {
      id: "3",
      options: [
        ["Male", "30"],
        ["Female", "31"],
        ["Other", "32"],
      ],
      val: "",
      expectedValueType: "char",
      status: "filled",
      title: "Gender",
    },
    Age: {
      id: "4",
      val: "",
      expectedValueType: "number",
      status: "filled",
      title: "Age",
    },
    "Activity level": {
      id: "5",
      val: "Sedentary",
      expectedValueType: "char",
      status: "filled",
      title: "Activity level",
      options: [
        {
          id: "50",
          name: "Sedentary",
          description:
            "Sedentary: Individuals who have a predominantly inactive lifestyle, often involving minimal physical activity. Examples include office workers with little exercise or those with limited mobility.",
        },
        {
          id: "51",
          name: "lightly Active",
          description:
            "Lightly Active: People who engage in some light physical activity or exercise, such as walking or light housework, but spend most of their day in a seated or low-activity role.",
        },
        {
          id: "52",
          name: "Moderately Active",
          description:
            "Moderately Active: Individuals who have a moderate level of physical activity throughout the day. This may include regular exercise, such as jogging or cycling, or a job that involves moderate physical effort.",
        },
        {
          id: "53",
          name: "Very Active",
          description:
            "Very Active: Those with a highly active lifestyle, often characterized by demanding physical jobs or regular vigorous exercise, such as competitive athletes or construction workers.",
        },
      ],
    },
    Height: {
      id: "6",
      val: "",
      expectedValueType: "number",
      status: "",
      title: "Height",
    },
    Timeframe: {
      id: "7",
      options: [
        ["gradual", "70"],
        ["moderate", "71"],
        ["aggresive", "72"],
      ],
      val: "",
      expectedValueType: "char",
      status: "filled",
      title: "Timeframe",
    },
    "Weight Goal": {
      id: "8",
      options: [
        ["Gain weight", "80"],
        ["loss weight", "81"],
        ["maintain current weight", "82"],
      ],
      val: "",
      expectedValueType: "char",
      status: "filled",
      title: "Weight Goal",
    },
  });
  const [systemInfo, setSystemInfo] = useState("Metric system");
  const [activityLevel, setActivityLevel] = useState({
    name: "Sedentary",
    idx: 0,
  });
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
  const [showResultCard, setShowResultCard] = useState(false);
  const ALL_INPUTS_VALID_MSG = 'All inputs are filled and valid!'
  const [inputsValidity, setInputsValidity] = useState({
    hasInvalidInputs: null,
    msg: null,
    invalidInputName: null,
  });

  
  const btnSwitch = () => {
    setSystemInfo((prevState) =>
      prevState === "Metric system" ? "Imperial system" : "Metric system"
    );
    setUserData((prev) => {
      const updatedInputValues = {};
      for (const key in prev) {
        updatedInputValues[key] = { ...prev[key], val: "" };
      }
      return updatedInputValues;
    });
    setActivityLevel((prev) => {
      return { ...prev, name: "Sedentary", idx: 0 };
    });
    setShowResultCard(false);
  };

  const handleInputChange = (name, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: { ...prevUserData[name], val: value },
    }));
  };

  const toggleActivityLevel = (text, idx) => {
    setActivityLevel((prev) => {
      return { ...prev, name: text, idx: idx };
    });
    setUserData((prevUserData) => ({
      ...prevUserData,
      "Activity level": { ...prevUserData["Activity level"], val: text },
    }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    if (type === "radio") {
      const newValue = e.target.checked ? value : "";
      handleInputChange(name, newValue);
    } else if (type === "text") {
      handleInputChange(name, value);
    }
  };

  function updateInputValidity(status, msg, name) {
    setInputsValidity((prev) => ({
      ...prev,
      hasInvalidInputs: status,
      msg: msg,
      invalidInputName: name,
    }));
  }

  const checkInputsValidity = () => {
    let hasInvalidInputs = false;
    const validateNumber = (value) => /^[1-9]\d*$/.test(value) && value.length >= 2;
    

    for (const property in userData) {
      const propertyValue = userData[property];
      const currentWeightVal = parseInt(userData["Current Weight"].val);
      const goalWeightVal = parseInt(userData["Goal Weight"].val);
      const weightGoal = userData["Weight Goal"].val;

      // This checks if any input has invalid values: A.K.A ANYTHING beside numbers 
      if( (propertyValue.expectedValueType === "number" && !validateNumber(propertyValue.val)) 
         || 
         (propertyValue.expectedValueType === "char" && propertyValue.val.trim() === "")
        ) {
        hasInvalidInputs = true;
        setShowResultCard(false);
        updateInputValidity(true, "Inputs should ONLY contain positive whole numbers and NOT be empty.", propertyValue.title);
        return inputsValidity; // Terminate the loop immediately when an invalid input is found
      } 
      // if the current weight is less than the goal weight, then the weight goal can't be "loss weight"
      else if (currentWeightVal < goalWeightVal && weightGoal === "loss weight") {
        hasInvalidInputs = true;
        setShowResultCard(false);
        updateInputValidity(true, "Your goal weight should be lower than your current weight for a 'Lose Weight' goal.", propertyValue.title);
        return inputsValidity;
      } 
      // if the current weight is more than the goal weight, then the weight goal can't be "gain weight"
      else if (currentWeightVal > goalWeightVal && weightGoal === "Gain weight") {
        hasInvalidInputs = true;
        setShowResultCard(false);
        updateInputValidity(true,"Your goal weight should be higher than your current weight for a 'Gain Weight' goal.", propertyValue.title);
        return inputsValidity
      } 
      // if the current weight is not equal to the goal weight, then user can't choose "maintain current weight" as a weight goal
      else if (currentWeightVal !== goalWeightVal && weightGoal === "maintain current weight") {
        hasInvalidInputs = true;
        setShowResultCard(false);
        updateInputValidity(true, "If your goal is to 'Maintain Current Weight', the current weight and goal weight should be the same. Please enter the same value for both.", propertyValue.title);
        return inputsValidity;
      } 
      // if the current weight is equal to the goal weight, then user can't choose anything beside "maintain current weight" as a weight goal
      else if (currentWeightVal === goalWeightVal && weightGoal !== "maintain current weight") {
        hasInvalidInputs = true;
        setShowResultCard(false);
        updateInputValidity(true, "If your goal is not to 'Maintain Current Weight,' having the same value for both current and goal weight might not be in line with your intended weight change. Please review your weight goal to ensure it accurately represents your intentions.", propertyValue.title);
        return inputsValidity;
      }      
    }

    if (!hasInvalidInputs) {
      updateInputValidity(false, ALL_INPUTS_VALID_MSG, '');
      setShowResultCard(true);
    }
    return inputsValidity;
  };
 
  const getResult = () => {
    checkInputsValidity();
  };


  useEffect(() => {
    setDivStyle((prevDivStyle) => ({
      ...prevDivStyle,
      transform:
        systemInfo === "Imperial system"
          ? "translateX(100%)"
          : "translateX(0%)",
    }));
  }, [systemInfo]);

  return (
    <CalculatorContext.Provider
      value={{
        userData,
        systemInfo,
        activityLevel,
        divStyle,
        btnSwitch,
        toggleActivityLevel,
        handleChange,
        getResult,
        showResultCard,
        inputsValidity,
        ALL_INPUTS_VALID_MSG,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

const useCalculatorContext = () => {
  return useContext(CalculatorContext);
};

export { useCalculatorContext, CalculatorProvider };
