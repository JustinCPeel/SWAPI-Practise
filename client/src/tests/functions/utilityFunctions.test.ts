import {
  DESCRIPTIONS,
  getCharacterDescriptionText,
} from "../../utils/description";
import { formatFactionName } from "../../utils/factions";

describe("formatFactionName", () => {
  it("should format a camelCase name correctly", () => {
    const result = formatFactionName("GalacticEmpire");
    expect(result).toBe("Galactic Empire");
  });

  it("should handle names with multiple camel case words", () => {
    const result = formatFactionName("FirstOrderSupremeLeader");
    expect(result).toBe("First Order supreme leader");
  });

  it("should handle already formatted names", () => {
    const result = formatFactionName("Rebel Alliance");
    expect(result).toBe("Rebel Alliance");
  });

  it("should format single-word names correctly", () => {
    const result = formatFactionName("Resistance");
    expect(result).toBe("Resistance");
  });

  it("should format long faction names with only the first two words in title case", () => {
    const result = formatFactionName("SeparatistAllianceDroidArmy");
    expect(result).toBe("Separatist Alliance droid army");
  });

  it("should handle names with spaces correctly", () => {
    const result = formatFactionName("  MandalorianTribe  ");
    expect(result).toBe("Mandalorian Tribe");
  });
});

describe("getCharacterDescriptionText", () => {
  it("should return the correct description for an existing character", () => {
    const characterName = "Luke Skywalker";
    const expectedDescription = DESCRIPTIONS[characterName];

    const result = getCharacterDescriptionText(characterName);

    expect(result).toEqual(expectedDescription);
  });

  it("should return the default description for a non-existent character", () => {
    const characterName = "NonExistentCharacter";

    const result = getCharacterDescriptionText(characterName);

    expect(result).toEqual({
      quote: "The force is not with you, you padawan",
      description:
        "The name does not match any details we currently have in memory, but we are sure he/she is great",
    });
  });

  it("should handle different casing in character names", () => {
    const characterName = "luke Skywalker";

    const expectedDescription = DESCRIPTIONS["Luke Skywalker"];

    const result = getCharacterDescriptionText(characterName);

    expect(result).toEqual(expectedDescription);
  });

  it("should handle an empty string as character name", () => {
    const characterName = "";

    const result = getCharacterDescriptionText(characterName);

    expect(result).toEqual({
      quote: "The force is not with you, you padawan",
      description:
        "The name does not match any details we currently have in memory, but we are sure he/she is great",
    });
  });
});
