// Vendor imports
import React from "react";
import propTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

// imports
import story from "../../assets/story/story";
import Button from "./Button";

// style imports
import "./ButtonGroup.css";
import "../utils/glitchTextEffect.css";

type ButtonGroupPropTypes = {
  setChapter: (chapter: string) => void;
  chapter: number | string;
  toggleButtons: (arg: boolean) => void;
  toggleSkip: Function;
  skip: boolean;
  showButtons: boolean;
  setCheckpoint: (checkpoint: string | null) => void;
  checkpoint: string | null;
};

function ButtonGroup(props: ButtonGroupPropTypes) {
  const SkipButton = () => (
    <Button onClickOverride={() => props.toggleSkip()}>Skip</Button>
  );

  const isMainMenu = Number(props.chapter) === 0;

  // Scenario 1: Show Buttons for the current story
  if (props.showButtons) {
    return (
      <CSSTransition
        in={props.showButtons}
        timeout={300}
        classNames="buttons"
        unmountOnExit
      >
        <div className="btngroup">
          {/* Special Checkpoint Button */}
          {props.checkpoint && (
            <Button
              to={props.checkpoint}
              toggleButtons={props.toggleButtons}
              setChapter={props.setChapter}
              setCheckpoint={props.setCheckpoint}
            >
              Reload Checkpoint
            </Button>
          )}

          {story[props.chapter]?.options?.["a"] && (
            <Button
              to={story[props.chapter]?.options?.["a"]?.goToChapter}
              toggleButtons={props.toggleButtons}
              setChapter={props.setChapter}
              setCheckpoint={props.setCheckpoint}
              checkpoint={story[props.chapter]?.options?.["a"]?.checkpoint}
            >
              {story[props.chapter]?.options?.["a"]?.buttonText}
            </Button>
          )}

          {story[props.chapter]?.options?.["b"] && (
            <Button
              to={story[props.chapter]?.options?.["b"]?.goToChapter}
              toggleButtons={props.toggleButtons}
              setChapter={props.setChapter}
              setCheckpoint={props.setCheckpoint}
              checkpoint={story[props.chapter]?.options?.["b"]?.checkpoint}
            >
              {story[props.chapter]?.options?.["b"]?.buttonText}
            </Button>
          )}
        </div>
      </CSSTransition>
    );
    // Scenario 2: Show Skip button while text is being animated
  } else if (story[props.chapter]?.textArray && !isMainMenu) {
    return (
      <div className="btngroup">
        <SkipButton />
      </div>
    );
    // Scenario 3: No buttons need to be shown
  } else return null;
}

ButtonGroup.propTypes = {
  setChapter: propTypes.func.isRequired,
  chapter: propTypes.string.isRequired,
  showButtons: propTypes.bool.isRequired,
  toggleButtons: propTypes.func.isRequired,
  toggleSkip: propTypes.func.isRequired,
  skip: propTypes.bool.isRequired,
};

export default ButtonGroup;
