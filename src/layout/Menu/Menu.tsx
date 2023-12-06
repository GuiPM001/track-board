import React, { useState } from "react";
import logo from "assets/logo.png";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./components/Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Menu() {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <>
      <div className="hidden md:block col-span-3 lg:col-span-2 border-l md:border-r border-slate-200 bg-white z-10">
        <Sidebar />
      </div>

      <div className="md:hidden fixed w-full h-16 bg-white flex flex-row items-center justify-between border-b border-slate-200 z-20 ease-in-out duration-300">
        <img src={logo} className="w-28 ml-6" />

        <button
          data-testid="openMenuBtn"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="mr-6"
        >
          <FontAwesomeIcon icon={faBars} className="w-5 text-xl" />
        </button>

        {showMobileMenu && (
          <div
            data-testid="mobileMenu"
            className="h-full w-screen bg-black bg-opacity-70 fixed bottom-0 flex"
          >
            <button
              data-testid="closeMenuBtn"
              className="fixed right-4 top-6 z-20"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="w-5 text-xl hover:scale-110"
              />
            </button>

            <Sidebar />
          </div>
        )}
      </div>
    </>
  );
}
