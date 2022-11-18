import React from "react";
import { RiLinkedinFill, RiTwitterFill, RiMediumFill } from "react-icons/ri";
import "./Footer.css";
function Footer() {
  return (
    <div>
      <footer>
        <ul class="icons">
          <li>
            <a href="#">
              <RiLinkedinFill></RiLinkedinFill>
            </a>
          </li>
          <li>
            <a href="#">
              <RiTwitterFill></RiTwitterFill>
            </a>
          </li>
          <li>
            <a href="#">
              <RiMediumFill></RiMediumFill>
            </a>
          </li>
        </ul>
        <ul class="menu">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>

          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
        <div class="footer-copyright">
          <p>Copyright @ 2022 All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
