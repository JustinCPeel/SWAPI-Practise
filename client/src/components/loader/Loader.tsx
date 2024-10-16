import { FC } from "react";
import { motion } from "framer-motion";
import "./loader.scss";
interface LoaderProps {
  loading: boolean;
  key: string;
}

export const Loader: FC<LoaderProps> = ({ loading }) => {
  const loaderVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="r1-loading-container"
      initial="hidden"
      animate={loading ? "visible" : "hidden"}
      variants={loaderVariants}
      style={{
        width: "50px", 
        height: "50px",
         display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="rl-loading-thumb rl-loading-thumb-1"></div>
      <div className="rl-loading-thumb rl-loading-thumb-2"></div>
      <div className="rl-loading-thumb rl-loading-thumb-3"></div>
    </motion.div>
  );
};
