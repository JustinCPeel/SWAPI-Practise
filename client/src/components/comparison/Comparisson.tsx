import { motion } from "framer-motion";
import { useState } from "react";
import useModalControls from "../../hooks/useModalControls";
import { compareCharacterStats } from "../../services/api";
import Modal from "../modal/Modal";

export const Comparisson = ({ primary, secondary }: ComparisonState) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { isComponentVisible, setIsComponentVisible, ref } = useModalControls();

  const fetchComparison = async () => {
    setIsComponentVisible(true);
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
        {isComponentVisible && (
          <Modal>
            <div ref={ref}>test</div>
          </Modal>
        )}
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
