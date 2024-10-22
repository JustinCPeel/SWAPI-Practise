import { Request, Response } from "express";
import { beforeEach, describe, it, expect } from "@jest/globals";
import { CharactersController } from "../controllers/characters";
import { SwapiCharResponse } from "../dto/responses/charactersResponses";
import { CharacterService } from "../services/characterService";

jest.mock("../services/characterService");

describe("CharactersController", () => {
  let charactersController: CharactersController;
  let mockCharacterService: jest.Mocked<CharacterService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    charactersController = new CharactersController();
    mockCharacterService =
      CharacterService.prototype as jest.Mocked<CharacterService>;

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("searchForCharacter", () => {
    it("Should return status 200 with valid data", async () => {
      const mockData = [
        {
          name: "Luke Skywalker",
          height: "172",
          mass: "77",
          hair_color: "blond",
          skin_color: "fair",
          eye_color: "blue",
          birth_year: "19BBY",
          gender: "Male",
          homeworld: "https://swapi.dev/api/planets/1/",
          films: [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/6/",
          ],
          species: [],
          vehicles: [
            "https://swapi.dev/api/vehicles/14/",
            "https://swapi.dev/api/vehicles/30/",
          ],
          starships: [
            "https://swapi.dev/api/starships/12/",
            "https://swapi.dev/api/starships/22/",
          ],
          created: "2014-12-09T13:50:51.644000Z",
          edited: "2014-12-20T21:17:56.891000Z",
          url: "https://swapi.dev/api/people/1/",
        },
        {
          name: "Anakin Skywalker",
          height: "188",
          mass: "84",
          hair_color: "blond",
          skin_color: "fair",
          eye_color: "blue",
          birth_year: "41.9BBY",
          gender: "male",
          homeworld: "Tatooine",
          films: [
            "https://swapi.dev/api/films/4/",
            "https://swapi.dev/api/films/5/",
            "https://swapi.dev/api/films/6/",
          ],
          species: [],
          vehicles: [
            "https://swapi.dev/api/vehicles/44/",
            "https://swapi.dev/api/vehicles/46/",
          ],
          starships: [
            "https://swapi.dev/api/starships/39/",
            "https://swapi.dev/api/starships/59/",
            "https://swapi.dev/api/starships/65/",
          ],
          created: "2014-12-10T16:20:44.310000Z",
          edited: "2014-12-20T21:17:50.327000Z",
          url: "https://swapi.dev/api/people/11/",
        },
      ] as SwapiCharResponse[];
      mockCharacterService.searchCharactersByTerm.mockResolvedValue(mockData);
      req.query = { search: "Skywalker" };

      await charactersController.searchForCharacter(
        req as Request,
        res as Response
      );

      expect(mockCharacterService.searchCharactersByTerm).toHaveBeenCalledWith(
        "Skywalker"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("Should return status 500 on error", async () => {
      const mockError = new Error("Service failure");
      mockCharacterService.searchCharactersByTerm.mockRejectedValue(mockError);
      req.query = { search: "Skywalker" };

      await charactersController.searchForCharacter(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching data",
        error: mockError.message,
      });
    });
  });

  describe("fetchCharacterFor", () => {
    it("Should return status 200 and data", async () => {
      const mockData: SwapiCharResponse = {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "Male",
        homeworld: "https://swapi.dev/api/planets/1/",
        films: [
          "https://swapi.dev/api/films/1/",
          "https://swapi.dev/api/films/2/",
          "https://swapi.dev/api/films/3/",
          "https://swapi.dev/api/films/6/",
        ],
        species: [],
        vehicles: [
          "https://swapi.dev/api/vehicles/14/",
          "https://swapi.dev/api/vehicles/30/",
        ],
        starships: [
          "https://swapi.dev/api/starships/12/",
          "https://swapi.dev/api/starships/22/",
        ],
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
        url: "https://swapi.dev/api/people/1/",
      };
      req.query = { url: encodeURIComponent("https://character.url") };
      mockCharacterService.fetchCharacterForUrl.mockResolvedValue(mockData);

      await charactersController.fetchCharacterFor(
        req as Request,
        res as Response
      );

      expect(mockCharacterService.fetchCharacterForUrl).toHaveBeenCalledWith({
        url: "https://character.url",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("Should return status 500 on service error", async () => {
      const mockError = new Error("Service failure");
      req.query = { url: encodeURIComponent("https://character.url") };
      mockCharacterService.fetchCharacterForUrl.mockRejectedValue(mockError);

      await charactersController.fetchCharacterFor(
        req as Request,
        res as Response
      );

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching data",
        error: mockError.message,
      });
    });

    it("Should return status 500 if URL is missing", async () => {
      req.query = {};

      await charactersController.fetchCharacterFor(
        req as Request,
        res as Response
      );

      expect(mockCharacterService.fetchCharacterForUrl).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching data",
        error: expect.any(String),
      });
    });
  });

  describe("compareCharacters", () => {
    it("Should return status 200 and comparison data", async () => {
      const mockData = {
        name: {
          primary: "Anakin Skywalker",
          secondary: "Luke Skywalker",
        },
        birth_year: {
          primary: "41.9BBY",
          secondary: "19BBY",
          descritpion:
            "The age difference between Anakin Skywalker (born in 41.9BBY) and Luke Skywalker (born in 19BBY) is 22 years.",
        },
        mass: {
          primary: "84",
          secondary: "77",
          descritpion:
            "Anakin Skywalker has a greater mass than Luke Skywalker. The mass difference is 7 units.",
        },
        height: {
          primary: "188",
          secondary: "172",
          descritpion:
            "Anakin Skywalker is taller than Luke Skywalker. The height difference is 16 units.",
        },
        gender: {
          primary: "male",
          secondary: "male",
          descritpion:
            "We can not compare the gender of characters, as it is a personal preference.",
        },
        eye_color: {
          primary: "blue",
          secondary: "blue",
          descritpion:
            "We can not compare the eye colour of characters, as it is a personal preference.",
        },
        hair_color: {
          primary: "blond",
          secondary: "blond",
          descritpion:
            "We can not compare the hair colour of characters, as it is a personal preference.",
        },
        skin_color: {
          primary: "fair",
          secondary: "fair",
          descritpion:
            "We can not compare the skin colour of characters, as it is a personal preference.",
        },
        homeworld: {
          primary: "Tatooine",
          secondary: "Tatooine",
        },
        films: {
          primary: "3",
          secondary: "4",
          descritpion: "There is a difference of 1 in film appearances",
        },
      };
      req.body = {
        primary: "https://character1.url",
        secondary: "https://character2.url",
      };

      mockCharacterService.compareCharactersForUrls.mockResolvedValue(mockData);

      await charactersController.compareCharacters(
        req as Request,
        res as Response
      );

      expect(
        mockCharacterService.compareCharactersForUrls
      ).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("Should return status 400 if primary or secondary is missing", async () => {
      req.body = {}; // Missing primary and secondary

      await charactersController.compareCharacters(
        req as Request,
        res as Response
      );

      expect(
        mockCharacterService.compareCharactersForUrls
      ).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching data",
        error: "Both primary and secondary URLs must be provided.",
      });
    });
  });
});
