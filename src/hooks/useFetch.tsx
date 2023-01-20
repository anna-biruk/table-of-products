import { useState, useEffect } from "react";

export type DataItem = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
};

type DataProps = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: DataItem[];
  support: {
    url: string;
    text: string;
  };
};

type SearchResult = {
  data: DataItem;
  support: {
    url: string;
    text: string;
  };
};

type Result = {
  data: DataItem[];
  totalPages: number | null;
  error: boolean;
};

const useFetch = (url: string, page: number, id: number): Result => {
  const [data, setData] = useState<DataItem[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const api = async () => {
      if (id) {
        setTotalPages(null);
        const data = await fetch(`${url}?id=${id}`);
        if (!data.ok) {
          setError(true);
          return;
        } else {
          setError(false);
        }
        const jsonData: SearchResult = await data.json();
        setData([jsonData.data]);
      } else {
        const data = await fetch(`${url}?page=${page}&per_page=5`);
        if (!data.ok) {
          setError(true);
          return;
        } else {
          setError(false);
        }
        const jsonData: DataProps = await data.json();
        setData(jsonData.data);
        setTotalPages(jsonData.total_pages);
      }
    };
    api();
  }, [url, page, id]);

  return { data, totalPages, error };
};

export default useFetch;
