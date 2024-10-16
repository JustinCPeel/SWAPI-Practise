import { FC, useEffect, useState } from "react";
import AsyncSelectCharacter from "../components/ReactSelect/AsyncSelectCharacter";
import { fetchCharacterForUrl } from "../services/api";
import { CharacterProvider } from "../hooks/useCharacter";
import CharacterDisplayCard from "../components/cards/CharacterDisplayCard";
import { Comparisson } from "../components/comparison";

const Home: FC = () => {
  const [comparisonState, setComparisonState] = useState<ComparisonState>({
    primary: "",
    secondary: "",
  });

  const handleStateChange = (value: Partial<ComparisonState>) => {
    setComparisonState((previous) => ({ ...previous, ...value }));
  };

  return (
    <div className="starwars-container">
      <div className="grid-layout">
        <CharacterProvider
          setCoreState={(selectedClientUrl: string) =>
            handleStateChange({ primary: selectedClientUrl })
          }
        >
          <>
            <AsyncSelectCharacter id="primary-character-select" />
            <CharacterDisplayCard id="primary-character-card" />
          </>
        </CharacterProvider>
        <CharacterProvider
          setCoreState={(selectedClientUrl: string) =>
            handleStateChange({ secondary: selectedClientUrl })
          }
        >
          <>
            <AsyncSelectCharacter id="secondary-character-select" />
            <CharacterDisplayCard id="secondary-character-card" />
          </>
        </CharacterProvider>
      </div>
      <Comparisson
        primary={comparisonState.primary}
        secondary={comparisonState.secondary}
      />
    </div>
  );
};

export default Home;
