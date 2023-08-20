import React from "react";
import Section from "../Section/Section";
import logo from "assets/logo.png";
import {
  faClock,
  faFileLines,
  faHeart,
  faHouse,
  faRightFromBracket,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  return (
    <div className="h-full w-48 py-6 pl-6 border-l md:border-r border-slate-200 fixed right-0 md:left-0 bg-white z-10">
      <img src={logo} alt="Logo" className="mb-10 w-32 hidden md:block" />
      <nav className="flex flex-col align-middle h-full">
        <Section
          title="Menu"
          links={[
            { icon: faHouse, name: "home", route: "/" },
            { icon: faUser, name: "profile", route: "/profile" },
          ]}
        />

        <Section
          title="Library"
          links={[
            { icon: faClock, name: "recent", route: "/recent-played" },
            { icon: faHeart, name: "favorites", route: "/favorites" },
          ]}
        />

        <Section
          title="Playlist"
          links={[
            { icon: faFileLines, name: "playlists", route: "/playlists" },
            { icon: faThumbsUp, name: "suggestion", route: "/recommendation",
            },
          ]}
        />

        <div className="fixed bottom-0">
          <Section
            title="General"
            links={[
              { icon: faRightFromBracket, name: "log out", route: "/logout" },
            ]}
          />
        </div>
      </nav>
    </div>
  )
}