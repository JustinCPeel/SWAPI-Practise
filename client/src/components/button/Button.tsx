import { motion } from "framer-motion";
import React, { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  "data-testid"?: string;
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  "data-testid": testId,
  ...rest
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="btn"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      data-testid={{ testId }}
    >
      <span>{label}</span>
    </motion.button>
  );
};

export default Button;
