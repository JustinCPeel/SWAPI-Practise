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
      animate={
        animate
          ? {
              opacity: 0,
              scale: 0.8, // Shrink the element to 80% of its original size
              rotateX: -55, // Rotate slightly on the X-axis to simulate flipping
              y: -150
            }
          : {}
      }
      transition={{ duration: 2.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        rowGap: 20,
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      <img src="/assets/images/logo_edit.png" className="starwars-logo" />
      <Button label="Begin Comparisons" onClick={startAnimation} />
    </motion.div>
  );
};
