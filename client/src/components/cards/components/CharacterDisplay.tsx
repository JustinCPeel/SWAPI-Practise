import React from "react";
import { useCharacter } from "../../../hooks/useCharacter";

export const CharacterDisplay = () => {
  const { characterDetails, loading } = useCharacter();
  return (
    <div className="character-display">
      {!loading && (
        <>
          <img
            className="character-model"
            src={`/assets/images/${characterDetails.name}.webp`}
            width={"auto"}
          />
        </>
      )}
    </div>
  );
};
