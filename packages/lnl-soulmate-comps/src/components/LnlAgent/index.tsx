import styled from "styled-components";
import LnlAnime from "../LnlAnime";
import LnlBubble from "../LnlBubble";
import { LnlAgentProps } from "./types";


const LnlAgentStyle = styled.div`
  position:relative;
  & .anime{
    position:absolute;
    top:-100px;
    left: -140px;
  }
`


const LnlAgent:React.FC<LnlAgentProps> = function ({ text, showSpeed, status }) {
  return (
    <LnlAgentStyle>
      <LnlAnime width={200} height={200} scale={0.2} status={status}></LnlAnime>
      <LnlBubble text={text} showSpeed={showSpeed}></LnlBubble>
    </LnlAgentStyle>
  );
};

export default LnlAgent;
