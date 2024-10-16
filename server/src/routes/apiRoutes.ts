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
      this.charactersController.searchForCharacter.bind(
        this.charactersController
      )
    );
    this.router.post(
      "/characters",
      this.charactersController.compareCharacters.bind(
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
