import { Router } from "express";
import { CharactersController } from "../controllers/characters";
import { ApiRoutes } from "../routes/apiRoutes";
import { createRequest, createResponse } from "node-mocks-http";

jest.mock("../controllers/characters");

describe("ApiRoutes", () => {
  let apiRoutes: ApiRoutes;
  let mockRouter: jest.Mocked<Router>;
  let mockedController: jest.Mocked<CharactersController>;

  beforeEach(() => {
    mockRouter = Router() as jest.Mocked<Router>;
    mockedController =
      new CharactersController() as jest.Mocked<CharactersController>;
    apiRoutes = new ApiRoutes();

    // making sure I am using the mock router to prevent actual calls being made.
    apiRoutes.router = mockRouter;
    apiRoutes["charactersController"] = mockedController;
  });

  it("correct routes should be set up", () => {
    // setting up spy's on the router methods
    const getSpy = jest.spyOn(apiRoutes.router, "get");
    const postSpy = jest.spyOn(apiRoutes.router, "post");

    // Re-bind the routes routes
    apiRoutes["routes"]();

    // validate that the GET and POST routes are set up correctly
    expect(getSpy).toHaveBeenCalledWith("/characters", expect.any(Function));
    expect(postSpy).toHaveBeenCalledWith("/characters", expect.any(Function));
    expect(getSpy).toHaveBeenCalledWith(
      "/characters/selected",
      expect.any(Function)
    );
  });

  it("should call CharactersController.searchForCharacter for GET /characters", () => {
    const getSpy = jest.spyOn(apiRoutes.router, "get");
    apiRoutes["routes"]();

    // Simulate a route call using mock request and response
    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    const [_, searchForCharacterHandler] = getSpy.mock.calls[0];
    searchForCharacterHandler(req, res, next);

    expect(mockedController.searchForCharacter).toHaveBeenCalled();
  });

  it("should call CharactersController.compareCharacters for POST /characters", () => {
    const postSpy = jest.spyOn(apiRoutes.router, "post");
    apiRoutes["routes"]();

    // Simulate a route call using mock request and response
    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    const [_, searchForCharacterHandler] = postSpy.mock.calls[0];
    searchForCharacterHandler(req, res, next);

    expect(mockedController.compareCharacters).toHaveBeenCalled();
  });

  it("should call CharactersController.fetchCharacterFor for GET /characters/selected", () => {
    const getSpy = jest.spyOn(apiRoutes.router, "get");
    apiRoutes["routes"]();

    // Simulate a route call using mock request and response
    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    // Access the third route handler (for /characters/selected) []<- the index of the test in the mocks
    
    const [_, fetchCharacterForHandler] = getSpy.mock.calls[1];
    fetchCharacterForHandler(req, res, next);

    expect(mockedController.fetchCharacterFor).toHaveBeenCalled();
  });
});
