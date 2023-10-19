import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
  padding-block: 30px;
  padding-inline: 60px;
  background: #ede7f2;
  @media (max-width: 1124px) {
    padding-inline: 20px;
  }
`;
export const TitleContain = styled.div`
  position: relative;
  display: flex;
  gap: 50px;
  padding-bottom: 20px;
  .test {
    position: absolute;
    font-size: 30px;
    top: 120px;
    z-index: 30;
    color: red;
  }
  .tab-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .tabs {
      display: flex;
      gap: 30px;
    }
    .button-container {
      display: flex;
      gap: 20px;
      .button-data {
        display: flex;
        gap: 5px;
        align-items: center;
        cursor: pointer;
        &:hover {
          .btn-text {
            font-weight: 600;
            line-height: 16px;
          }
          // .btn-icon {
          //   color: black;
          // }
        }
        .btn-text {
          font-size: 14px;
          line-height: 16px;
          font-weight: 500;
          color: #8e5fc1;
          margin: 0;
        }
        &:hover {
          .gray {
            font-weight: 500;
          }
        }
        .gray {
          color: gray;
        }
        .btn-icon {
          font-size: 24px;
          color: #d344d1;
        }
      }
    }
  }
  .line {
    position: absolute;
    background: #d4cedc;
    height: 1.5px;
    width: 100%;
    bottom: 0;
  }
  @media (max-width: 1124px) {
    width: 100%;
    .tab-container {
      flex-direction: column-reverse;
      gap: 30px;
      width: 100%;
      .tabs {
        width: 100%;
        gap: 5px;
        justify-content: space-between;
      }
      // .button-container {
      //   display: none;
      // }
    }
    p {
      font-size: 12px;
    }
  }
`;
export const IconContain = styled.div`
  display: none;
  @media (max-width: 1023px) {
    display: flex;
    padding-inline: 50px;
  }
  @media (max-width: 600px) {
    padding-inline: 30px;
  }
  @media (max-width: 374px) {
    padding-inline: 15px;
  }
`;
export const SelectContain = styled.div`
  display: flex;
  position: relative;
  background-color: white;
  padding-block: 10px;
  padding-inline: 30px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px -8px 10px 0px rgba(0, 0, 0, 0.2);
  @media (max-width: 600px) {
    padding-block: 5px;
    padding-inline: 15px;
  }
`;
export const UnSelected = styled.div`
  display: flex;
  padding-block: 10px;
  padding-inline: 30px;
  @media (max-width: 600px) {
    padding-block: 5px;
    padding-inline: 15px;
  }
`;
export const Titles = styled.p`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  color: #8e2de2;
  font-weight: 500;
  opacity: 0.7;
  margin: 0;
  cursor: pointer;
  white-space: nowrap;
  svg {
    display: none;
    font-size: 20px;
  }
  .icon {
    color: #8e2de2;
  }
  @media (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
      display: flex;
    }
  }
`;
export const PositionTitle = styled.p<{ position: any }>`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  color: #8e2de2;
  opacity: 0.7;
  margin: 0;
  svg {
    display: none;
    font-size: 20px;
  }
  @media (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-shadow: 0px 0px 12px rgb(142 45 226 / 80%);
    svg {
      display: flex;
    }
  }
  ${(props) =>
    props.position == 1 &&
    css`
      font-weight: 700;
      opacity: 1;
    `}
  ${(props) =>
    props.position == 2 &&
    css`
      font-weight: 700;
      opacity: 1;
    `}
  ${(props) =>
    props.position == 3 &&
    css`
      font-weight: 700;
      opacity: 1;
    `}
  ${(props) =>
    props.position == 4 &&
    css`
      font-weight: 700;
      opacity: 1;
    `}
`;
export const ListIcon = styled.i`
  -webkit-mask-image: url(../images/Video/icons/list2.png);
  background-color: #8e2de2;
  height: 32px;
  width: 32px;
  display: none;
  cursor: pointer;
  @media (max-width: 1023px) {
    display: flex;
  }
`;
export const EaselIcon = styled.i`
  -webkit-mask-image: url(../images/Video/icons/easel.png);
  background-color: #8e2de2;
  height: 32px;
  width: 32px;
  display: none;
  cursor: pointer;
  @media (max-width: 1023px) {
    display: flex;
  }
`;
export const BookIcon = styled.i`
  -webkit-mask-image: url(../images/Video/icons/book.png);
  background-color: #8e2de2;
  height: 32px;
  width: 32px;
  display: none;
  cursor: pointer;
  @media (max-width: 1023px) {
    display: flex;
  }
`;
export const ChatboxIcon = styled.i`
  -webkit-mask-image: url(../images/Video/icons/chatbox.png);
  background-color: #8e2de2;
  height: 32px;
  width: 32px;
  display: none;
  cursor: pointer;
  @media (max-width: 1023px) {
    display: flex;
  }
`;
