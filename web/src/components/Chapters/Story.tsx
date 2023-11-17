// Vendor imports
import React, { useState, useEffect, useCallback } from "react";
import { Howl } from "howler";
import propTypes from "prop-types";

// imports
import story from "../../assets/story/story";
import { AvailableSFX, AvailableSongs } from "../../constants.ts";
import * as images from "../../assets/ascii/images";

export default function Story(props) {
  const [text, setText] = useState<Array<React.ReactNode | null>>([]);
  const [morseSFX, setMorseSFX] = useState<Howl | null>(null);
  const [SFXon, setSFXon] = useState(false); //Determines if SFX is on/off
  const [lastIntervalID, setLastIntervalID] = useState<NodeJS.Timer | null>(
    null
  );
  const [imageContent, setImageContent] = useState<React.ReactNode>(null);

  // set up text to print, each item in array is new line
  var textArray = story[props.chapter].textArray;

  // Start/Stop SFX
  useEffect(() => {
    if (!morseSFX) {
      console.log("morseSFX:", morseSFX);
      return;
    }
    if (SFXon && props.chapter === "prison") {
      setSFXon(false);
    }
    if (SFXon === true) {
      morseSFX.play();
    } else {
      morseSFX.stop();
    }
  }, [SFXon, morseSFX, props.chapter]);

  const newTypewriter = useCallback(
    (iSpeed?: number) => {
      if (!iSpeed) {
        iSpeed = 50; // time delay of print out
      }
      var iIndex = 0; // start printing array at this position
      var iArrLength = (textArray && textArray[0].length) || undefined; // the length of the text array
      var iTextPos = 0; // initialize text position

      let intervalID = setInterval(() => {
        setSFXon(true);
        iTextPos++;
        setText((text) => {
          text[iIndex] = (
            <p key={`line-${iIndex}`}>
              {textArray && textArray[iIndex].substring(0, iTextPos)}
              <span className="caret"></span>
            </p>
          );
          return [...text];
        });
        if (iTextPos === iArrLength && textArray != null) {
          iTextPos = -1;
          iIndex++;
          if (iIndex !== textArray.length) {
            setSFXon(false);
            //Clear carat from previous line
            setText((text) => {
              if (text[iIndex - 1]) {
                text[iIndex - 1] = (
                  <p key={`line-${iIndex - 1}`}>
                    {textArray &&
                      textArray[iIndex - 1].substring(0, iArrLength)}
                  </p>
                );
              }
              text[iIndex] = (
                <p key={`line-${iIndex}`}>
                  <span className="caret"></span>
                </p>
              );
              return [...text];
            });
            //Write next line
            iArrLength = textArray[iIndex].length; //Next line's length
          } else {
            //Make last line carat blink
            setText((text) => {
              text[iIndex - 1] = (
                <p key={`line-${iIndex - 1}`}>
                  {textArray && textArray[iIndex - 1].substring(0, iArrLength)}
                  <span className="caret blink"></span>
                </p>
              );
              return [...text];
            });
            //Stop SFX
            setSFXon(false);
            stopTyping();
            //Show the buttons after a delay
            const toggleButtons = props.toggleButtons;
            setTimeout(() => {
              toggleButtons(true);
            }, 750);
            return;
          }
        }
      }, iSpeed);

      const stopTyping = function () {
        clearInterval(intervalID);
        console.log("stopped!");
      };
      return intervalID;
    },
    [textArray, props.toggleButtons]
  );

  const drawText = useCallback(() => {
    const setSkip = props.setSkip;
    const toggleButtons = props.toggleButtons;
    setSkip(false);
    if (textArray) {
      setText(
        textArray.map((item, index) => {
          return item ? (
            <p key={`line-${index}`}>
              {item}
              {index + 1 === textArray?.length ? (
                <span className="caret"></span>
              ) : null}
            </p>
          ) : null;
        })
      );
    }
    setSFXon(false);
    setTimeout(() => {
      toggleButtons(true);
    }, 50);
  }, [textArray, props.setSkip, props.toggleButtons]);

  const drawImage = useCallback(() => {
    setSFXon(false);
    const fontSize = story[props.chapter].imageFontSize;
    const imagePath = story[props.chapter].imagePath ?? "";
    let image = (
      <pre>
        <p
          className={"ascii ascii__animated collapsed"}
          style={{ textAlign: "center", fontSize: fontSize }}
        >
          {images[imagePath]}
        </p>
      </pre>
    );
    setImageContent(image);
    //Display the image after a short delay
    setTimeout(() => {
      console.log("remove collapsed");
      let image = (
        <pre>
          <p
            className={"ascii ascii__animated"}
            style={{ textAlign: "center", fontSize: fontSize }}
          >
            {images[imagePath]}
          </p>
        </pre>
      );
      setImageContent(image);
      setSFXon(true);
      //Stop music after 5seconds (animation duration)
      setTimeout(() => {
        setSFXon(false);
      }, 2250);
    }, 100);

    //Show the buttons after a delay
    setTimeout(() => {
      const toggleButtons = props.toggleButtons;
      toggleButtons(true);
    }, 2000);
  }, [props.toggleButtons, props.chapter]);

  const playBackgroundMusic = useCallback(() => {
    let song = AvailableSongs[story[props.chapter].music || ""];
    let bgMusic = new Howl({
      src: [song],
      volume: 0.25,
      loop: true,
      onloaderror: (err) => {
        console.error(`music load error:${err}`);
      },
      onload: function () {
        console.log("start");
      },
      onplayerror: (err) => {
        console.log(err);
      },
    });
    bgMusic.play();
    return bgMusic;
  }, [props.chapter]);

  const setupSFX = useCallback(() => {
    let morseSFX = new Howl({
      src: [AvailableSFX.pi],
      volume: 0.25,
      loop: true,
      preload: true,
      onloaderror: (err) => {
        console.error(`music load error:${err}`);
      },
      onload: function () {
        console.log("start");
      },
      onplayerror: (err) => {
        console.log(err);
      },
    });
    setMorseSFX(morseSFX);
    return morseSFX;
  }, []);

  //On Initial Load
  useEffect(() => {
    console.log("<Story /> Initial Render");

    let morseSFX = setupSFX();
    //Play bg music
    let bgMusic: Howl | null = null;
    if (story[props.chapter].music) {
      bgMusic = playBackgroundMusic();
    }

    //Unmounting
    return () => {
      if (morseSFX) {
        morseSFX.stop();
      }
      bgMusic && bgMusic.stop();
    };
  }, [props.chapter, playBackgroundMusic, setupSFX]);

  //New chapter
  useEffect(() => {
    setImageContent(null);
    setText([]); //clear text
    lastIntervalID && clearInterval(lastIntervalID); //stop any previous typing
    let jailSFX: Howl | null = null;
    const setSkip = props.setSkip;
    setSkip(false);
    const chapter = props.chapter;
    if (!story[chapter].textArray && story[chapter].imagePath) {
      drawImage();
    } else {
      let intervalID = newTypewriter(); //start typing new chapter
      setLastIntervalID(intervalID); //keep track of this typer
    }
    if (chapter === "prison") {
      jailSFX = new Howl({
        src: [AvailableSFX.jailSFX],
        volume: 0.5,
        loop: false,
        preload: true,
        onloaderror: (err) => {
          console.error(`music load error:${err}`);
        },
        onload: function () {
          console.log("start jail");
        },
        onplayerror: (err) => {
          console.log(err);
        },
      });
      jailSFX.play();
    }

    //Unmounting
    return () => {
      if (jailSFX) {
        jailSFX.stop();
      }
    };
  }, [props.chapter, props.setSkip, drawImage, lastIntervalID, newTypewriter]);

  //Listen for Skipping
  useEffect(() => {
    console.log("skip", props.skip);
    if (props.skip !== true) {
      return;
    } else if (
      !story[props.chapter].textArray &&
      story[props.chapter].imagePath
    ) {
      return;
    }
    lastIntervalID && clearInterval(lastIntervalID); //stop any previous typing
    drawText();
  }, [props.skip, drawText, lastIntervalID, props.chapter]);

  let lines = text.map((line, index) => {
    return line;
  });

  return (
    <React.Fragment>
      {imageContent}
      {lines}
    </React.Fragment>
  );
}

Story.propTypes = {
  chapter: propTypes.string.isRequired,
  toggleButtons: propTypes.func.isRequired,
  skip: propTypes.bool.isRequired,
  setSkip: propTypes.func.isRequired,
};
