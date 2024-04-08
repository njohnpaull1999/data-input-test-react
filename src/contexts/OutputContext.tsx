// OutputContext.tsx
import React, { createContext, useContext } from 'react';
import { CalculationContext } from './CalculationContext';
import useMockApi from '../hooks/useMockApi';

interface OutputContextProps {
  data: any;
  isLoading: boolean;
  error: any;
  fetchData: (body: any) => void;
}

export const OutputContext = createContext<OutputContextProps | undefined>(undefined);

export const OutputProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading, error, fetchData } = useMockApi();

  return (
    <OutputContext.Provider value={{ data, isLoading, error, fetchData }}>
      {children}
    </OutputContext.Provider>
  );
};