import { FC, useState } from "react";
import { CharacterSelection } from "./components/CharacterSelection";
import { Logo } from "./components/Logo";
import { Stars } from "../components/stars";

export const Home: FC = () => {
  const [logoVisible, setLogoVisible] = useState<boolean>(true);
  const [gridVisible, setGridVisible] = useState<boolean>(false);

  const handleAnimationComplete = () => {
    setLogoVisible(false);
    setGridVisible(true);
  };

  return (
    <>
      <Stars />
      <div className="starwars-container">
        {logoVisible && (
          <Logo handleAnimationComplete={handleAnimationComplete} />
        )}
        {gridVisible && <CharacterSelection />}
      </div>
    </>
  );
};
