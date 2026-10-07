import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(url, { credentials: "include" });

      if (!response.ok) {
        if (response.status === 401) throw new Error("401 Unauthorized");
        if (response.status === 403) throw new Error("403 Forbidden");
        if (response.status === 500)
          throw new Error("500 Internal Server Error");
        throw new Error("No se logró conseguir la respuesta del servidor");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
