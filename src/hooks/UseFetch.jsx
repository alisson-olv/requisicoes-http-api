import { useEffect, useState } from 'react'

export const useFetch = (urlApi) => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [itemId, setItemId] = useState(null);

  const httpConfig = (data, method) => {
    if (method === 'POST') {
      setConfig({
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
    } else if (method === 'DELETE') {
      setConfig({
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setMethod(method);
      setItemId(data);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(urlApi);
        const json = await response.json();

        setData(json);

      } catch (error) {
        console.log(error.message);
        setError('Houve algum erro, tente novamente mais tarde.');
      }

      setLoading(false);
    };

    fetchData();
  }, [urlApi, callFetch]);

  // refatorando post
  useEffect(() => {
    const httpRequest = async () => {

      let json

      if (method === 'POST') {
        let fetchOptions = [urlApi, config];

        const res = await fetch(...fetchOptions);
        json = await res.json();

      } else if (method === 'DELETE') {

        const deleteUrl = `${urlApi}/${itemId}`;
        const response = await fetch(deleteUrl, config);
        json = await response.json();

      };
      setCallFetch(json);
    };

    httpRequest();
  }, [config, method, urlApi]);

  return { data, httpConfig, loading, error };
};


