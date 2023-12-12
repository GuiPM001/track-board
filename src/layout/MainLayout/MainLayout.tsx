import React from "react";
import Menu from "layout/Menu/Menu";
import Profile from "layout/Profile/Profile";
import Player from "layout/Player/Player";
import { PlayerProvider } from "providers/PlayerProvider";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="h-screen w-full bg-white grid grid-cols-12 gap-6 gap-y-0 text-slate-600 font-Quicksand">
      <Menu />

      <PlayerProvider>
        <main className="bg-white mt-16 mb-0 md:my-0 pt-6 col-span-12 md:col-span-9 lg:col-span-7 overflow-y-auto overflow-x-clip scrollbar-hide">
          <Outlet />
        </main>

        <aside className="hidden lg:block col-span-3 border-l border-slate-200 p-6">
          <Profile />
          <Player />
        </aside>

        <footer className="lg:hidden h-20 z-10 col-span-12">
          <Player />
        </footer>
      </PlayerProvider>
    </div>
  );
}
