import { motion } from "framer-motion";
import { useState } from "react";
import useModalControls from "../../hooks/useModalControls";
import { LightSaberLoading } from "../../pages/components/LightSaberLoading";
import { compareCharacterStats } from "../../services/api";
import Modal from "../modal/Modal";
import { ComparissonAttribute } from "./components";
import Button from "../button/Button";

export const Comparisson = ({ primary, secondary }: ComparisonState) => {
  const { isComponentVisible, setIsComponentVisible, ref } = useModalControls();
  const [comparison, setComparisonState] = useState<ComparisonResponse>();
  const [loading, setLoading] = useState(false);

  const fetchComparison = async () => {
    setIsComponentVisible(true);
    setLoading(true);
    try {
      const result = await compareCharacterStats({ primary, secondary });
      setComparisonState(result);
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
            <div ref={ref} className="character-comparison">
              {loading && <LightSaberLoading />}
              {!loading && comparison && (
                <>
                  <h2>
                    <span className="characteristic">
                      {comparison.name.primary} from{" "}
                      {comparison.homeworld.primary}
                    </span>{" "}
                    VS{" "}
                    <span className="characteristic">
                      {comparison.name.secondary} from{" "}
                      {comparison.homeworld.secondary}
                    </span>
                  </h2>
                  <div className="characteristic-wrapper">
                    <ComparissonAttribute
                      primary={`${comparison.name.primary} (${comparison.birth_year.primary})`}
                      secondary={`${comparison.name.secondary} (${comparison.birth_year.secondary})`}
                      description={comparison.birth_year.descritpion}
                      title={"Age"}
                      icon={"birth"}
                    />
                    <ComparissonAttribute
                      primary={`${comparison.name.primary} (${comparison.height.primary})`}
                      secondary={`${comparison.name.secondary} (${comparison.height.secondary})`}
                      description={comparison.height.descritpion}
                      title={"Height"}
                      icon={"height"}
                    />

                    <ComparissonAttribute
                      primary={`${comparison.name.primary} (${comparison.mass.primary})`}
                      secondary={`${comparison.name.secondary} (${comparison.mass.secondary})`}
                      description={comparison.mass.descritpion}
                      title={"Weight"}
                      icon={"weight"}
                    />
                    <ComparissonAttribute
                      primary={`${comparison.name.primary} (${comparison.eye_color.primary})`}
                      secondary={`${comparison.name.secondary} (${comparison.eye_color.secondary})`}
                      description={comparison.eye_color.descritpion}
                      title={"Eyes"}
                      icon={"eye"}
                    />
                    <ComparissonAttribute
                      primary={`${comparison.name.primary} (${comparison.films.primary})`}
                      secondary={`${comparison.name.secondary} (${comparison.films.secondary})`}
                      description={comparison.films.descritpion}
                      title={"Films"}
                      icon={"movie"}
                    />
                    <ComparissonAttribute
                      primary={`${comparison.name.primary} (${comparison.hair_color.primary})`}
                      secondary={`${comparison.name.secondary} (${comparison.hair_color.secondary})`}
                      description={comparison.hair_color.descritpion}
                      title={"Hair"}
                      icon={"hair"}
                    />

                    <ComparissonAttribute
                      primary={`${comparison.name.primary} (${comparison.skin_color.primary})`}
                      secondary={`${comparison.name.secondary} (${comparison.skin_color.secondary})`}
                      description={comparison.skin_color.descritpion}
                      title={"Skin"}
                      icon={"skin"}
                    />
                    <Button
                      label={"Dismiss"}
                      onClick={() => setIsComponentVisible(false)}
                    />
                  </div>
                </>
              )}
            </div>
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
      </>
    );

  return null;
};
