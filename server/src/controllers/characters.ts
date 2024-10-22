import { error } from "console";
import { CharacterService } from "../services/characterService";
import { Request, Response } from "express";
import { ComparisonRequest } from "../dto/requests/charactersRequests";

export class CharactersController {
  private characterService: CharacterService;

  constructor() {
    this.characterService = new CharacterService();
  }

  /**
   * Api Controller function that is being used to communicate with a service to fetch characters
   * based on a search term received from an external API Call
   */
  public async searchForCharacter(req: Request, res: Response): Promise<void> {
    try {
      const term = req.query.search as string;

      const data = await this.characterService.searchCharactersByTerm(term);
      res.status(200).json(data);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error fetching data", error: error.message });
    }
  }

  /**
   * Api Controller function is being used to fetch the most relevant information linked to a character based on the
   * unique URL on the original client payload.
   */
  public async fetchCharacterFor(req: Request, res: Response): Promise<void> {
    try {
      const url = req.query.url as string | undefined;
      if (!url || url === "" || url === "undefined") {
        throw new Error("There is no valid url connected");
      }

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

  /**
   * Api Controller function is being used to compare two characters bast on the
   * unique URLs on the original clients payload.
   */
  public async compareCharacters(req: Request, res: Response): Promise<void> {
    try {
      const comparisonObject = req.body as ComparisonRequest;

      if (!comparisonObject.primary || !comparisonObject.secondary) {
        res.status(400).json({
          message: "Error fetching data",
          error: "Both primary and secondary URLs must be provided.",
        });

        return;
      }

      const data = await this.characterService.compareCharactersForUrls(
        comparisonObject
      );
      res.status(200).json(data);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error fetching data", error: error.message });
    }
  }
}
