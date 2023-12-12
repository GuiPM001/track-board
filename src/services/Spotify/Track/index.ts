import { fetchApi } from "..";
import { RecentlyPlayed } from "../../../interfaces/RecentlyPlayed";
import { Track } from "../../../interfaces/Track";

async function getTopTracks(): Promise<Track[]> {
  let response = await fetchApi(
    'me/top/tracks?time_range=short_term&limit=16', 
    'GET'
  );

  return response.data.items;
}

async function getRecommendations(tracksIdss?: string[]): Promise<Track[]> {
  const tracks = await fetchApi(
    'me/top/tracks?time_range=short_term&limit=16', 
    'GET'
  );

    const tracksIds = tracks.data.items.map((t: Track) => t.id);

  let response = await fetchApi(
    `recommendations?limit=16&seed_tracks=${tracksIds.slice(0, 5).join(',')}`, 
    'GET'
  );

  return response.data.tracks;
}

async function getRecentlyPlayed(limit: number, before?: string | null): Promise<RecentlyPlayed> {
  let url = before ? `me/player/recently-played?limit=${limit}&before=${before}` : `me/player/recently-played?limit=${limit}`
  let response = await fetchApi(
    url, 
    'GET'
  );

  return response.data;
}

const trackService = {
  getTopTracks,
  getRecommendations,
  getRecentlyPlayed
}

export default trackService;