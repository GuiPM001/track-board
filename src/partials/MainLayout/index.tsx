import React from 'react';
import './style.scss';
import { NavLink, Outlet } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

function MainLayout() {
  return (
    <div className='container'>
      <nav className='nav'>
        <NavLink to='/' >
          <AccountCircleIcon />
          Profile
        </NavLink>
        <NavLink to='/tracks' >
          <MusicNoteRoundedIcon />
          Tracks
        </NavLink>
        <NavLink to='/playlists' >
          <FormatListBulletedRoundedIcon />
          Playlists
        </NavLink>
      </nav>

      <Outlet />
    </div>
  )
}

export default MainLayout;