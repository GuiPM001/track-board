import React, { useContext, useEffect, useState } from 'react';
import { Playlist } from '../../interfaces/Playlist';
import './style.scss';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import { SnackbarContext } from '../../providers/SnackbarProvider';
import playlistService from '../../services/Spotify/Playlist';

function Playlists() {
  const [loading, setLoading] = useState<boolean>();
  const [playlists, setPlaylists] = useState<Playlist[]>();
  
  const { openSnackbar } = useContext(SnackbarContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    playlistService.getPlaylists()
      .then((response) => {
        setPlaylists(response.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((e) => {
        openSnackbar(`Error fetching playlists: ${e}`, 'error');
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  function goToPlaylist(playlist: Playlist) {
    navigate(`/playlist/${playlist.id}`);
  }

  if (loading)
    return <Loading />

  return (
    <div className='page_container'>
      <ul className='list'>
        {playlists?.map((playlist) => 
          <li 
            onClick={() => goToPlaylist(playlist)}
            className='list_item'
            key={playlist.id}
          >
            <img src={playlist?.images[0]?.url} className='playlist_image'/> 
            <div className='playlist_details'>
              <span className='playlist_name'>{playlist.name}</span>
              <span className='playlist_tracks'>Total songs: {playlist.tracks.total}</span>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Playlists;