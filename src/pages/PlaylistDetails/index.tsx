import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Playlist } from '../../interfaces/Playlist';
import { getPlaylist } from '../../services/Spotify';
import Loading from '../../components/Loading';
import Playbar from '../../components/Playbar';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import './style.scss';
import IconButton from '@mui/material/IconButton';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { SnackbarContext } from '../../providers/SnackbarProvider';

function PlaylistDetails() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<Playlist>();
  const [loading, setLoading] = useState<boolean>(false);
  const [playing, setPlaying] = useState<string>('');
  
  const { openSnackbar } = useContext(SnackbarContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    getPlaylist(id!)
      .then((response) => {
        console.log(response)
        setPlaylist(response);
        setPlaying(response.tracks.items[0].track.id);
      })
      .catch((e) => {
        openSnackbar(`Error fetching playlist: ${e}`, 'error');
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  if (loading)
    return <Loading />

  return (
    <div className='container_details'>
      <div className='overview'>
        <IconButton className='back_button' aria-label='Back' onClick={() => navigate('/playlists')}>
          <ArrowBackIosRoundedIcon />
        </IconButton>

        <div className='emphasis'>
          <img src={playlist?.images[0].url} alt='' />
          <span className='playlist_name'>{playlist?.name}</span>
        </div>

        <div className='details'>
          <p>Author: <span style={{paddingLeft: 5}}>{playlist?.owner.display_name}</span></p>
          <p><span style={{paddingRight: 5}}>{playlist?.tracks.total}</span> songs in total</p>
          {
            playlist?.public ?
              <p><PublicRoundedIcon /> Public</p> :
              <p><LockRoundedIcon /> Private</p>
          }
        </div>
      </div>

      <div className='tracks'>
        <h1 className='tracks_title'>Tracks</h1>
        <ul>
          {playlist?.tracks.items.map(item =>
            <li 
              key={item.track.id} 
              className='list_item' 
              onClick={() => setPlaying(item.track.id)}
            >
              <img src={item.track.album.images[1].url} alt='' />
              <div className='track_details'>
                <span className='name'>{item.track.name}</span>
                <span className='artists'>{item.track.artists.map(artist => artist.name).join(', ')}</span>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className='playbar_container'>
          <Playbar trackId={playing} />
        </div>
    </div>
  )
}

export default PlaylistDetails;