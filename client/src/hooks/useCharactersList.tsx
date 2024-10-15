import React, { useEffect, useState } from "react";
import { fetchCharacters } from "../services/api";

const useCharactersList = () => {
  const [characters, setCharacters] = useState<CharactersMinimal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchCharacters();
      setCharacters(res);
      setLoading(false);
    };
    fetchData();
  }, []);
  return { characters, loading };
};

export default useCharactersList;
