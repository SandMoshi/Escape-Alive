// Vendor imports
import React, { useState } from "react";

type ButtonPropTypes = {
  toggleButtons: (arg: Boolean) => void;
  to: String;
  children: React.ReactNode;
  setChapter: Function;
};

function Button(props: ButtonPropTypes) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const goToChapter = (to: String) => {
    props.setChapter(to);
  };

  return (
    <div
      className="button"
      onClick={() => {
        props.toggleButtons(false);
        goToChapter(props.to);
      }}
      onPointerEnter={() => {
        setIsFocused(true);
      }}
      onPointerLeave={() => setIsFocused(false)}
    >
      <div className={isFocused ? "glitch" : ""}>{props.children || null}</div>
    </div>
  );
}

export default Button;
