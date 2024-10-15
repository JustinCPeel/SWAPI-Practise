import axios from "axios";

export class UnsplashService {
  private apiUrl: string;
  private accessKey: string;
  constructor() {
    this.accessKey = process.env.UNSPLASH_ACCESS_KEY ?? "";
    this.apiUrl = `https://api.unsplash.com/search/photos`;
  }

  public async fetchImageForCharacterNameAsync(
    characterName: string
  ): Promise<string> {
    try {
      const result = await axios.get<any>(this.apiUrl, {
        params: {
          query: `star wars ${characterName}`,
          client_id: this.accessKey,
        },
      });

      return (result.data.results[0]?.urls?.regular as string) ?? "";
    } catch (error) {
      throw error;
    }
  }
}
