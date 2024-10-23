import { motion } from "framer-motion";
import { FC } from "react";
import AsyncSelect from "react-select/async";
import { useCharacter } from "../../hooks/useCharacter";
import { searchCharacter } from "../../services/api";
import { useMediaQuery } from "@uidotdev/usehooks";

interface CharacterSelectProps {
  id: string;
  zIndex: number;
}

/** An Asynchronous searchable select element that utilizes the react-select library.
 * It has been customized to only search and display the results when the search has got 3 or more characters entered.
 *
 * Currently only being used to search based on the API service created within the application.
 *
 * @returns {JSX.Element} A custom select element
 */
const AsyncSelectCharacter: FC<CharacterSelectProps> = ({ id, zIndex }) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { selectedCharacter, setSelectedCharacter } = useCharacter();

  const promiseCharacters = (inputValue: string) => {
    if (inputValue.length <= 1) return Promise.resolve([] as CharacterOption[]);

    return new Promise<CharacterOption[]>((resolve) => {
      resolve(searchCharacter(inputValue));
    });
  };

  return (
    <div className="floating">
      <AsyncSelect
        id={id}
        loadOptions={promiseCharacters}
        styles={{
          container: (baseStyles) => ({
            ...baseStyles,
            zIndex: zIndex,
            color: "white",
            width: "100%",
            maxWidth: 400,
            justifySelf: "center",
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: "white",
          }),
          control: (provided, state) => ({
            ...provided,
            zIndex: state.isFocused ? 999 : 1,
            color: "white",
            border: "none",
            backgroundColor: "rgba(77, 77, 77, 0.3)",
            ":hover": {
              backgroundColor: "rgba(77, 77, 77, 0.5)",
            },
            ":focus": {
              border: "none",
            },
            borderRadius: "4px",
            boxShadow: state.isFocused ? "0 0 0 1px #888" : "none",

            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "transparent",
              transition:
                "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
              transform: "scaleX(0)",
            },
            "::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "transparent",
              transition:
                "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
              transform: "scaleX(0)",
            },

            ":hover::before, :hover::after": {
              border: "#15f2fd",
              transform: "scaleX(1)",
            },
            ":focus::before, :focus::after": {
              backgroundColor: "#ff0000",
              transform: "scaleX(1)",
            },
          }),
          menu: (base, state) => ({
            ...base,
            backgroundColor:
              isSmallDevice && state.hasValue
                ? "rgba(55, 55, 55, 1)"
                : "rgba(55, 55, 55, 0.7)",
            borderRadius: "4px",
            zIndex: 999,
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "transparent",
            borderRadius: "4px",
            color: "white",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: 14,
            color: state.isSelected ? "#fff" : "white",
            backgroundColor: "#transparent",
            ":active": {
              backgroundColor: "rgba(77, 77, 77, 0.6)",
            },
            ":hover": {
              backgroundColor: "rgba(77, 77, 77, 0.6)",
              fontWeight: 600,
            },
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "white",
          }),
        }}
        value={{ value: selectedCharacter.url, label: selectedCharacter.name }}
        onChange={(selectedOption) =>
          setSelectedCharacter(
            selectedOption
              ? {
                  url: selectedOption?.value ?? "",
                  name: selectedOption?.label ?? "",
                }
              : { url: "", name: "" }
          )
        }
        isClearable
      />
      <motion.label
        htmlFor={id}
        className={`floating-label`}
        initial={{ opacity: 1 }}
        animate={{ opacity: selectedCharacter.url !== "" ? 0 : 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Select Character
      </motion.label>
    </div>
  );
};

export default AsyncSelectCharacter;
