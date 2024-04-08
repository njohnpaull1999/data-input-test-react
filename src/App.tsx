import React, { useContext, useState } from "react";
import { InputContext } from "./contexts/InputContext";
import { CalculationContext } from "./contexts/CalculationContext";
import { OutputContext } from "./contexts/OutputContext";

function App() {
  const { userInput, setUserInput } = useContext(InputContext)!;
  const { calculationResults, jsonRequest, calculationFunctions, setCalculationFunctions } =
    useContext(CalculationContext)!;
  const { data, isLoading, error, fetchData } = useContext(OutputContext)!;

  const [isEntered, setIsEntered] = useState({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInput(name, value);
  };

  // This state is used to track the checked state of each checkbox.
  // We're using a separate state for this because the state update in
  // setCalculationFunctions is asynchronous, which means it may not be
  // applied immediately. By using a separate state, we can ensure that
  // the checkbox immediately reflects the new checked state when it's clicked.
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    // Update the checked state of the clicked checkbox.
    setCheckboxStates(prev => ({ ...prev, [name]: checked }));

    // Update the isEntered property of the corresponding calculation function.
    // This is done asynchronously, so it may not be applied immediately.
    setCalculationFunctions(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        isEntered: checked,
      },
    }));
  };

  const handleButtonClick = () => {
    fetchData(jsonRequest);
  };

  return (
    <div>
      {Object.entries(calculationFunctions).map(
        ([calculationName, { inputKeys, children }]) => (
          <div key={calculationName}>
            <h2>{calculationName}</h2>
            <p>Result: {calculationResults[calculationName]}</p>
            <input
              type="checkbox"
              name={calculationName}
              // The checked attribute is tied to checkboxStates[calculationName],
              // so it immediately reflects the new checked state when the checkbox is clicked.
              checked={checkboxStates[calculationName] || false}
              onChange={handleCheckboxChange}
            />{" "}
            Calculate
            <input
              type="text"
              name={calculationName}
              value={userInput[calculationName] || ""}
              onChange={handleInputChange}
              disabled={calculationFunctions[calculationName].isEntered}
            />
            {calculationFunctions[calculationName].isEntered &&
              children &&
              children.map((child) => (
                <div key={child.name}>
                  {child.inputKeys.map((inputKey) => (
                    <input
                      key={inputKey}
                      type="text"
                      name={inputKey}
                      value={userInput[inputKey] || ""}
                      onChange={handleInputChange}
                    />
                  ))}
                </div>
              ))}
          </div>
        )
      )}
      <button onClick={handleButtonClick}>Send Request</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <p>Output: {data.output}</p>
          <p>sumA: {jsonRequest.data.sumA}</p>
          <p>multiplyB: {jsonRequest.data.multiplyB}</p>
        </>
      )}
    </div>
  );
}

export default App;
