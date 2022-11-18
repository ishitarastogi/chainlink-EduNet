import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../assets/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import Login from "./Login";
import "./navbar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <Link to="/">
          {" "}
          <img src={logo} width="200px" height="150px" />
        </Link>
        <div className="gpt3__navbar-links_container">
          <p>
            <Link to="/explore">Explore </Link>
          </p>
          <p>
            <Link to="/createProfile">Create Profile </Link>
          </p>
          <p>
            <Link to="/setDefaultProfile"> Set Default Profile </Link>
          </p>
          <p>
            <Login />
          </p>
        </div>
      </div>
      <div>
        <ConnectButton />
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <p>
                <a href="#home">Home</a>
              </p>
              <p>
                <a href="#wgpt3">About</a>
              </p>
              <p>
                <a href="#possibility">Blog</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
