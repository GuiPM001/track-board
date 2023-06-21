import React from 'react';
import { Track } from '../../../interfaces/Track';
import Button from '@mui/material/Button';
import RecomendationItem from './RecomendationItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import './style.scss';

export interface ModalRecomendationsProps {
  recomendations: Track[];
  onAddNewPlaylist?: () => void;
  closeModal?: () => void;
  isOpen: boolean
}

function ModalRecomendations(props: ModalRecomendationsProps) {
  const { recomendations, onAddNewPlaylist, closeModal } = props;

  return (
    <div className='recomendation_container'>
      <div className='content'>

        <div className='header'>
          <h1>Recommendations</h1>

          <IconButton onClick={closeModal} className='close_button'>
            <CloseRoundedIcon />
          </IconButton>
        </div>
        
        <ul className='recomendation_list'>
          {recomendations.map(track => (
            <RecomendationItem track={track} />
          ))}
        </ul>

        <div className='container_button'>
          <Button
            variant='contained'
            className='btnRecomendations'
            onClick={onAddNewPlaylist}
          >
            + Add to a new playlist
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalRecomendations;