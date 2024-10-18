import { Request, Response } from "express";
import { beforeEach, describe, it } from "node:test";
import { CharactersController } from "../controllers/characters";
import { SwapiCharResponse } from "../dto/responses/charactersResponses";
import { CharacterService } from "../services/characterService";

jest.mock("../services/characterService");

describe("CharactersController", () => {
  let charactersController: CharactersController;
  let mockCharacterService: jest.Mocked<CharacterService>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let status: jest.Mock;

  beforeEach(() => {
    charactersController = new CharactersController();
    mockCharacterService =
      CharacterService.prototype as jest.Mocked<CharacterService>;

    req = {};
    status = jest.fn().mockReturnThis();
    res = {
      status,
      json: jest.fn(),
    };
  });

  describe("searchForCharacter", () => {
    it("Should return a response of status 200 with data attached to the response", async () => {
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
          name: "C-3PO",
          height: "167",
          mass: "75",
          hair_color: "n/a",
          skin_color: "gold",
          eye_color: "yellow",
          birth_year: "112BBY",
          gender: "n/a",
          homeworld: "https://swapi.dev/api/planets/1/",
          films: [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/4/",
            "https://swapi.dev/api/films/5/",
            "https://swapi.dev/api/films/6/",
          ],
          species: ["https://swapi.dev/api/species/2/"],
          vehicles: [],
          starships: [],
          created: "2014-12-10T15:10:51.357000Z",
          edited: "2014-12-20T21:17:50.309000Z",
          url: "https://swapi.dev/api/people/2/",
        },
      ];

      mockCharacterService.searchCharactersByTerm.mockResolvedValue(mockData);

      await charactersController.searchForCharacter(
        req as Request,
        res as Response
      );

      expect(mockCharacterService.searchCharactersByTerm).toHaveBeenCalledTimes(
        1
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it("Should return a response of status 500 and an error message when searchForCharacterByTerm fails", async () => {
      const mockError = new Error("Service failure");
      mockCharacterService.searchCharactersByTerm.mockRejectedValue(mockError);

      await charactersController.searchForCharacter(
        req as Request,
        res as Response
      );

      expect(mockCharacterService.searchCharactersByTerm).toHaveBeenCalledTimes(
        1
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching data",
        error: mockError.message,
      });
    });
  });

  describe("fetchCharacterFor", () => {
    it("Should return a response of status 200 and data when fetchCharacterForUrl is successful", async () => {
      const mockData: SwapiCharResponse = {
        birth_year: "19 BBY",
        eye_color: "Blue",
        films: ["https://swapi.dev/api/films/1/"],
        gender: "Male",
        hair_color: "Blond",
        height: "172",
        homeworld: "https://swapi.dev/api/planets/1/",
        mass: "77",
        name: "Luke Skywalker",
        skin_color: "Fair",
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-10T13:52:43.172000Z",
        species: ["https://swapi.dev/api/species/1/"],
        starships: ["https://swapi.dev/api/starships/12/"],
        url: "https://swapi.dev/api/people/1/",
        vehicles: ["https://swapi.dev/api/vehicles/14/"],
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

    it("should return 500 and an error message when fetchCharacterForUrl fails", async () => {
      const mockError = new Error("Service failure");
      req.query = { url: encodeURIComponent("https://character.url") };
      mockCharacterService.fetchCharacterForUrl.mockRejectedValue(mockError);

      await charactersController.fetchCharacterFor(
        req as Request,
        res as Response
      );

      expect(mockCharacterService.fetchCharacterForUrl).toHaveBeenCalledWith({
        url: "https://character.url",
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching data",
        error: mockError.message,
      });
    });

    it("Should return a response of status 500 and an error message if url query is missing", async () => {
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
});
