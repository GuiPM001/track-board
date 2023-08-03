import { fetchApi } from "..";
import { Track } from "../../../interfaces/Track";

async function getTopTracks(): Promise<Track[]> {
  let response = await fetchApi(
    'me/top/tracks?time_range=short_term&limit=10', 
    'GET'
  );

  return response.data.items;
}

async function getRecommendations(tracksIds: string[]): Promise<Track[]> {
  let response = await fetchApi(
    `recommendations?limit=10&seed_tracks=${tracksIds.slice(0, 5).join(',')}`, 
    'GET'
  );

  return response.data.tracks;
}

const trackService = {
  getTopTracks,
  getRecommendations
}

export default trackService;