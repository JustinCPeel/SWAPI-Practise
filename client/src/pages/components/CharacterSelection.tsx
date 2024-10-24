import { motion } from "framer-motion";
import React, { useState } from "react";
import { CharacterProvider } from "../../hooks/useCharacter";
import AsyncSelectCharacter from "../../components/ReactSelect/AsyncSelectCharacter";
import CharacterDisplayCard from "../../components/cards/CharacterDisplayCard";
import { Comparisson } from "../../components/comparison";
import { LightSabers } from "../../components/lightSaber";
import { LightSaberSvg } from "../../components/lightSaber/LightSaberSvg";
import { useMediaQuery } from "@uidotdev/usehooks";
import MobileDisplayCard from "../../components/cards/MobileDisplayCard";

export const CharacterSelection = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 700px)");
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
            <AsyncSelectCharacter id="primary-character-select" zIndex={8} />
            {isSmallDevice ? (
              <MobileDisplayCard
                id="primary-mobile-character"
                key={"primary"}
              />
            ) : (
              <CharacterDisplayCard id="primary-character-card" />
            )}
          </>
        </CharacterProvider>
        <CharacterProvider
          setCoreState={(selectedClientUrl: string) =>
            handleStateChange({ secondary: selectedClientUrl })
          }
        >
          <>
            <AsyncSelectCharacter id="secondary-character-select" zIndex={6} />
            {isSmallDevice ? (
              <MobileDisplayCard
                id="secondary-mobile-character"
                key={"secondary"}
              />
            ) : (
              <CharacterDisplayCard id="secondary-character-card" />
            )}
          </>
        </CharacterProvider>
      </motion.div>
      <Comparisson
        primary={comparisonState.primary}
        secondary={comparisonState.secondary}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <div>
          <LightSaberSvg />
          <LightSabers charactersSelected={comparisonState} />
        </div>
      </motion.div>
    </>
  );
};
