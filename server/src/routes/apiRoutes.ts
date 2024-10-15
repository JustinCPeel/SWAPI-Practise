import { Router } from "express";
import { CharactersController } from "../controllers/characters";

export class ApiRoutes {
  public router: Router;
  private charactersController: CharactersController;

  constructor() {
    this.router = Router();
    this.charactersController = new CharactersController();
    this.routes();
  }

  private routes(): void {
    this.router.get(
      "/characters",
      this.charactersController.fetchListCharacters.bind(
        this.charactersController
      )
    );
    this.router.get(
      "/characters/selected",
      this.charactersController.fetchCharacterFor.bind(
        this.charactersController
      )
    );
  }
}
