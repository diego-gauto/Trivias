import styled, { keyframes, css } from "styled-components";

export const Container = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: #26264a;
  padding: 0;
  min-height: 100vh;
  transition: 0.5s ease all;
  @media (max-width: 1300px) {
    min-height: auto;
    position: absolute;
    z-index: 10;
    left: -270px;
    transition: 0.5s ease all;
    ${(props) =>
      props.show &&
      css`
        left: 0;
      `}
    .close-admin-menu {
      color: #fff;
      cursor: pointer;
      font-size: 24px;
      margin-left: auto;
    }
  }
  .tab {
    ul {
      li {
        color: #fff;
        opacity: 0.7;
        cursor: pointer;
      }
    }
  }
`;
export const Text = styled.p`
  font-size: 16px;
  padding: 8px;
  font-family: "Nunito", sans-serif;
  cursor: pointer;
  color: white;
  margin: 0;
`;
export const AdminContain = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  .icon-exit {
    position: absolute;
    font-size: 24px;
    top: 10px;
    left: 10px;
    cursor: pointer;
    &:hover {
      color: #6717cd;
    }
  }
  select,
  input {
    padding-block: 5px;
    padding-inline: 20px;
    border-radius: 100px;
    border: 1px solid #6717cd;
  }
  .disable-contain {
    pointer-events: none;
    .disable {
      border: 1px solid gray;
    }
    .disable-txt {
      color: gray;
      font-weight: 600;
    }
  }
  .courses-header {
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
    padding-inline: 20px;
    align-items: center;
    @media (max-width: 700px) {
      flex-direction: column;
      select {
        width: 100%;
      }
    }
    .main-title {
      display: flex;
      gap: 10px;
      align-items: center;
      font-size: 24px;
      margin: 0;
    }
    .courses-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      @media (max-width: 450px) {
        flex-direction: column;
        width: 80%;
      }
      .delete-btn {
        &:hover {
          opacity: 0.8;
        }
      }
      button {
        display: flex;
        align-items: center;
        gap: 5px;
        border-radius: 100px;
        padding-block: 5px;
        padding-inline: 20px;
        border: none;
        background-color: #6717cd;
        color: white;
        border: none;
        &:hover {
          background-color: #45009c;
        }
      }
    }
  }
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Nunito;
    src: url(../fonts/Nunito-VariableFont_wght.ttf);
  }
`;
export const Table = styled.table`
  display: block;
  overflow-x: scroll;
  td {
    font-size: 14px;
    font-family: "Raleway", sans-serif;
    padding-left: 10px;
    padding-block: 15px;
    text-align: left;
    &:last-child {
      color: #6717cd;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  th {
    padding-left: 10px;
    padding-block: 15px;
    text-align: left;
    background-color: #6717cd;
    color: white;
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
  }
  tr {
    &:hover {
      background: #d3d3d3;
      &:last-child {
        border-radius: 0 0 10px 10px;
      }
    }
    border-bottom: 1px solid gray;
    &:first-child {
      border-bottom: none;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
export const AdminLoader = styled.div`
  display: flex;
  width: 100%;
  min-height: 90vh;
  align-items: center;
  justify-content: center;
  .loader-image {
    display: flex;
    width: 80px;
    height: 80px;
    background-image: url(../images/logo2.png);
    background-size: 80px;
    background-repeat: no-repeat;
    align-items: center;
    justify-content: center;
    .loader-contain {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 100px;
      height: 100px;
      margin: 6px;
      border-width: 9px;
      border-style: solid;
      border-radius: 50%;
      border-color: #6717cd transparent transparent;
      animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal
        none running;
    }
  }
`;
