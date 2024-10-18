import { motion } from "framer-motion";
import React, { useState } from "react";
import { CharacterProvider } from "../../hooks/useCharacter";
import AsyncSelectCharacter from "../../components/ReactSelect/AsyncSelectCharacter";
import CharacterDisplayCard from "../../components/cards/CharacterDisplayCard";
import { Comparisson } from "../../components/comparison";

export const CharacterSelection = () => {
  const [comparisonState, setComparisonState] = useState<ComparisonState>({
    primary: "",
    secondary: "",
  });

  const handleStateChange = (value: Partial<ComparisonState>) => {
    setComparisonState((previous) => ({ ...previous, ...value }));
  };

  return (
    <>
      <motion.div
        className="grid-layout"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
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
      </motion.div>
      <Comparisson
        primary={comparisonState.primary}
        secondary={comparisonState.secondary}
      />
    </>
  );
};
