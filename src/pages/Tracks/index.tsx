import React, { useContext, useEffect, useState } from 'react';
import { createPlaylist, getRecomendations, getTopTracks } from '../../services/Spotify';
import Loading from '../../components/Loading';
import TracksContainer from './TracksContainer';
import ModalRecomendations, { ModalRecomendationsProps } from './ModalRecomendations';
import { useNavigate } from 'react-router-dom';
import { Track } from '../../interfaces/Track';
import './style.scss';
import { SnackbarContext } from '../../providers/SnackbarProvider';

function Tracks() {
  const [loading, setLoading] = useState<boolean>(false);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  const { openSnackbar } = useContext(SnackbarContext);

  const [modal, setModal] = useState<ModalRecomendationsProps>({
    isOpen: false,
    recomendations: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    
    getTopTracks()
      .then((response) => {
        setTopTracks(response);
      })
      .catch((e) => {
        openSnackbar(`Error fetching top tracks: ${e}`, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function fetchRecomendations() {
    let tracksIds = topTracks.map(t => t.id);

    getRecomendations(tracksIds)
      .then((response) => {
        setModal({ isOpen: true, recomendations: response })
      })
      .catch((e) => {
        openSnackbar(`Error fetching profile recommendations: ${e}`, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function addNewPlaylist() {
    setLoading(true);

    let tracksIds = modal.recomendations.map(r => r.id);

    createPlaylist(tracksIds)
      .then((response) => {
        navigate(`/playlist/${response.id}`);
      })
      .catch((e) => {
        openSnackbar(`Error creating playlist: ${e}`, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function closeModal() {
    setModal({ isOpen: false, recomendations: [] });
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

      {modal.isOpen && (
        <ModalRecomendations
          recomendations={modal.recomendations}
          onAddNewPlaylist={addNewPlaylist}
          isOpen={modal.isOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Tracks;