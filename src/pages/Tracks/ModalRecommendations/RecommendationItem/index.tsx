import React from 'react';
import { Track } from '../../../../interfaces/Track';
import './style.scss';

interface RecommendationItemProps {
  track: Track;
}

function RecommendationItem(props: RecommendationItemProps) {
  const { track } = props;

  return (
    <li className='list_item' key={track.id}>
      <img src={track.album.images[1].url} className='recommendation_image' />
      <div className='track_details'>
        <span className='name'>{track.name}</span>
        <span className='artists'>{track.artists.map(artist => artist.name).join(', ')}</span>
      </div>
    </li>
  );
}

export default RecommendationItem;