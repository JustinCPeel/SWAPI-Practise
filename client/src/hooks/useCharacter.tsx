import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { fetchCharacterForUrl } from "../services/api";

interface CharacterContextProps {
  setSelectedCharacter: (character: CharactersMinimal) => void;
  selectedCharacter: CharactersMinimal;
  characterDetails: SwapiCharResponse;
  loading: boolean;
  error: string;
}

const defaultContext: CharacterContextProps = {
  setSelectedCharacter: () => {},
  selectedCharacter: { url: "", name: "" },
  characterDetails: {
    name: "",
    birth_year: "",
    eye_color: "",
    gender: "Male",
    hair_color: "",
    height: "",
    mass: "",
    skin_color: "",
    homeworld: "",
    films: [],
    species: [],
    starships: [],
    vehicles: [],
    url: "",
    created: "",
    edited: "",
    imageUrl: "",
  },
  loading: false,
  error: "",
};

export const CharacterContext = createContext(defaultContext);

export const CharacterProvider = ({
  children,
  setCoreState,
}: {
  children: React.ReactNode;
  setCoreState: (selectedClientUrl: any) => void;
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharactersMinimal>(
    { url: "", name: "" }
  );
  const [characterDetails, setCharacterDetails] = useState<SwapiCharResponse>({
    name: "",
    birth_year: "",
    eye_color: "",
    gender: "Male",
    hair_color: "",
    height: "",
    mass: "",
    skin_color: "",
    homeworld: "",
    films: [],
    species: [],
    starships: [],
    vehicles: [],
    url: "",
    created: "",
    edited: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (!selectedCharacter.url) return;
      try {
        setLoading(true);
        const encodedUrl = encodeURI(selectedCharacter.url);
        const data = await fetchCharacterForUrl(encodedUrl);
        setCharacterDetails(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("The force is not strong in you.");
      }
    };

    fetchCharacterDetails();
  }, [selectedCharacter]);

  const handleCharacterSelect = (character: CharactersMinimal) => {
    setSelectedCharacter(character);
    setCoreState(character.url);
  };

  const contextValue = {
    setSelectedCharacter: handleCharacterSelect,
    selectedCharacter,
    characterDetails,
    loading,
    error,
  };

  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);
