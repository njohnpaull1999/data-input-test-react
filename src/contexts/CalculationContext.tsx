// CalculationContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { InputContext } from "./InputContext";
import {
  UserInput,
  JsonRequest,
  UserParentInput,
  UserChildInput,
} from "../types";

interface CalculationResults {
  [key: string]: number;
}

interface CalculationContextProps {
  calculationResults: CalculationResults;
  jsonRequest: JsonRequest;
  calculationFunctions: Record<keyof UserParentInput, CalculationFunction>;
  setCalculationFunctions: React.Dispatch<React.SetStateAction<Record<keyof UserParentInput, CalculationFunction>>>;
}

export const CalculationContext = createContext<
  CalculationContextProps | undefined
>(undefined);

type ChildCalculationFunction = {
  name: string;
  inputKeys: (keyof UserChildInput)[];
  calculationFunction: (inputs: number[]) => number;
};

type CalculationFunction = {
  name: keyof UserParentInput;
  inputKeys: string[];
  calculationFunction: (inputs: number[]) => number;
  isEntered: boolean;
  children?: ChildCalculationFunction[];
};

export const CalculationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [calculationResults, setCalculationResults] =
    useState<CalculationResults>({});
  const [jsonRequest, setJsonRequest] = useState<JsonRequest>({
    data: { sumA: 0, multiplyB: 0 },
  });
  const { userInput } = useContext(InputContext)!;

  const [calculationFunctions, setCalculationFunctions] = useState<
    Record<keyof UserParentInput, CalculationFunction>
  >({
    sumA: {
      name: "sumA",
      inputKeys: ["sumA1", "sumA2"],
      calculationFunction: (inputs: number[]) =>
        inputs.reduce((a, b) => a + b, 0),
      isEntered: userInput?.sumA?.isEntered || false,
      children: [
        {
          name: "sumA1",
          inputKeys: ["input1", "input2"],
          calculationFunction: (inputs: number[]) =>
            inputs.reduce((a, b) => a + b, 0),
        },
        {
          name: "sumA2",
          inputKeys: ["input3", "input4"],
          calculationFunction: (inputs: number[]) =>
            inputs.reduce((a, b) => a + b, 0),
        },
        {
          name: "sumA3",
          inputKeys: ["input5", "input6"],
          calculationFunction: (inputs: number[]) =>
            inputs.reduce((a, b) => a + b, 0),
        },
        {
          name: "sumA4",
          inputKeys: ["input7", "input8"],
          calculationFunction: (inputs: number[]) =>
            inputs.reduce((a, b) => a + b, 0),
        },
        {
          name: "sumA5",
          inputKeys: ["input9", "input10"],
          calculationFunction: (inputs: number[]) =>
            inputs.reduce((a, b) => a + b, 0),
        },
      ],
    },
    multiplyB: {
      name: "multiplyB",
      inputKeys: ["multiplyB1", "multiplyB2"],
      calculationFunction: (inputs: number[]) =>
        inputs.reduce((a, b) => a * b, 1),
      isEntered: userInput?.multiplyB?.isEntered || false,
      children: [
        {
          name: "multiplyB1",
          inputKeys: ["input11", "input12"],
          calculationFunction: (inputs: number[]) =>
            inputs.reduce((a, b) => a * b, 1),
        },
        {
          name: "multiplyB2",
          inputKeys: ["input13", "input14"],
          calculationFunction: (inputs: number[]) =>
            inputs.reduce((a, b) => a * b, 1),
        },
      ],
    },
  });

  useEffect(() => {
    const newCalculationResults: CalculationResults = {};

    const calculate = (
      calculationFunction: CalculationFunction | ChildCalculationFunction
    ): number => {
      if ("isEntered" in calculationFunction && calculationFunction.isEntered) {
        // If the value is entered by the user, return the user input
        return userInput[calculationFunction.name].value || 0;
      } else if (
        "children" in calculationFunction &&
        calculationFunction.children
      ) {
        // If there are child calculations, calculate each child and store the results
        let inputs = {};
        calculationFunction.children
          ?.map(
            (childFunc) =>
              (inputs[childFunc.name] = childFunc.inputKeys.map((key) =>
                userInput[key] ? parseInt(userInput[key]) : 0
              ))
          )
          .flat();
        const childResults = calculationFunction.children?.map((calcFunc) =>
          calcFunc.calculationFunction(inputs[calcFunc.name])
        );
        childResults.forEach((result, index) => {
          newCalculationResults[calculationFunction.children[index].name] =
            result;
        });
        // Calculate the parent value based on the child results
        return calculationFunction.calculationFunction(childResults);
      } else {
        // If there are no child calculations, calculate the value based on the user inputs
        const inputs = calculationFunction.inputKeys.map(
          (key) => userInput[key] || 0
        );
        return calculationFunction.calculationFunction(inputs);
      }
    };

    Object.entries(calculationFunctions).forEach(
      ([key, calculationFunction]) => {
        newCalculationResults[key] = calculate(calculationFunction);
      }
    );

    setCalculationResults(newCalculationResults);
  }, [userInput]);

  useEffect(() => {
    setJsonRequest({
      data: {
        sumA: calculationResults["sumA"] || 0,
        multiplyB: calculationResults["multiplyB"] || 0,
      },
    });
  }, [calculationResults]);

  return (
    <CalculationContext.Provider
      value={{ calculationResults, jsonRequest, calculationFunctions, setCalculationFunctions }}
    >
      {children}
    </CalculationContext.Provider>
  );
};
