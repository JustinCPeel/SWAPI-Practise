export const LightSabers = ({
  charactersSelected,
}: {
  charactersSelected: ComparisonState;
}) => {
  return (
    <>
      <svg viewBox="0 0 685 250" className="saber saber-top">
        <use xlinkHref="#light-saber"></use>
      </svg>
      <div
        className={`saber-light saber-light-top ${
          charactersSelected.primary !== "" && "selected"
        }`}
      ></div>
      <svg viewBox="0 0 685 250" className="saber saber-bottom">
        <use xlinkHref="#light-saber"></use>
      </svg>
      <div
        className={`saber-light saber-light-bottom ${
          charactersSelected.secondary !== "" && "selected"
        }`}
      ></div>
    </>
  );
};
