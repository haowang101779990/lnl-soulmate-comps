import styled, { css } from "styled-components";

export const coloredBorder = css`
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 6px; /* control the border thickness */
    background: linear-gradient(
      90deg,
      rgba(198, 245, 144, 1) 12%,
      rgba(218, 252, 69, 1) 100%
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
      background-color: rgba(198, 245, 144, 1);
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
