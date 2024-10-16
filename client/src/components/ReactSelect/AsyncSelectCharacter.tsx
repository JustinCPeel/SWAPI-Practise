import AsyncSelect from "react-select/async";
import { searchCharacter } from "../../services/api";
import { FC, SetStateAction } from "react";
import { useCharacter } from "../../hooks/useCharacter";

interface CharacterSelectProps {
  id: string;
}

/** An Asynchronous searchable select element that utilizes the react-select library.
 * It has been customized to only search and display the results when the search has got 3 or more characters entered.
 *
 * Currently only being used to search based on the API service created within the application.
 *
 * @returns {JSX.Element} A custom select element
 */
const AsyncSelectCharacter: FC<CharacterSelectProps> = ({ id }) => {
  const { selectedCharacter, setSelectedCharacter } = useCharacter();
  const promiseCharacters = (inputValue: string) => {
    if (inputValue.length <= 2) return Promise.resolve([] as CharacterOption[]);

    return new Promise<CharacterOption[]>((resolve) => {
      resolve(searchCharacter(inputValue));
    });
  };

  return (
    <AsyncSelect
      id={id}
      cacheOptions
      loadOptions={promiseCharacters}
      value={{ value: selectedCharacter.url, label: selectedCharacter.name }}
      onChange={(selectedOption) =>
        setSelectedCharacter({
          url: selectedOption?.value ?? "",
          name: selectedOption?.label ?? "",
        })
      }
    />
  );
};

export default AsyncSelectCharacter;
