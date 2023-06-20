import React from 'react';
import { Track } from '../../interfaces/Track';
import '../sharedStyles.scss';
import './style.scss';

interface TrackItemProps {
  track: Track;
  index: number;
}

function TrackItem(props: TrackItemProps) {
  const { track, index } = props;

  return (
    <li className='list_item' key={track.id}>
      <span className='track_index'>{index + 1}</span>
      <img src={track.album.images[1].url} className='track_image'/>
      <div className='track_details'>
        <span className='name'>{track.name}</span>
        <span className='artists'>{track.artists.map(artist => artist.name).join(', ')}</span>
      </div>
    </li>
  );
}

export default TrackItem;