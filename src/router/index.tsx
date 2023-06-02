import React from 'react';
import Profile from '../pages/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../partials/MainLayout';
import Tracks from '../pages/Tracks';
import Wrapper from '../components/Wrapper';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
            <Route path='/' element={<Wrapper title='Your profile'><Profile /></Wrapper>} />
            <Route path='/tracks' element={<Wrapper title='Top tracks in the last 30 days'><Tracks /></Wrapper>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;