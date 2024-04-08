import React, { createContext, useState } from "react";
import { UserInput } from "../types";

interface InputContextProps {
  userInput: UserInput;
  setUserInput: (key: string, value: string) => void;
}

export const InputContext = createContext<InputContextProps | undefined>(
  undefined
);

export const InputProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInput, setUserInput] = useState<UserInput>({} as UserInput);

  const updateUserInput = (key: string, value: string) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [key]: value,
    }));
  };

  return (
    <InputContext.Provider value={{ userInput, setUserInput: updateUserInput }}>
      {children}
    </InputContext.Provider>
  );
};
