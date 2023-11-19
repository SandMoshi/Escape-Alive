// Vendor imports
import React from "react";

// imports
import MainMenu from "../Chapters/MainMenu";
import ChapterBasic from "../Chapters/ChapterBasic";

// style imports
import "./screen.css";

type screenPropTypes = {
  toggleButtons: (arg: boolean) => void;
  chapter: string;
  skip: boolean;
  setSkip: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Screen(props: screenPropTypes) {
  return (
    <div className="screen">
      {props.chapter === "0" ? (
        <MainMenu toggleButtons={props.toggleButtons} />
      ) : (
        <ChapterBasic
          chapter={props.chapter}
          toggleButtons={props.toggleButtons}
          skip={props.skip}
          setSkip={props.setSkip}
        />
      )}
    </div>
  );
}
