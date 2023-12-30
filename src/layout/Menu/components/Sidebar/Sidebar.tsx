import React from "react";
import Section from "../Section/Section";
import logo from "assets/logo.png";
import { faClock, faHeart, faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  return (
    <div className="p-6 bg-white h-full md:h-auto fixed right-0 md:static">
      <img src={logo} alt="Logo" className="mb-10 w-32 hidden md:block" />
      <nav className="flex flex-col align-middle h-full">
        <Section
          title="Library"
          links={[
            { icon: faHouse, name: "home", route: "/" },
            { icon: faClock, name: "recent", route: "/recent" },
            { icon: faHeart, name: "favorites", route: "/favorites" },
          ]}
        />
      </nav>
    </div>
  );
}
