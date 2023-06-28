import React from 'react';
import { Track } from '../../../interfaces/Track';
import Button from '@mui/material/Button';
import RecommendationItem from './RecommendationItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import './style.scss';
import { Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
import { theme } from '../../../styles/theme';

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
            <RecommendationItem track={track} />
          ))}
        </ul>
      </DialogContent>

      <DialogActions className='actions'>
        <Button
          variant='contained'
          className='btnRecommendations'
          onClick={onAddNewPlaylist}
        >
          + Add to a new playlist
        </Button>
      </DialogActions>
    </Dialog>
    // <div className='recommendation_container'>
    //   <div className='content'>

    //     <div className='header'>
          // <h1>Recommendations</h1>

          // <IconButton onClick={closeModal} className='close_button'>
          //   <CloseRoundedIcon />
          // </IconButton>
    //     </div>
        
    //     <ul className='recommendation_list'>
    //       {recommendations.map(track => (
    //         <RecommendationItem track={track} />
    //       ))}
    //     </ul>

    //     <div className='container_button'>
    //       <Button
    //         variant='contained'
    //         className='btnRecommendations'
    //         onClick={onAddNewPlaylist}
    //       >
    //         + Add to a new playlist
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ModalRecommendations;