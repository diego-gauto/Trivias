import styled, { css } from "styled-components";

export const NotificationContainer = styled.div<{ not: boolean }>`
  position: absolute;
  cursor: auto;
  transition: 0.4s ease-in-out;
  background-color: white;
  height: 0;
  opacity: 0;
  top: 46px;
  right: -145px;
  box-shadow: 0px 3px 7px 1px rgba(0, 0, 0, 0.2);
  padding-top: 20px;
  border-radius: 0 0 10px 10px;
  width: 400px;
  z-indez: 10;
  ${(props) =>
    props.not &&
    css`
      height: 400px;
      transition: 0.4s ease-in-out;
      opacity: 1;
    `}
  p,
  h1 {
    margin: 0;
  }
  .title {
    font-size: 18px;
  }
  .title-container {
    display: flex;
    justify-content: space-between;
    padding-inline: 20px;
  }
  .read-all-tag {
    font-size: 12px;
    text-decoration: underline;
    color: #0000ee;
  }
  .all-notifications {
    display: flex;
    flex-direction: column;
    .notifications {
    }
    .empty-notifications {
      justify-content: center;
      display: flex;
      align-items: center;
      margin-top: 120px;
      font-size: 20px;
      font-weight: 600;
    }
  }
`;
