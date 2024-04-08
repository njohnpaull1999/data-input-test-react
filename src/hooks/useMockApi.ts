import { useState } from 'react';

const useMockApi = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (body: any) => {
    setIsLoading(true);
    try {
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      //Mocking API request
      // Multiply every value of every key in the data field together
      let tempBody = body.data;
      const output = Object.values(tempBody as { [key: string]: number }).reduce((a: number, b: number) => a * b, 1);

      // Set the output in the data state
      setData({ output });
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
};

export default useMockApi;