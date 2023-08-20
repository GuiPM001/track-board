import React from 'react';
import Profile from '../pages/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout/MainLayout';
import Tracks from '../pages/Tracks';
import Wrapper from '../components/Wrapper';
import Playlists from '../pages/Playlists';
import PlaylistDetails from '../pages/PlaylistDetails';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Wrapper title='Your profile'><Profile /></Wrapper>} />
          <Route path='/tracks' element={<Wrapper title='Top tracks'><Tracks /></Wrapper>} />
          <Route path='/playlists' element={<Wrapper title='Your playlists'><Playlists /></Wrapper>} />
          <Route path='/playlist/:id' element={<Wrapper title=''><PlaylistDetails /></Wrapper>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;