import React from "react";
import "./section.css";
import { NavLink, Link } from "react-router-dom";
import image from "../assets/img.gif";

function Section() {
  return (
    <div>
      <h2>Uplod Your Videos Here !!!</h2>
      <div class="card 1">
        <div class="card_image">
          <img src={image} />
        </div>
        <div class="card_title title-white">
          <p>
            <Link to="/upload"> Upload here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Section;
