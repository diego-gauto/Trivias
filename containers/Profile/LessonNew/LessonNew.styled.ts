import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  overflow: auto;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media (max-width: 1124px) {
    width: 100%;
  }
  .nav-course {
    display: none;
    background: #411369;
    padding-block: 20px;
    justify-content: space-between;
    padding-inline: 40px;
    align-items: center;
    img {
      width: 80px;
    }
    svg {
      color: #ede7f2;
      font-size: 24px;
    }
    @media (max-width: 1124px) {
      display: flex;
    }
  }
`;

export const RightSide = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  right: 0;
  width: 30%;
  @media (max-width: 1124px) {
    display: none;
    transition: 1s ease all;
    position: absolute;
    overflow: hidden;
    top: 64px;
    width: 100%;
    flex-wrap: wrap;
  }
  ${(props) =>
    props.open == true &&
    css`
      display: flex !important;
      right: 0 !important;
      transition: 1s ease all;
      height: max-content !important;
    `}
`;

export const HamburgerContainer = styled.div`
  position: absolute;
  display: none;
  background: #411369;
  padding-block: 18px;
  justify-content: space-between;
  padding-inline: 40px;
  align-items: center;
  right: 0;
  color: #ede7f2;
  svg {
    color: #ede7f2;
    font-size: 24px;
  }
  p {
    margin: 0;
    position: absolute;
    left: 20px;
    top: 40px;
    font-size: 12px;
  }
  @media (max-width: 1124px) {
    display: flex;
  }
`;
