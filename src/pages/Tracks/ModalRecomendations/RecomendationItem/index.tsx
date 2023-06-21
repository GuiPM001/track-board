import React from 'react';
import { Track } from '../../../../interfaces/Track';
import './style.scss';

interface RecomendationItemProps {
  track: Track;
}

function RecomendationItem(props: RecomendationItemProps) {
  const { track } = props;

  return (
    <li className='list_item' key={track.id}>
      <img src={track.album.images[1].url} className='recomendation_image' />
      <div className='track_details'>
        <span className='name'>{track.name}</span>
        <span className='artists'>{track.artists.map(artist => artist.name).join(', ')}</span>
      </div>
    </li>
  );
}

export default RecomendationItem;