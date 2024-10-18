const axios = require("axios");
const stringSimilarity = require("string-similarity");
const path = require("path");
const fs = require("fs");

const SIMILARITY_THRESHOLD = 0.8;
const DOWNLOAD_FOLDER = "./download";

async function fetchCharacterDataFromBothApiServers() {
  try {
    const akabab = await axios.get(
      "https://akabab.github.io/starwars-api/api/all.json"
    );

    const swapiResponse = await axios.get("https://swapi.dev/api/people/");
    const maxCount = swapiResponse.data.count;
    const resultsPerPage = swapiResponse.data.results.length;
    const totalPages = Math.ceil(maxCount / resultsPerPage);

    const apiCalls = [];
    for (let i = 2; i < totalPages; i++) {
      apiCalls.push(
        axios.get("https://swapi.dev/api/people/", {
          params: { page: i },
        })
      );
    }
    const allResponses = await Promise.all(apiCalls);

    const swapiCharacters = allResponses.reduce((acc, response) => {
      return acc.concat(response.data.results);
    }, swapiResponse.data.results);

    return { akabab: akabab.data, swapi: swapiCharacters };
  } catch (error) {
    console.error("Error occurred while attempting to fetch data:", error);
    throw error;
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

      if (matchedSwapiChar) {
        matches.push({
          characterName: matchedSwapiChar.name,
          imageUrl: akababChar.image,
        });
      }
    } else {
      console.log(
        `No close match for Akabab Name: ${akababChar.name} (Best match was below threshold)`
      );
    }
  });

  return matches;
}

async function downloadImage(akababImage, filepath) {
  const writer = fs.createWriteStream(filepath);

  const response = await axios({
    url: akababImage,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function downloadCharacterImages(matches) {
  if (!fs.existsSync(DOWNLOAD_FOLDER)) {
    fs.mkdirSync(DOWNLOAD_FOLDER);
  }

  for (const matched of matches) {
    const fileName = `${matched.characterName}.webp`;
    const filepath = path.join(DOWNLOAD_FOLDER, fileName);

    try {
      await downloadImage(matched.imageUrl, filepath);
      console.log(`Downloaded: ${matched.characterName} -> ${filepath}`);
    } catch (error) {
      console.error(
        `Failed to download image for ${matched.characterName}:`,
        error
      );
    }
  }
}

async function main() {
  console.log("Fetching and downloading character images...");
  const { akabab, swapi } = await fetchCharacterDataFromBothApiServers();
  const matches = matchNames(akabab, swapi);

  await downloadCharacterImages(matches);
}

main();
