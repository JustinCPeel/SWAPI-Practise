import { motion } from "framer-motion";
import React, { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: FC<ButtonProps> = ({ label, onClick, ...rest }) => {
  return (
    <motion.button
      onClick={onClick}
      className="btn"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span>{label}</span>
    </motion.button>
  );
};

export default Button;
