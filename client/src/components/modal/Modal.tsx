import { motion } from "framer-motion";
import { LightSaberLoading } from "../../pages/components/LightSaberLoading";
import { useState } from "react";

const Modal = ({
  children,
  loading,
}: {
  children: JSX.Element;
  loading: boolean;
}) => {
  return (
    <motion.div
      className="modal-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Exit fade-out animation
      transition={{ duration: 0.5 }}
    >
      {loading ? (
        <LightSaberLoading />
      ) : (
        <motion.div
          className="modal-container max-width"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
        >
          <div className="image-overlay"></div>
          <div className="modal-content">{children}</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Modal;
