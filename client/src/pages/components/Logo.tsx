import { AnimationDefinition, motion } from "framer-motion";
import { FC, useState } from "react";
import Button from "../../components/button/Button";

interface AnimatedLogo {
  handleAnimationComplete: (definition: AnimationDefinition) => void;
}

export const Logo: FC<AnimatedLogo> = ({ handleAnimationComplete }) => {
  const [animate, setAnimate] = useState<boolean>(false);

  const startAnimation = () => {
    setAnimate(true);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={animate ? { opacity: 0 } : {}}
      transition={{ duration: 2 }}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      <img src="/assets/images/logo.png" className="starwars-logo" />
      <Button label="Begin Comparisons" onClick={startAnimation} />
    </motion.div>
  );
};
