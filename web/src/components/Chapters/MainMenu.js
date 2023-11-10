import React, { useState, useEffect, useRef } from "react";
import textLogo from "../../assets/ascii/logo";
import story from "../../assets/story/story";
import propTypes from "prop-types";
import { Howl } from "howler";
import { scrambleText } from "../utils/scrambleTextEffect";
import { AvailableSFX, AvailableSongs } from "../../constants";

export default function MainMenu(props) {
  const [text, setText] = useState([]);
  const [SFXon, setSFXon] = useState(false);
  const descriptionRef = useRef(null);
  const promptRef = useRef(null);
  var textArray = story[0].textArray;
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    let SFX = setupSFX();
    //Play bg music
    let bgMusic = null;
    if (story[0].music) {
      bgMusic = playBackgroundMusic();
    }
    typewriter(textArray);

    //Unmounting
    return () => {
      isMounted.current = false;
      SFX.stop();
      bgMusic.stop();
    };
  }, []);

  const morseSFX = useRef(null);
  const scrambleSFX = useRef(null);
  const glitchSFX = useRef(null);

  const setupSFX = () => {
    //Load SFX
    let SFXfile1 = AvailableSFX["pi"];
    let SFXfile2 = AvailableSFX["cipherMachine"];
    let glitchFile = AvailableSFX["digitalGlitches"];
    morseSFX.current = new Howl({
      src: [SFXfile1],
      volume: 0.25,
      loop: true,
      preload: true,
      onloaderror: (err) => {
        console.error(`music load error:${err}`);
      },
      onload: function () {
        console.log("morseSFX ready");
      },
      onplayerror: (err) => {
        console.log(err);
      },
    });

    scrambleSFX.current = new Howl({
      src: [SFXfile2],
      volume: 0.25,
      loop: true,
      preload: true,
      onloaderror: (err) => {
        console.error(`music load error:${err}`);
      },
      onload: function () {
        console.log("scrambleSFX ready");
      },
      onplayerror: (err) => {
        console.log(err);
      },
    });

    glitchSFX.current = new Howl({
      src: [glitchFile],
      volume: 0.25,
      loop: true,
      preload: true,
      onloaderror: (err) => {
        console.error(`music load error:${err}`);
      },
      onload: function () {
        console.log("glitchSFX ready");
      },
      onplayerror: (err) => {
        console.log(err);
      },
    });
  };

  useEffect(() => {
    if (!morseSFX.current) {
      console.log("morseSFX:", morseSFX.current);
      return;
    }
    if (SFXon === true) {
      morseSFX.current.play();
    } else {
      morseSFX.current.stop();
    }
  }, [SFXon]);

  // Functions
  var iSpeed = 100; // time delay of print out
  var iIndex = 0; // start printing array at this posision
  var iArrLength = textArray[0].length; // the length of the text array
  var iScrollAt = 20; // start scrolling up at this many lines

  var iTextPos = 0; // initialize text position
  var sContents = ""; // initialize contents variable
  var iRow; // initialize current row

  const typewriter = (textArray) => {
    if (!isMounted.current) {
      return;
    }
    setSFXon(true);
    sContents = [""];
    iRow = Math.max(0, iIndex - iScrollAt);

    while (iRow < iIndex) {
      sContents[iIndex] += textArray[iRow++];
      sContents[iIndex] = "";
    }
    setText((text) => {
      text[iIndex] = (
        <p key={`line-${iIndex}`}>
          {sContents[iIndex] + textArray[iIndex].substring(0, iTextPos)}
          <span className="caret"></span>
        </p>
      );
      return [...text];
    });

    if (iTextPos++ === iArrLength) {
      iTextPos = 0;
      iIndex++;
      if (iIndex !== textArray.length) {
        setSFXon(false);
        setTimeout(() => {
          //Clear carat from previous line
          setText((text) => {
            text[iIndex - 1] = (
              <p key={`line-${iIndex - 1}`}>
                {sContents[iIndex - 1] +
                  textArray[iIndex - 1].substring(0, iArrLength)}
              </p>
            );
            text[iIndex] = (
              <p key={`line-${iIndex}`}>
                <span className="caret"></span>
              </p>
            );
            return [...text];
          });
          //Write next line
          iArrLength = textArray[iIndex].length; //next line's length
          typewriter(textArray);
        }, 1500);
      } else {
        //Make last line carat blink
        setText((text) => {
          text[iIndex - 1] = (
            <p key={`line-${iIndex - 1}`}>
              {sContents[iIndex - 1] +
                textArray[iIndex - 1].substring(0, iArrLength)}
              <span className="caret blink"></span>
            </p>
          );
          return [...text];
        });
        //Stop SFX
        setSFXon(false);
        //Show the buttons after a delay
        setTimeout(() => {
          props.toggleButtons(true);
        }, 750);
      }
    } else {
      setTimeout(() => typewriter(textArray), iSpeed);
    }
  };

  const playBackgroundMusic = () => {
    let song = AvailableSongs[story[0].music];
    let bgMusic = new Howl({
      src: [song],
      volume: 0.25,
      loop: true,
      onloaderror: (err) => {
        console.error(`music load error:${err}`);
      },
      onload: function () {
        console.log("background music loaded");
      },
      onplayerror: (err) => {
        console.log(err);
      },
    });
    bgMusic.play();
    return bgMusic;
  };

  //Render Functions
  let lines = text.map((line, index) => {
    return line;
  });

  // Animate Description Text
  useEffect(() => {
    let intervalID;
    const scramble = (firstTime) => {
      scrambleText(
        descriptionRef.current,
        textArray[0],
        () =>
          firstTime ? scrambleSFX.current.play() : glitchSFX.current.play(),
        () =>
          firstTime ? scrambleSFX.current.stop() : glitchSFX.current.stop()
      );
    };
    const timeoutID = setTimeout(() => {
      scramble("firstTime");
      intervalID = setInterval(() => {
        scramble();
      }, 10000);
    }, 3000);

    return () => {
      clearInterval(intervalID);
      clearTimeout(timeoutID);
    };
  }, [textArray]);

  // Animate prompt text
  let promptAnimationComplete = useRef(false);
  useEffect(() => {
    if (!promptAnimationComplete.current) {
      setTimeout(() => {
        console.log(lines);
        scrambleText(
          promptRef.current,
          textArray[2],
          () => scrambleSFX.current.play(),
          () => scrambleSFX.current.stop()
        );
        setTimeout(() => {
          scrambleText(
            promptRef.current,
            textArray[3],
            () => scrambleSFX.current.play(),
            () => scrambleSFX.current.stop()
          );
        }, 5000);
      }, 10000);
    }
    promptAnimationComplete.current = true;
  }, [textArray, lines, promptAnimationComplete]);

  return (
    <React.Fragment>
      <pre>
        <p className="ascii" style={{ textAlign: "center" }}>
          {textLogo}
        </p>
      </pre>
      <br />
      <p className="menuText" ref={descriptionRef} style={{ marginBottom: 20 }}>
        ☷☐☶☶☵☶☷☱☶☷☶☐☶☵
      </p>
      <div className="menuText" ref={promptRef}>
        {lines[1]}
      </div>
      <div className="menuText">{lines[4]}</div>
    </React.Fragment>
  );
}

MainMenu.propTypes = {
  toggleButtons: propTypes.func.isRequired,
};
