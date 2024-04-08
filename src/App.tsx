import React, { useContext, useState } from 'react';
import { InputContext } from './contexts/InputContext';
import { CalculationContext } from './contexts/CalculationContext';
import { OutputContext } from './contexts/OutputContext';

function App() {
  const { userInput, setUserInput } = useContext(InputContext)!;
  const { calculationResults, jsonRequest, calculationFunctions } = useContext(CalculationContext)!;
  const { data, isLoading, error, fetchData } = useContext(OutputContext)!;

  const [isEntered, setIsEntered] = useState({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInput(name, value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    (calculationFunctions as Record<string, any>)[name].isEntered = !checked;
  };

  const handleButtonClick = () => {
    fetchData(jsonRequest);
  };

  return (
    <div>
      {Object.entries(calculationFunctions).map(([calculationName, { inputKeys, children }]) => (
        <div key={calculationName}>
          <h2>{calculationName}</h2>
          <p>Result: {calculationResults[calculationName]}</p>
          <input
            type="checkbox"
            name={calculationName}
            checked={!calculationFunctions[calculationName].isEntered}
            onChange={handleCheckboxChange}
          /> Calculate
          <input
            type="text"
            name={calculationName}
            value={userInput[calculationName]} 
            onChange={handleInputChange}
            disabled={!calculationFunctions[calculationName].isEntered}
          />
          {!calculationFunctions[calculationName].isEntered && children.map(({ name }) => (
            <input
              key={name}
              type="text"
              name={name}
              value={userInput[name]} 
              onChange={handleInputChange}
            />
          ))}
        </div>
      ))}
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