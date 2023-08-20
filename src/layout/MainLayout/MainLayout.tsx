import React from "react";
import Menu from "partials/Menu/Menu";
import Profile from "partials/Profile/Profile";
import Player from "partials/Player/Player";
import { PlayerProvider } from "providers/PlayerProvider";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="h-screen w-full bg-white flex flex-row text-slate-600 font-Quicksand">
      <Menu />

      <PlayerProvider>
        <main className="w-auto lg:mr-[25%] px-6 pt-6 pb-20 lg:pb-6 absolute bg-white mt-16 md:mt-0 md:left-48">
          <Outlet />
        </main>

        <aside className="hidden lg:block w-1/4 min-w-[240px] border-l border-slate-200 p-6 fixed bg-white right-0 h-screen">
          <Profile />
          <Player />
        </aside>

        <footer className="lg:hidden w-full h-20 fixed bottom-0 pl-0 md:pl-48 z-10">
          <Player />
        </footer>
      </PlayerProvider>
    </div>
  );
}
