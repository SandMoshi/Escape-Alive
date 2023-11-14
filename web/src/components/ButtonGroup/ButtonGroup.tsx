// Vendor imports
import React from "react";
import propTypes from "prop-types";
// @ts-ignore
import { CSSTransition } from "react-transition-group";

// imports
import story from "../../assets/story/story";
import Button from "./Button";

// style imports
import "./ButtonGroup.css";
import "../utils/glitchTextEffect.css";

type ButtonGroupPropTypes = {
  setChapter: Function;
  chapter: number | string;
  toggleButtons: (arg: boolean) => void;
  toggleSkip: Function;
  skip: boolean;
  showButtons: boolean;
};

function ButtonGroup(props: ButtonGroupPropTypes) {
  function Skip() {
    return (
      <div className="button" onClick={() => props.toggleSkip()}>
        Skip
      </div>
    );
  }

  // const skipButton = <Button>Skip</Button>;
  if (props.showButtons) {
    return (
      <CSSTransition
        in={props.showButtons}
        timeout={300}
        classNames="buttons"
        unmountOnExit
      >
        <div className="btngroup">
          {story[props.chapter].options.a && (
            <Button
              to={story[props.chapter]?.options.a?.goToChapter}
              toggleButtons={props.toggleButtons}
              setChapter={props.setChapter}
            >
              {story[props.chapter].options.a?.buttonText}
            </Button>
          )}

          {story[props.chapter].options.b && (
            <Button
              to={story[props.chapter].options.b?.goToChapter}
              toggleButtons={props.toggleButtons}
              setChapter={props.setChapter}
            >
              {story[props.chapter].options.b?.buttonText}
            </Button>
          )}
        </div>
      </CSSTransition>
    );
  } else if (story[props.chapter].textArray) {
    return (
      <React.Fragment>
        <div className="btngroup">
          {Number(props.chapter) !== 0 ? <Skip /> : null}
        </div>
      </React.Fragment>
    );
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
