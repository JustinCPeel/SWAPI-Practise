import { FC, useEffect, useState } from "react";
import { Loader } from "../components/loader";
import useCharactersList from "../hooks/useCharactersList";
import Select from "react-select";
import { fetchCharacterForUrl } from "../services/api";

const Home: FC = () => {
  const { loading, characters } = useCharactersList();
  const [selected, setSelected] = useState<string>("");

  const handleStateChange = async (url: string) => {
    const encodedUrl = encodeURIComponent(url);
    setSelected(encodedUrl);
  };

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      const data = await fetchCharacterForUrl(selected);
    };

    if (selected !== "") fetchCharacterDetails();
  }, [selected]);

  return (
    <div className="starwars-container">
      {loading && <Loader />}
      <div className="grid-layout">
        <div>
          <Select
            options={characters.map((character) => ({
              label: character.name,
              value: character.url,
            }))}
            onChange={(e) => handleStateChange(e?.value ?? "")}
          />
        </div>
        <div>
          <Select
            options={characters.map((character) => ({
              label: character.name,
              value: character.url,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
