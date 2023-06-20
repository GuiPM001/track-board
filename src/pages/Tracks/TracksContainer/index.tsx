import React from 'react';
import Button from '@mui/material/Button';
import { Track } from '../../../interfaces/Track';
import TrackItem from '../../../components/TrackItem';
import './style.scss';

interface TracksContainerProps {
  topTracks: Track[];
  onFetchRecomendations: () => void;
}

function TracksContainer(props: TracksContainerProps) {
  const { topTracks, onFetchRecomendations } = props;

  return (
    <div>
      <ul className='list'>
        {topTracks.map((track, index) => (
          <TrackItem track={track} index={index} />
        ))}
      </ul>

      <div className='container_button'>
        <Button
          variant='contained'
          className='btnRecomendations'
          onClick={onFetchRecomendations}
        >
          Get recommendations
        </Button>
      </div>
    </div>
  );
}

export default TracksContainer;