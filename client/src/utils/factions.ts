export const FACTIONS = {
  jedi: {
    characters: [
      "Luke Skywalker",
      "Qui-Gon Jinn",
      "Mace Windu",
      "Yoda",
      "Obi-Wan Kenobi",
      "Anakin Skywalker", 
      "Aayla Secura",
      "Ki-Adi-Mundi",
      "Kit Fisto",
      "Eeth Koth",
      "Adi Gallia",
      "Saesee Tiin",
      "Yarael Poof",
      "Plo Koon",
      "Luminara Unduli",
      "Barriss Offee",
    ],
  },
  sith: {
    characters: [
      "Darth Vader",
      "Palpatine", 
      "Darth Maul",
      "Count Dooku", 
    ],
  },
  empire: {
    characters: [
      "Wilhuff Tarkin",
      "Boba Fett",
      "IG-88",
      "Bossk",
      "Jango Fett",
      "Zam Wesell",
      "Poggle the Lesser",
      "Wat Tambor",
      "San Hill",
      "Sly Moore",
      "Tion Medon",
    ],
  },
  rebels: {
    characters: [
      "Leia Organa",
      "Han Solo",
      "Chewbacca",
      "Wedge Antilles",
      "Jek Tono Porkins",
      "Biggs Darklighter",
      "Lando Calrissian",
      "Lobot",
      "Nien Nunb",
      "Wicket Systri Warrick",
      "Arvel Crynyd",
      "Ackbar",
      "Mon Mothma",
    ],
  },
  bountyHunters: {
    characters: [
      "Greedo",
      "Jabba Desilijic Tiure",
      "Bib Fortuna",
      "Sebulba",
      "Watto",
      "Ben Quadinaros",
      "Gasgano",
      "Dud Bolt",
      "Nute Gunray",
    ],
  },
  separatists: {
    characters: [
      "General Grievous",
      "Count Dooku",
      "Nute Gunray",
      "Wat Tambor",
      "Poggle the Lesser",
    ],
  },
  droids: {
    characters: ["C-3PO", "R2-D2", "R5-D4", "R4-P17"],
  },
  tatooineCitizens: {
    characters: ["Owen Lars", "Beru Whitesun Lars", "Shmi Skywalker"],
  },
};


export const formatFactionName = (name: string) => {
  const camelCaseName = name
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      return index < 2
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.toLowerCase();
    })
    .join(" ");

  return camelCaseName;
};