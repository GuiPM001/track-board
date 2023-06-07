import React, { useEffect, useState } from 'react';
import './style.scss';
import { getPlaylistTracks } from '../../services/Spotify';
import { Track } from '../../interfaces/Track';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import { Playlist } from '../../interfaces/Playlist';

export interface ModalPlaylistProps {
  isOpen: boolean,
  playlist?: Playlist | null,
  closeModal?: () => void
}

function ModalPlaylist({ playlist, isOpen, closeModal }: ModalPlaylistProps) {
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>()
  
  useEffect(() => {
    getPlaylistTracks(playlist?.id!)
      .then((response) => {
        setPlaylistTracks(response.sort((a, b) => a.name.localeCompare(b.name)));
      })
  }, []);

  return (
    <>
      <div className='modal_container'>
        <IconButton onClick={closeModal} className='close_button'>
          <CloseRoundedIcon />
        </IconButton>
        <iframe
          title="Spotify Embed: Recommendation Playlist "
          src={`https://open.spotify.com/embed/playlist/${playlist?.id}?utm_source=generator&theme=0`}
          width="100%"
          height="100%"
          style={{ minHeight: '360px', border: 'none' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>
    </>
  )
}

export default ModalPlaylist;