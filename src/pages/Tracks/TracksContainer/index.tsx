import React from 'react';
import Button from '@mui/material/Button';
import { Track } from '../../../interfaces/Track';
import TrackItem from './TrackItem';
import './style.scss';

interface TracksContainerProps {
  topTracks: Track[];
  onFetchRecommendations: () => void;
}

function TracksContainer(props: TracksContainerProps) {
  const { topTracks, onFetchRecommendations } = props;

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
          className='btnRecommendations'
          onClick={onFetchRecommendations}
        >
          Get recommendations
        </Button>
      </div>
    </div>
  );
}

export default TracksContainer;