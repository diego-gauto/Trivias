import styled, { css } from "styled-components";

export const RewardContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding: 20px;
  gap: 20px;
  .title {
    font-size: 24px;
    font-weight: 600;
  }
  .add {
    border: none;
    border-radius: 10px;
    width: fit-content;
    padding: 10px;
    background: #6717cd;
    font-weight: 600;
    color: #fff;
  }
  .rewards {
    display: flex;
    gap: 20px;
    p {
      margin: 0;
    }
  }
  .request-container {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 20px 2px rgb(0 0 0 / 25%);
    border-radius: 10px;
    .row-titles {
      display: flex;
      background: #6717cd;
      color: #fff;
      font-weight: 600;
      p {
        padding: 10px;
        flex: 0 25%;
        margin: 0;
      }
    }
    .tr {
      display: flex;
      border-bottom: 1px solid gray;
      * {
        padding: 10px;
        flex: 0 25%;
        margin: 0;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;
export const Reward = styled.div<{ type: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  color: white;
  padding-bottom: 10px;
  position: relative;
  ${(props) =>
    props.type == "points" &&
    css`
      background: linear-gradient(135deg, #fd8608 30%, #9a2fea 100%);
    `}
  ${(props) =>
    props.type == "months" &&
    css`
      background: linear-gradient(135deg, #10c576 50%, #9a2fea 100%);
    `}
 ${(props) =>
    props.type == "certificates" &&
    css`
      background: linear-gradient(135deg, #167fec 10%, #9a2fea 100%);
    `}
  svg {
    font-size: 25px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  img {
    cursor: pointer;
    width: 260px;
    box-shadow: rgb(0 0 0 / 25%) 0px 0px 20px 2px;
    border-radius: 10px;
    &:hover {
      box-shadow: rgb(103 23 205) 0px 0px 10px 2px;
    }
  }
  .title {
    font-weight: 600;
  }
`;
