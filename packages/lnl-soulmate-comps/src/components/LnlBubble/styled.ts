import styled, { css } from "styled-components";

export const coloredBorder = css<{ $ai?: boolean; }>`
  &::before {

    --color1:${props=>props.$ai?"rgba(198, 245, 144, 1) 12%":"rgba(238, 174, 202, 1) 0%"};
    --color2:${props=>props.$ai?"rgba(237, 221, 83, 1) 100%":"rgba(148, 187, 233, 1) 100%"};
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 3px; /* control the border thickness */
    background: linear-gradient(
      90deg,
      var(--color1),
      var(--color2)
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  & .content {
    --color: white;
    --size-dot: 8px;
    width:fit-content;
    max-height:inherit;
    overflow:auto;
    &.user{
      align-self:flex-end;
    }
    &.ai{
      align-self:flex-start;
    }
    & .loader {
      content: "";
      box-sizing: border-box;
      position: relative;
    }
    & .loader::before,
    & .loader::after {
      content: "";
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      width: var(--size-dot);
      height: var(--size-dot);
      border-radius: 50%;
      background-color: var(--color1);
      animation: loader-9 0.6s cubic-bezier(0.39, 0.31, 0, 1.11) infinite;
    }

    & .loader::after {
      left: calc(50% + 1.6vmin);
      animation-delay: 0.12s;
    }

    @keyframes loader-9 {
      0%,
      100% {
        opacity: 0;
      }

      0% {
        transform: translate(-4vmin, -4vmin);
      }

      66% {
        opacity: 1;
      }

      66%,
      100% {
        transform: none;
      }
    }
  }
`;
