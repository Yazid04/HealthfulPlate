import React, { createContext, useContext, useState, useEffect} from "react";
const CalculatorContext = createContext();

const CalculatorProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    "Current Weight": {
      id: "1",
      val: "",
      expectedValueType: "number",
      title: "Current Weight",
    },
    "Goal Weight": {
      id: "2",
      val: "",
      expectedValueType: "number",
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
      title: "Gender",
    },
    Age: {
      id: "4",
      val: "",
      expectedValueType: "number",
      title: "Age",
    },
    "Activity level": {
      id: "5",
      val: "Sedentary",
      expectedValueType: "char",
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
          name: "Lightly Active",
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
      title: "Height",
    },
    Timeframe: {
      id: "7",
      options: [
        ["Gradual", "70"],
        ["Moderate", "71"],
        ["Aggressive", "72"],
      ],
      val: "",
      expectedValueType: "char",
      title: "Timeframe",
    },
    "Weight Goal": {
      id: "8",
      options: [
        ["Gain weight", "80"],
        ["Lose weight", "81"],
        ["Maintain current weight", "82"],
      ],
      val: "",
      expectedValueType: "char",
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
  const ALL_INPUTS_VALID_MSG = "All inputs are filled and valid!";
  const [inputsValidity, setInputsValidity] = useState({
    hasInvalidInputs: null,
    msg: null,
    invalidInputName: null,
  });
  const [caloriesTotal, setCaloriesTotal] = useState(null);

  const btnSwitch = () => {
    setSystemInfo((prevState) =>
      prevState === "Metric system" ? "Imperial system" : "Metric system"
    );
    setUserData((prev) => {
      const updatedInputValues = {};
      for (const key in prev) {
        if(key === 'Activity level'){
          updatedInputValues[key] = { ...prev[key], val: "Sedentary" };
        }
        else{
        updatedInputValues[key] = { ...prev[key], val: "" };
      }
    }
      return updatedInputValues;
    });
    setActivityLevel((prev) => ({
       ...prev, name: "Sedentary", idx: 0,
    }));
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
    //const validateNumber = (value) => /^[1-9]\d{1,2}$/.test(value);
    const validateNumber = (value) => /^[1-9]\d{0,2}(\.\d+)?$/.test(value);

    for (const property in userData) {
      const propertyValue = userData[property];
      const currentWeightVal = parseInt(userData["Current Weight"].val);
      const goalWeightVal = parseInt(userData["Goal Weight"].val);
      const weightGoal = userData["Weight Goal"].val;

      // This checks if any input has invalid values: A.K.A ANYTHING beside numbers
       if (
        (propertyValue.expectedValueType === "number" &&
          !validateNumber(propertyValue.val)) ||
        (propertyValue.expectedValueType === "char" &&
          propertyValue.val.trim() === "")
      ) {
        hasInvalidInputs = true;
        setShowResultCard(false);
        updateInputValidity(
          true,
          "Inputs should ONLY contain positive whole numbers, NOT be more than 3 digits, and NOT be empty.",
          propertyValue.title
        );
        return inputsValidity; // Terminate the loop immediately when an invalid input is found
      }


      // if the current weight is less than the goal weight, then the weight goal can't be "loss weight"
      else if (
        currentWeightVal < goalWeightVal &&
        weightGoal === "Lose weight"
      ) {
        hasInvalidInputs = true;
        setShowResultCard(false);
        updateInputValidity(
          true,
          'Your current weight should be higher than your goal weight for a "Lose Weight" goal.',
          propertyValue.title
        );
        return inputsValidity;
      }
      // if the current weight is more than the goal weight, then the weight goal can't be "gain weight"
      else if (
        currentWeightVal > goalWeightVal &&
        weightGoal === "Gain weight"
      ) {
        hasInvalidInputs = true;
        setShowResultCard(false);
        updateInputValidity(
          true,
          'Your current weight should be lower than your goal weight for a "Gain Weight" goal.',
          propertyValue.title
        );
        return inputsValidity;
      }
      // if the current weight is not equal to the goal weight, then user can't choose "maintain current weight" as a weight goal
      else if (
        currentWeightVal !== goalWeightVal &&
        weightGoal === "Maintain current weight"
      ) {
        hasInvalidInputs = true;
        setShowResultCard(false);
        updateInputValidity(
          true,
          'If your goal is to "Maintain Current Weight", the current weight and goal weight should be the same. Please enter the same value for both.',
          propertyValue.title
        );
        return inputsValidity;
      }
      // if the current weight is equal to the goal weight, then user can't choose anything beside "maintain current weight" as a weight goal
      else if (
        currentWeightVal === goalWeightVal &&
        weightGoal !== "Maintain current weight"
      ) {
        hasInvalidInputs = true;
        setShowResultCard(false);
        updateInputValidity(
          true,
          'If your goal is not to "Maintain Current Weight," having the same value for both current and goal weight might not be in line with your intended weight change. Please review your weight goal to ensure it accurately represents your intentions.',
          propertyValue.title
        );
        return inputsValidity;
      }
    }

    if (!hasInvalidInputs) {
      updateInputValidity(false, ALL_INPUTS_VALID_MSG, "");
      setShowResultCard(true);
      return inputsValidity;
    }
    return inputsValidity;
  };

  function convertToMetricValues(type, val){
    if(type === 'Weight'){
      const kg = val / (2.2)
      return kg?.toFixed(0);
    }
    if(type === 'Height'){
     const centimeters = val * 30.48;
     return centimeters?.toFixed(0);
  }
}

  const getResult = () => {
   checkInputsValidity();
    const gender = userData['Gender'].val;
    let weight = userData['Current Weight'].val;
    let height = userData['Height'].val;
    const age = userData['Age'].val;
    const activityLevel = {
      Sedentary: 1.2,
      "Lightly Active": 1.375,
      "Moderately Active": 1.55,
      "Very Active": 1.725,
    }[userData['Activity level'].val];

    const weightGoal = userData['Weight Goal'].val;
    const timeframe = userData['Timeframe'].val;

    if(systemInfo === 'Imperial system'){
      weight = convertToMetricValues('Weight', weight);
      height = convertToMetricValues('Height', height);
    }
  
    const harrisBenedictCoefficients = {
      Male: { a: 66.5, b: 13.75, c: 5.003, d: 6.75 },
      Female: { a: 655.1, b: 9.563, c: 1.850, d: 4.676 },
      Other: { a: 100, b: 10, c: 5, d: 5 }, // Define coefficients for "other"
    };
    
    const genderCoefficients = harrisBenedictCoefficients[gender];
    const BMR = genderCoefficients?.a + (genderCoefficients?.b * weight) + (genderCoefficients?.c * height) - (genderCoefficients?.d * age);
    console.log(height)
    let TDEE = BMR * activityLevel;
  
    if (weightGoal === 'Maintain current weight') {
      setCaloriesTotal(TDEE);
    } 
    else {
      const weightChangeCoefficients = {
        "Gain weight": {
          Gradual: 500,
          Moderate: 750,
          Aggressive: 1000,
        },
        "Lose weight": {
          Gradual: 250,
          Moderate: 375,
          Aggressive: 500,
        },
      }[weightGoal];
  
      if (weightChangeCoefficients && weightChangeCoefficients[timeframe]) {
        if (weightGoal === 'Lose weight') {
          TDEE -= weightChangeCoefficients[timeframe]; // Adjust for weight loss
        } else {
          TDEE += weightChangeCoefficients[timeframe];
        }
        setCaloriesTotal(TDEE);
      } else {
        // Handle invalid weightGoal and timeframe combinations
        console.error("Invalid weightGoal or timeframe combination");
      }
    }
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
        caloriesTotal,
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