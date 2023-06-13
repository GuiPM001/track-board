import React, { useEffect, useState } from 'react';
import { createPlaylist, getRecomendations, getTopTracks } from '../../services/Spotify';
import Loading from '../../components/Loading';
import './style.scss';
import { Track } from '../../interfaces/Track';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Tracks() {
  const [loading, setLoading] = useState<boolean>();
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [recomendations, setRecomendations] = useState<Track[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    
    getTopTracks()
      .then((response) => {
        setTopTracks(response);
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  function fetchRecomendations() {
    setLoading(true);

    let tracksIds = topTracks.map(t => t.id);

    getRecomendations(tracksIds)
      .then((response) => {
        setRecomendations(response);
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  function addNewPlaylist() {
    setLoading(true);

    let tracksIds = recomendations.map(r => r.id);

    createPlaylist(tracksIds)
      .then((response) => {
        navigate(`/playlist/${response.id}`)
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <div className='tracks_container'>
      {loading && <Loading />}

      {topTracks.length != 0 && 
        <>
          <ul className='list'>
            {topTracks.map((track, index) => 
              <li 
                className='list_item' 
                key={track.id}
              >
                <span className='track_index'>{index + 1}</span>
                <img src={track.album.images[1].url} className='track_image'/> 
                <div className='track_details'>
                  <span className='track_name'>{track.name}</span>
                  <span className='track_album'>{track.artists.map(artist => artist.name).join(', ')}</span>
                </div>
              </li>
            )}
          </ul>

          <div className='container_button'>
            <Button 
              variant='contained'
              className='btnRecomendations'
              onClick={fetchRecomendations}
            >
              Get recomendations
            </Button>
          </div>
          
          {/* TODO: abrir modal com recomendações, adicionar a nova playlist
                se adicionado, redirecionar para nova playlist */}
          {recomendations.length !== 0 &&
            <>
              <ul className='recomendation_list'>
                {recomendations.map(track => 
                  <li 
                  className='list_item' 
                  key={track.id}
                  >
                    <img src={track.album.images[1].url} className='recomendation_image'/>
                    <div>
                      <span className='track_name'>{track.name}</span>
                      <span className='track_album'>{track.artists.map(artist => artist.name).join(', ')}</span>
                    </div>
                  </li>
                )}
              </ul>

              <Button 
                variant='contained'
                className='btnRecomendations'
                onClick={addNewPlaylist}
              >
                + Add to a new playlist
              </Button>
            </>
          }
        </>
      }
    </div>
  )
}

export default Tracks;