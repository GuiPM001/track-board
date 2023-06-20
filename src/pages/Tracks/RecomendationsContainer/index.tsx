import React from 'react';
import { Track } from '../../../interfaces/Track';
import Button from '@mui/material/Button';
import RecomendationItem from '../../../components/RecomendationItem';
import './style.scss';

interface RecomendationsContainerProps {
  recomendations: Track[];
  onAddNewPlaylist: () => void;
}

function RecomendationsContainer(props: RecomendationsContainerProps) {
  const { recomendations, onAddNewPlaylist } = props;

  return (
    <>
      <ul className='recomendation_list'>
        {recomendations.map(track => (
          <RecomendationItem track={track} />
        ))}
      </ul>

      <Button
        variant='contained'
        className='btnRecomendations'
        onClick={onAddNewPlaylist}
      >
        + Add to a new playlist
      </Button>
    </>
  );
}

export default RecomendationsContainer;