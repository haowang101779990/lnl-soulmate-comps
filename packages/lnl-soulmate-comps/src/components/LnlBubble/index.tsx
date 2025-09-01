import styled from "styled-components";
import { LnlBubbleProps, Role } from "./types";
import { coloredBorder } from "./styled";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";


// The Button from the last section without the interpolations
const InputWrapper = styled.div<{ $ai?: boolean; }>`
  display:flex;
  width: 60vw;
  justify-content:${props=>props.$ai?"left":"right"};
  margin:12px 0;
  @import url(https://fonts.googleapis.com/css?family=Anonymous+Pro);
  font-family: 'Anonymous Pro', monospace;
  & .css-typing{  
    width:fit-content;
    overflow:hidden;
    max-height:30vh;
    position:relative;
    line-height:1.2em;
    padding: 20px 15px;
    
    ${coloredBorder}
  }
 
  
}
`;

function useTyper({ text, showSpeed}: LnlBubbleProps) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    setCurrentText("");
  }, [text]);
  useEffect(() => {
    if (currentIndex < (text || "").length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, showSpeed||0);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, showSpeed, text]);

  return currentText;
}

const LnlBubble: React.FC<LnlBubbleProps> = ({
  text,
  showSpeed,
  role,
}: LnlBubbleProps) => {
  const currentText = useTyper({ text, showSpeed });

  return (
    <InputWrapper $ai={role===Role.AI}>
      <div className="css-typing">
        <div className={role===Role.AI?"content ai":"content user"}>
          {currentText}
          {currentText.length < (text || "").length ? (
            <i className="loader"></i>
          ) : (
            role===Role.AI?<i>🧚‍♀️</i>:<i>👋</i>
          )}
        </div>
      </div>
    </InputWrapper>
  );
};

export default LnlBubble;
