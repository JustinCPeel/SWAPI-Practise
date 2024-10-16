import React, { useState } from "react";
import { compareCharacterStats } from "../../services/api";

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

  return (
    <div>
      <button onClick={fetchComparison}>test</button>
    </div>
  );
};
