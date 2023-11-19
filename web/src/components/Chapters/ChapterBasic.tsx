// Vendor imports
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Howl } from "howler";
import propTypes from "prop-types";

// imports
import story from "../../assets/story/story.ts";
import { AvailableSFX, AvailableSongs } from "../../constants.ts";

type ChapterBasicPropTypes = {
  chapter: string;
  toggleButtons: (arg: boolean) => void;
  skip: boolean;
  setSkip: (arg: boolean) => void;
};

export default function ChapterBasic(props: ChapterBasicPropTypes) {
  const [text, setText] = useState<Array<React.ReactNode | null>>([]);
  const morseSFX = useRef<Howl | null>(null);
  const jailSFX = useRef<Howl | null>(null);
  const bgMusic = useRef<Howl | null>(null);
  const [SFXon, setSFXon] = useState(false); //Determines if SFX is on/off
  const lastIntervalID = useRef<NodeJS.Timeout | null>(null);
  const [imageContent, setImageContent] = useState<React.ReactNode>(null);
  const setupComplete = useRef<boolean>(false);

  // set up text to print, each item in array is new line
  var textArray = story[props.chapter]?.textArray;

  // Start/Stop SFX
  useEffect(() => {
    if (SFXon && props.chapter === "prison") {
      setSFXon(false);
    }
    if (SFXon === true) {
      morseSFX.current && morseSFX.current.play();
    } else {
      morseSFX.current && morseSFX.current.stop();
    }
  }, [SFXon, props.chapter]);

  // On Unmount Only
  useEffect(() => {
    console.log("UNMOUNT - STOP ALL SFX");
    // Stop all Sounds & Music
    morseSFX.current && morseSFX.current.stop();
    jailSFX.current && jailSFX.current.stop();
    bgMusic.current && bgMusic.current.stop();
  }, []);

  const newTypewriter = useCallback(
    (iSpeed?: number) => {
      if (!iSpeed) {
        iSpeed = 50; // time delay of print out
      }
      var iIndex = 0; // start printing array at this position
      var iArrLength = (textArray && textArray[0]?.length) || undefined; // the length of the text array
      var iTextPos = 0; // initialize text position

      let intervalID = setInterval(() => {
        setSFXon(true);
        iTextPos++;
        setText((text) => {
          text[iIndex] = (
            <p key={`line-${iIndex}`}>
              {textArray && textArray[iIndex]?.substring(0, iTextPos)}
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
                      textArray[iIndex - 1]?.substring(0, iArrLength)}
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
            iArrLength = textArray[iIndex]?.length; //Next line's length
          } else {
            //Make last line carat blink
            setText((text) => {
              text[iIndex - 1] = (
                <p key={`line-${iIndex - 1}`}>
                  {textArray && textArray[iIndex - 1]?.substring(0, iArrLength)}
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

  const playJailSFX = (): void => {
    if (jailSFX.current) {
      jailSFX.current.play();
    } else {
      // Setup the SFX first
      jailSFX.current = new Howl({
        src: [AvailableSFX["jailSFX"] ?? ""],
        volume: 0.5,
        loop: false,
        preload: true,
        onloaderror: (err) => {
          console.error(`jailSFX load error:${err}`);
        },
        onload: function () {},
        onplayerror: (err) => {
          console.log(err);
        },
      });
      jailSFX.current.play();
    }
  };

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

  const drawImage = useCallback(async () => {
    setSFXon(false);
    const fontSize = story[props.chapter]?.imageFontSize;
    const imagePath = story[props.chapter]?.imagePath ?? "";
    const imageName = story[props.chapter]?.imageName ?? "";
    const imageModule = await import(`../../assets/${imagePath}`);
    const art = imageModule[imageName];
    let image = (
      <pre>
        <p
          className={"ascii ascii__animated collapsed"}
          style={{ textAlign: "center", fontSize: fontSize }}
        >
          {art}
        </p>
      </pre>
    );
    setImageContent(image);
    //Display the image after a short delay
    setTimeout(() => {
      let image = (
        <pre>
          <p
            className={"ascii ascii__animated"}
            style={{ textAlign: "center", fontSize: fontSize }}
          >
            {art}
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
    let song = AvailableSongs[story[props.chapter]?.music || ""];
    bgMusic.current = new Howl({
      src: [song ?? ""],
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
    bgMusic.current.play();
    return bgMusic;
  }, [props.chapter]);

  const setupMorseSFX = useCallback(() => {
    morseSFX.current = new Howl({
      src: [AvailableSFX["pi"] ?? ""],
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
  }, []);

  //On Initial Load
  useEffect(() => {
    if (!setupComplete.current) {
      console.log("<Story /> Initial Render");
      setupMorseSFX();

      // Start Morse SFX
      SFXon && morseSFX.current && morseSFX.current.play();

      //Play bg music
      if (story[props.chapter]?.music) {
        playBackgroundMusic();
      }
      // Prevent use-effect from running again
      setupComplete.current = true;
    }
  }, [props.chapter, playBackgroundMusic, setupMorseSFX, SFXon]);

  //New chapter
  useEffect(() => {
    setImageContent(null);
    setText([]); //clear text
    lastIntervalID.current && clearInterval(lastIntervalID.current); //stop any previous typing
    let jailSFX: Howl | null = null;
    const setSkip = props.setSkip;
    setSkip(false);
    const chapter = props.chapter;
    if (!story[chapter]?.textArray && story[chapter]?.imagePath) {
      drawImage();
    } else {
      lastIntervalID.current = newTypewriter(); //start typing new chapter
    }
    if (chapter === "prison") {
      playJailSFX();
    }

    //Unmounting
    return () => {
      if (jailSFX) {
        jailSFX.stop();
      }
    };
  }, [props.chapter, props.setSkip, drawImage, newTypewriter]);

  //Listen for Skipping
  useEffect(() => {
    if (props.skip !== true) {
      return;
    } else if (
      !story[props.chapter]?.textArray &&
      story[props.chapter]?.imagePath
    ) {
      return;
    }
    lastIntervalID.current && clearInterval(lastIntervalID.current); //stop any previous typing
    drawText();
  }, [props.skip, drawText, props.chapter]);

  let lines = text.map((line) => {
    return line;
  });

  return (
    <React.Fragment>
      {imageContent}
      {lines}
    </React.Fragment>
  );
}

ChapterBasic.propTypes = {
  chapter: propTypes.string.isRequired,
  toggleButtons: propTypes.func.isRequired,
  skip: propTypes.bool.isRequired,
  setSkip: propTypes.func.isRequired,
};
