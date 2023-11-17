// Vendor imports
import React, { useState } from "react";

type ButtonPropTypes = {
  toggleButtons?: (arg: boolean) => void;
  to?: string | void;
  setChapter?: Function;
  onClickOverride?: Function;
  children: React.ReactNode;
};

function Button(props: ButtonPropTypes) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const goToChapter = (to: string | void) => {
    props.setChapter && props.setChapter(to);
  };

  return (
    <div
      className="button"
      onClick={() => {
        if (props.onClickOverride) {
          // Used by the skip button
          props.onClickOverride();
        } else {
          props.toggleButtons && props.toggleButtons(false);
          goToChapter(props.to);
        }
      }}
      onPointerEnter={() => {
        setIsFocused(true);
      }}
      onPointerLeave={() => setIsFocused(false)}
    >
      <span className={isFocused ? "glitch" : ""}>
        {props.children || null}
      </span>
    </div>
  );
}

export default Button;
