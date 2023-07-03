import axios from "axios";
import { UserProfile } from "../../interfaces/UserProfile";
import authService from "../Auth";
import { Track } from "../../interfaces/Track";
import { Playlist } from "../../interfaces/Playlist";
import { Artist } from "../../interfaces/Artist";

async function fetchApi(endpoint: string, method: string, body?: any) {
  var accessToken = authService.getAccessToken();

  let response = await axios(`https://api.spotify.com/v1/${endpoint}`, {
    method: method,
    headers: { Authorization: `Bearer ${accessToken}`},
    data: JSON.stringify(body)
  });

  return response;
}

export async function getProfile(): Promise<UserProfile> {
  let response = await fetchApi('me', 'GET');

  return response.data;
}

export async function getTopTracks(): Promise<Track[]> {
  let response = await fetchApi(
    'me/top/tracks?time_range=short_term&limit=10', 
    'GET'
  );

  return response.data.items;
}

export async function getFollowArtists(): Promise<Artist[]> {
  let response = await fetchApi(
    'me/following?type=artist&limit=14',
    'GET'
  );

  return response.data.artists.items;
}

export async function getRecommendations(tracksIds: string[]): Promise<Track[]> {
  let response = await fetchApi(
    `recommendations?limit=10&seed_tracks=${tracksIds.slice(0, 5).join(',')}`, 
    'GET'
  );

  return response.data.tracks;
}

export async function getPlaylists(): Promise<Playlist[]> {
  let response = await fetchApi(
    'me/playlists',
    'GET'
  );

  return response.data.items;
} 

export async function getPlaylist(playlistId: string): Promise<Playlist> {
  let response = await fetchApi(
    `playlists/${playlistId}`,
    'GET'
  );

  return response.data;
}

export async function createPlaylist(tracksIds: string[]): Promise<Playlist> {
  const tracksUri = tracksIds.map(id => `spotify:track:${id}`);
  const user = await getProfile();

  const playlist = await fetchApi(`users/${user.id}/playlists`, 'POST', {
    "name": "My recommendation playlist",
    "description": "Playlist created by the tutorial on developer.spotify.com",
    "public": false
  });

  await fetchApi(
    `playlists/${playlist.data.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  )
  return playlist.data;
}