import { useEffect, useState } from 'react'

export const useFetch = (urlApi) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(urlApi);
      const json = await response.json();

      setData(json);
    };

    fetchData();

  }, [urlApi]);

  return { data };
};
