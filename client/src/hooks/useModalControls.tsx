import { useEffect, useRef, useState } from "react";

const useModalControls = () => {
  const [isComponentVisible, setIsComponentVisible] = useState<Boolean>(false);
  const ref = useRef(null);

  const handleClickOutside = (event: any) => {
    //@ts-ignore
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { isComponentVisible, setIsComponentVisible, ref };
};

export default useModalControls;
