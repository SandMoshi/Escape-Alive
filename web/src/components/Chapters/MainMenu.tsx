// VENDOR imports
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";

// imports
import textLogo from "../../assets/ascii/logo";
import story from "../../assets/story/story.ts";
import propTypes from "prop-types";
import { Howl } from "howler";
import { scrambleText } from "../utils/scrambleTextEffect.ts";
import { AvailableSFX, AvailableSongs } from "../../constants.ts";
import TabContext from "../../stores/Tab/TabContext.ts";
import { stopSounds } from "../utils/audioHelpers.ts";

// type imports
import type { HowlSound } from "../utils/audioHelpers.ts";

type MainMenuPropTypes = {
  toggleButtons: (arg: boolean) => void;
};

export default function MainMenu(props: MainMenuPropTypes) {
  const { isTabActive } = useContext(TabContext);
  const [text, setText] = useState<Array<string>>([]);
  const [morseSFXon, setMorseSFXon] = useState(false);
  const descriptionRef = useRef(null);
  const promptRef = useRef(null);
  const setupComplete = useRef(false);
  const bgMusic = useRef<HowlSound | null>(null);
  const morseSFX = useRef<HowlSound | null>(null);
  const scrambleSFX = useRef<HowlSound | null>(null);
  const glitchSFX = useRef<HowlSound | null>(null);
  const SFXList = useRef<Array<HowlSound | null>>([]);

  var textArray = story[0]?.textArray;

  // Mount/Unmount logic
  useEffect(() => {
    setupSFX();
    setupComplete.current = true;
    return () => {
      setupComplete.current = false;
    };
  }, []);

  const setupSFX = () => {
    //Load SFX
    let SFXfile1 = AvailableSFX["pi"] ?? "";
    let SFXfile2 = AvailableSFX["cipherMachine"] ?? "";
    let glitchFile = AvailableSFX["digitalGlitches"] ?? "";
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
    SFXList.current = [...SFXList.current, morseSFX.current];

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
    SFXList.current = [...SFXList.current, scrambleSFX.current];

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
    SFXList.current = [...SFXList.current, glitchSFX.current];
  };

  // Pause when browser tab loses focus
  useEffect(() => {
    if (isTabActive === false) {
      bgMusic.current && bgMusic.current.pause();
      stopSounds(SFXList.current);
    } else {
      bgMusic.current && !bgMusic.current.playing() && bgMusic.current.play();
    }
  }, [isTabActive]);

  // Functions
  var iSpeed = 100; // time delay of print out
  var iIndex = 0; // start printing array at this posision
  var iArrLength = textArray ? textArray[0]?.length : 0; // the length of the text array
  var iScrollAt = 20; // start scrolling up at this many lines

  var iTextPos = 0; // initialize text position
  var sContents = [""]; // initialize contents variable
  var iRow; // initialize current row

  const typewriter = (textArray: Array<string>) => {
    if (!setupComplete.current) {
      return;
    }
    setMorseSFXon(true);
    sContents = [""];
    iRow = Math.max(0, iIndex - iScrollAt);

    while (iRow < iIndex) {
      sContents[iIndex] += textArray[iRow++];
      sContents[iIndex] = "";
    }

    const sContent: string = sContents[iIndex] ?? "";
    const textSubstring: string =
      textArray[iIndex]?.substring(0, iTextPos) ?? "";

    // @ts-ignore
    setText((text: Array<React.ReactNode>) => {
      text[iIndex] = (
        <p key={`line-${iIndex}`}>
          {sContent + textSubstring}
          <span className="caret"></span>
        </p>
      );
      return [...text];
    });

    if (iTextPos++ === iArrLength) {
      iTextPos = 0;
      iIndex++;
      if (iIndex !== textArray.length) {
        setMorseSFXon(false);
        setTimeout(() => {
          //Clear carat from previous line

          const textSubstring: string =
            textArray[iIndex - 1]?.substring(0, iArrLength ?? 0) ?? "";
          // @ts-ignore
          setText((text: Array<React.ReactNode>) => {
            text[iIndex - 1] = (
              <p key={`line-${iIndex - 1}`}>
                {sContents[iIndex - 1] + textSubstring}
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
          iArrLength = textArray[iIndex]?.length; //next line's length
          typewriter(textArray);
        }, 1500);
      } else {
        //Make last line carat blink
        const textSubstring: string =
          textArray[iIndex - 1]?.substring(0, iArrLength) ?? "";
        // @ts-ignore
        setText((text: Array<React.ReactNode>) => {
          text[iIndex - 1] = (
            <p key={`line-${iIndex - 1}`}>
              {sContents[iIndex - 1] + textSubstring}
              <span className="caret blink"></span>
            </p>
          );
          return [...text];
        });
        //Stop SFX
        setMorseSFXon(false);
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
    let song =
      (story && story[0]?.music && AvailableSongs[story[0].music]) ?? "";
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
  let lines = text.map((line) => line);

  // typewriter sound effects
  useEffect(() => {
    if (!morseSFX.current) {
      console.log("morseSFX:", morseSFX.current);
      return;
    }
    if (morseSFXon === true) {
      morseSFX.current.play();
    } else {
      morseSFX.current.stop();
    }
  }, [morseSFXon]);

  // Scramble text effect
  const scramble = useCallback(
    (firstTime?: boolean | string) => {
      scrambleText(
        descriptionRef.current,
        (textArray && textArray[0]) || null,
        () =>
          isTabActive
            ? firstTime
              ? scrambleSFX.current && scrambleSFX.current.play()
              : glitchSFX.current && glitchSFX.current.play()
            : null,
        () =>
          isTabActive
            ? firstTime
              ? scrambleSFX.current && scrambleSFX.current.stop()
              : glitchSFX.current && glitchSFX.current.stop()
            : null
      );
    },
    [isTabActive, textArray]
  );

  // Animate Description Text
  useEffect(() => {
    let intervalID: NodeJS.Timeout;
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
  }, [textArray, isTabActive, scramble]);

  // Animate prompt text
  let promptAnimationComplete = useRef(false);
  useEffect(() => {
    if (!promptAnimationComplete.current) {
      setTimeout(() => {
        console.log(lines);
        scrambleText(
          promptRef.current,
          (textArray && textArray[2]) || null,
          () => scrambleSFX.current?.play(),
          () => scrambleSFX.current?.stop()
        );
        setTimeout(() => {
          scrambleText(
            promptRef.current,
            (textArray && textArray[3]) || null,
            () => scrambleSFX.current?.play(),
            () => scrambleSFX.current?.stop()
          );
        }, 5000);
      }, 10000);
    }
    promptAnimationComplete.current = true;
  }, [textArray, lines, promptAnimationComplete]);

  useEffect(() => {
    // Play bg music
    if (story[0]?.music) {
      bgMusic.current = playBackgroundMusic();
    }
    // Start text animation
    textArray && typewriter(textArray);

    return () => {
      //On Unmount
      if (setupComplete.current === false) {
        stopSounds(SFXList.current);
        bgMusic.current && bgMusic.current.stop();
      }
    };
    // Run once on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // In Development, don't wait for animations to show buttons
  useEffect(() => {
    const toggleButtons = props.toggleButtons;
    if (process.env["NODE_ENV"] === "development") {
      console.log("Immediately show menu buttons in development mode");
      setTimeout(() => toggleButtons(true));
    }
  }, [props.toggleButtons]);

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
