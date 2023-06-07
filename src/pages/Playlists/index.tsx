import React, { useEffect, useState } from 'react';
import { Playlist } from '../../interfaces/Playlist';
import { getPlaylists } from '../../services/Spotify';
import ModalPlaylist, { ModalPlaylistProps } from '../../components/ModalPlaylist';
import './style.scss';
import Loading from '../../components/Loading';

function Playlists() {
  const [loading, setLoading] = useState<boolean>();
  const [playlists, setPlaylists] = useState<Playlist[]>();
  const [modal, setModal] = useState<ModalPlaylistProps>({
    playlist: null,
    isOpen: false
  });

  useEffect(() => {
    setLoading(true);

    getPlaylists()
      .then((response) => {
        setPlaylists(response.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  function openModal(playlist: Playlist) {
    setModal({ isOpen: true, playlist: playlist});
  }

  function closeModal() {
    setModal({ isOpen: false });
  }

  return (
    <>
      <div className='playlist_container'>
        {loading && <Loading />}
        <ul className='list'>
          {playlists?.map((playlist) => 
            <li 
            onClick={() => openModal(playlist)}
              className='list_item'
              key={playlist.id}
            >
              <img src={playlist.images[0].url} className='playlist_image'/> 
              <div>
                <span className='playlist_name'>{playlist.name}</span>
                <span className='playlist_tracks'>Total songs: {playlist.tracks.total}</span>
              </div>
            </li>
          )}
        </ul>
      </div>

      {modal.isOpen && 
        <div className="modal">
          <ModalPlaylist isOpen={modal.isOpen} playlist={modal.playlist} closeModal={closeModal}/>
        </div>
      }
    </>
    
  )
}

export default Playlists;