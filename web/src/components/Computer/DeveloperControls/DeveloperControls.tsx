// Vendor imports
import React, { useRef } from "react";

// style imports
import "./DeveloperControls.css";

type DeveloperControlsPropTypes = {
  setChapter: React.Dispatch<React.SetStateAction<string>>;
};

const DeveloperControls = (props: DeveloperControlsPropTypes) => {
  const chapter = useRef<string>("4");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    chapter.current = event.target.value;
  };

  const validChapterPatternRegex = /^[0-9]+[a-zA-Z]?$/;

  const changeChapters = () => {
    if (validChapterPatternRegex.test(chapter.current)) {
      console.log("VALID");
      props.setChapter(chapter.current);
    } else {
      console.log("INVALID");
    }
  };

  return (
    <div className="container">
      <input
        className="text"
        type="text"
        defaultValue={chapter.current}
        onChange={handleChange}
      />
      <button className="btn" onClick={changeChapters}>
        Go
      </button>
    </div>
  );
};

export { DeveloperControls };
