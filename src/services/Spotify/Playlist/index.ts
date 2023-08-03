import { fetchApi } from "..";
import { Playlist } from "../../../interfaces/Playlist";
import profileService from "../Profile";


async function getPlaylists(): Promise<Playlist[]> {
  let response = await fetchApi(
    'me/playlists',
    'GET'
  );

  return response.data.items;
} 

async function getPlaylist(playlistId: string): Promise<Playlist> {
  let response = await fetchApi(
    `playlists/${playlistId}`,
    'GET'
  );

  return response.data;
}

async function createPlaylist(tracksIds: string[]): Promise<Playlist> {
  const tracksUri = tracksIds.map(id => `spotify:track:${id}`);
  const user = await profileService.getProfile();

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

const playlistService = {
  getPlaylists,
  getPlaylist,
  createPlaylist
}

export default playlistService;