import React from "react";
import people from "../../assets/main.png";
import "./header.css";

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">EduNet 💡</h1>

      <p>
        EduNet is a platform that allows Content creators to upload their
        courses or livestream their courses using livepeer API. Based on how
        much course users watch the money will be sent to the creator.
      </p>
    </div>

    <div className="gpt3__header-image">
      <img src={people} />
    </div>
  </div>
);

export default Header;
