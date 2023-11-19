// Vendor imports
import React, { useState, useEffect } from "react";

// imports
import Screen from "../Screen/Screen";
import ButtonGroup from "../ButtonGroup/ButtonGroup";

// asset imports
import bg_1 from "../../assets/bg/Background_1.png";
import rotatePhoneIcon from "../../assets/icons/phone-position-rotation-from-horizontal-to-vertical.svg";

// style imports
import "./computer.css";

export default function Computer() {
  const [chapter, setChapter] = useState<string>("0");
  const [showButtons, toggleButtons] = useState<boolean>(false);
  const [skip, setSkip] = useState<boolean>(false);

  useEffect(() => {
    console.log("new chapter:", chapter);
    toggleButtons(false);
  }, [chapter]);

  const toggleSkip = () => setSkip(!skip);

  return (
    <React.Fragment>
      <div className="rotatePrompt">
        <h3>Welcome to Escape ISIS</h3>
        <p>This game must be played in landscape mode</p>
        <img
          className="rotateIcon"
          src={rotatePhoneIcon}
          alt="Rotate Phone to Landscape"
        />
        <p>Please rotate your screen</p>
      </div>
      <div className="computer">
        <ButtonGroup
          chapter={chapter}
          setChapter={setChapter}
          showButtons={showButtons}
          toggleButtons={toggleButtons}
          toggleSkip={toggleSkip}
          skip={skip}
        />
        <div className="screen__bg">
          <Screen
            chapter={chapter}
            toggleButtons={toggleButtons}
            skip={skip}
            setSkip={setSkip}
          />
        </div>
        <img className="computer__bg" src={bg_1} alt="computer monitor" />
      </div>
    </React.Fragment>
  );
}
