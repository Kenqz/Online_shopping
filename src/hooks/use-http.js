import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const sendRequest = useCallback(async (urlconfig, setData) => {
    setIsLoading(true);
    try {
      const response = await fetch(urlconfig.url, {
        method: urlconfig.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(urlconfig.body) || null,
      });
      const data = await response.json();
      setData(data);

      if (!response.ok) {
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsError(false);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    isError,
    sendRequest,
  };
};

export default useHttp;
