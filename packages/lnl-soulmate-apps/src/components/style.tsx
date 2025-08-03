import styled from "styled-components";



export const ChatBotCtn=styled.div`
  width:100%;
  margin-left:20vw;
  margin-top:10vh;
  margin-bottom:10vh;
  & .history{
  }
`


export const TextInputContainer = styled.div`
    display: flex;
	align-items: left;
	justify-content: left;
    width:100%;
    padding-top:1em;
    //** variables
    $background: #f5f6fa;
    $text: #9c9c9c;
    $input-bg-color: #fff;
    $input-text-color: #a3a3a3;
    $button-bg-color: #7f8ff4;
    $button-text-color: #fff;
    //** button
    & .btn {
        display: inline-block;
        background: transparent;
        color: inherit;
        font: inherit;
        border: 0;
        outline: 0;
        padding: 0;
        transition: all 200ms ease-in;
        cursor: pointer;
        width:10vw;
        font-size:14px;
        
        &.btn--primary {
            background: #7f8ff4;
            color: white;
            box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
            border-radius: 2px;
            padding: 12px 10px;
            display:inline-block;
            height:50%;
            margin-top:20px;
            
            &:hover {
                background: darken(#7f8ff4, 4%);
            }
            
            &:active {
                background: #7f8ff4;
                box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, .2);
            }
        }
        
        &.btn--inside {
            margin-left: -96px;
        }
    }

    //** form
    & .form__field {
        width: 30vw;
        background: #fff;
        color: $input-text-color;
        font: inherit;
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0 , .1);
        border: 0;
        outline: 0;
        padding: 22px 18px;
    }
`