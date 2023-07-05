import React from 'react';
import { Track } from '../../../interfaces/Track';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import './style.scss';
import { Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
import { theme } from '../../../styles/theme';
import TrackItem from '../TrackItem';

export interface ModalRecommendationsProps {
  recommendations: Track[];
  onAddNewPlaylist?: () => void;
  closeModal?: () => void;
  isOpen: boolean
}

function ModalRecommendations(props: ModalRecommendationsProps) {
  const { recommendations, onAddNewPlaylist, closeModal, isOpen } = props;

  return (
    <Dialog 
      onClose={closeModal} 
      open={isOpen} 
      className='dialog'
      maxWidth='md'
    >
      <DialogTitle className='header'>
        <h1 className='title'>Recommendations</h1>

        <IconButton onClick={closeModal} className='close_button'>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent className='content'>
        <ul className='recommendation_list'>
          {recommendations.map(track => (
            <TrackItem track={track} />
          ))}
        </ul>
      </DialogContent>

      <DialogActions className='actions'>
        <Button
          variant='contained'
          className='btn_add'
          onClick={onAddNewPlaylist}
        >
          Create Playlist
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalRecommendations;