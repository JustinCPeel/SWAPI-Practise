import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles/index.scss";
import axios from "axios";
import Home from "./pages/Home";
import { AxiosInterceptor } from "./hooks/axiosInterceptor";

function App() {
  const [characters, setCharacters] = useState<CharactersMinimal[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = axios.get<CharactersMinimal[]>(
          "http://localhost:3001/api/characters"
        );
      } catch (error) {}
    };
    fetchCharacters();
  }, []);

  return (
    <AxiosInterceptor>
      <Home></Home>
    </AxiosInterceptor>
  );
}

export default App;
