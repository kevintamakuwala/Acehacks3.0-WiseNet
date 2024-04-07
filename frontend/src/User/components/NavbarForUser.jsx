import React, { useState } from "react";
import {
  BookOpenIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import logo from "/images/logo.png";

function NavbarForUser() {
  let Links = [
    { name: "HOME", link: "/user-home" },
    { name: "CHALLENGES", link: "/challenges" },
    { name: "CONTACT", link: "/contact-us" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-lg w-full top-0 left-0 relative bg-slate-100">
      <div className="md:flex items-center justify-between  py-4 md:px-10 px-7 sm:mx-10 mx-4">
        {/* logo section */}
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <img src={logo} alt="logo" />
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7 "
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-slate-100 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20" : "top-[-490px]"
          }`}
        >
          {Links.map((link, index) => (
            <li key={index} className="md:ml-8 md:my-0 my-7 font-semibold">
              <NavLink
                to={link.link}
                className="text-gray-800 hover:text-blue-400 duration-500"
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {
            <NavLink
              to={"/login"}
              className="btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
            >
              Login
            </NavLink>
          }
        </ul>
        {/* button */}
      </div>
    </div>
  );
}

export default NavbarForUser;