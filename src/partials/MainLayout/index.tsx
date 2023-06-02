import React from 'react';
import './style.scss';
import { NavLink, Outlet } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';

function MainLayout() {
  return (
    <div className='container'>
      <nav className='sideBar'>
        <NavLink to='/' >
          <AccountCircleIcon />
          Profile
        </NavLink>
        <NavLink to='/tracks' >
          <MusicNoteRoundedIcon />
          Tracks
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default MainLayout;