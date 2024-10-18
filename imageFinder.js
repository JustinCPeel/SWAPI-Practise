const axios = require("axios");
const stringSimilarity = require("string-similarity");

const SIMILARITY_THRESHOLD = 0.8;

async function fetchCharacterData() {
  try {
    const akababResponse = await axios.get(
      "https://akabab.github.io/starwars-api/api/all.json"
    );
    const akababCharacters = akababResponse.data;

    const swapiResponse = await axios.get("https://swapi.dev/api/people/");
    const swapiCharacters = swapiResponse.data.results;

    return { akababCharacters, swapiCharacters };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function normalizeName(name) {
  return name.toLowerCase().trim();
}

function matchNames(akababCharacters, swapiCharacters) {
  const matches = [];

  akababCharacters.forEach((akababChar) => {
    const akababName = normalizeName(akababChar.name);

    const swapiNames = swapiCharacters.map((char) => normalizeName(char.name));
    const bestMatch = stringSimilarity.findBestMatch(akababName, swapiNames);

    if (bestMatch.bestMatch.rating >= SIMILARITY_THRESHOLD) {
      const bestSwapiMatch = bestMatch.bestMatch.target;

      const matchedSwapiChar = swapiCharacters.find(
        (char) => normalizeName(char.name) === bestSwapiMatch
      );

      matches.push({
        akababName: akababChar.name,
        akababImage: akababChar.image,
        swapiName: matchedSwapiChar.name,
      });
    } else {
      console.log(
        `No close match for Akabab Name: ${akababChar.name} (Best match was below threshold)`
      );
    }
  });

  return matches;
}

// Main function
async function main() {
  const { akababCharacters, swapiCharacters } = await fetchCharacterData();
  const matches = matchNames(akababCharacters, swapiCharacters);

  // Log the matches
  matches.forEach((match) => {
    console.log(`Akabab Name: ${match.akababName}`);
    console.log(`Image: ${match.akababImage}`);
    console.log(`Matched SWAPI Name: ${match.swapiName}`);
    console.log("-----------------------------------");
  });
}

main();
