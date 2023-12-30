import { fetchApi } from "..";
import { Artist } from "../../../interfaces/Artist";

async function getFollowArtists(): Promise<Artist[]> {
  let response = await fetchApi(
    'me/following?type=artist&limit=50',
    'GET'
  );

  return response.data.artists.items;
}

const artistService = {
  getFollowArtists
}

export default artistService;