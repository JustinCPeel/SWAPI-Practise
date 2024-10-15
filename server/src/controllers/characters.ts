import { CharacterService } from "../services/characterService";
import { Request, Response } from "express";

export class CharactersController {
  private characterService: CharacterService;

  constructor() {
    this.characterService = new CharacterService();
  }

  public async fetchListCharacters(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.characterService.fetchAllCharacters();
      res.status(200).json(data);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error fetching data", error: error.message });
    }
  }

  public async fetchCharacterFor(req: Request, res: Response): Promise<void> {
    try {
      const url = req.query.url as string;

      const data = await this.characterService.fetchCharacterForUrl({
        url: decodeURIComponent(url),
      });
      res.status(200).json(data);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error fetching data", error: error.message });
    }
  }
}
