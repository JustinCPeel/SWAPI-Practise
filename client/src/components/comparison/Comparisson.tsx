import React, { useState } from "react";
import { compareCharacterStats } from "../../services/api";
import { motion } from "framer-motion";

export const Comparisson = ({ primary, secondary }: ComparisonState) => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchComparison = async () => {
    try {
      setLoading(true);
      const result = await compareCharacterStats({ primary, secondary });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const canCompare = primary !== "" && secondary !== "";

  if (canCompare)
    return (
      <>
        <motion.button
          onClick={fetchComparison}
          className="btn"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <span>Compare Characters</span>
        </motion.button>
        <div>character details</div>
      </>
    );
  return null;
};
