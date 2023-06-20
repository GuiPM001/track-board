import React, { useEffect, useState } from 'react';
import { createPlaylist, getRecomendations, getTopTracks } from '../../services/Spotify';
import Loading from '../../components/Loading';
import TracksContainer from './TracksContainer';
import RecomendationsContainer from './RecomendationsContainer';
import { useNavigate } from 'react-router-dom';
import { Track } from '../../interfaces/Track';
import './style.scss';

function Tracks() {
  const [loading, setLoading] = useState<boolean>(false);
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
      });
  }, []);

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
      });
  }

  function addNewPlaylist() {
    setLoading(true);

    let tracksIds = recomendations.map(r => r.id);

    createPlaylist(tracksIds)
      .then((response) => {
        navigate(`/playlist/${response.id}`);
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading)
    return <Loading />;

  return (
    <div className='page_container'>
      {topTracks.length !== 0 && (
        <TracksContainer
          topTracks={topTracks}
          onFetchRecomendations={fetchRecomendations}
        />
      )}

      {recomendations.length !== 0 && (
        <RecomendationsContainer
          recomendations={recomendations}
          onAddNewPlaylist={addNewPlaylist}
        />
      )}
    </div>
  );
}

export default Tracks;