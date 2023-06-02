import axios from "axios";
import { UserProfile } from "../../interfaces/UserProfile";
import { getAccessToken } from "../Auth";
import { Track } from "../../interfaces/Track";

export async function getProfile(): Promise<UserProfile> {
  let response = await fetchApi('me', 'GET');

  return response.data;
}

export async function getTopTracks(): Promise<Track[]> {
  let response = await fetchApi(
    'me/top/tracks?time_range=short_term&limit=6', 
    'GET'
  );

  return response.data.items;
}

export async function getRecomendations(tracksIds: string[]): Promise<Track[]> {
  let response = await fetchApi(
    `recommendations?limit=10&seed_tracks=${tracksIds.slice(0, 5).join(',')}`, 
    'GET'
  );

  return response.data.tracks;
}

async function fetchApi(endpoint: string, method: string) {
  var accessToken = getAccessToken();

  let response = await axios(`https://api.spotify.com/v1/${endpoint}`, {
    method: method,
    headers: { Authorization: `Bearer ${accessToken}`}
  });

  return response;
}