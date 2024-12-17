import styled, { css } from 'styled-components';

export const NotificationContainer = styled.div<{
  show: boolean;
  empty: boolean;
}>`
  position: absolute;
  cursor: auto;
  transition: 0.4s ease-in-out;
  background-color: #dad3e5;
  opacity: 0;
  top: 51px;
  right: -100px;
  box-shadow: 0px 3px 7px 1px rgba(0, 0, 0, 0.2);
  padding: 20px 5px;
  border-radius: 8px;
  width: 101vw;
  z-index: 10;
  gap: 20px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 150px);

  ${(props) =>
    props.show &&
    css`
      overflow: auto;
      transition: 0.4s ease-in-out;
      opacity: 1;
    `}

  ${(props) =>
    props.empty &&
    css`
      overflow: auto;
      transition: 0.4s ease-in-out;
      opacity: 1;
      right: -73px;
      height: fit-content;
    `}

  p,
  h1 {
    margin: 0;
  }
  .title {
    font-size: 18px;
    color: #d244d1;
  }
  .title-container {
    display: flex;
    justify-content: space-between;
    padding-inline: 20px;
    min-height: 22px;
  }
  .read-all-tag {
    align-self: flex-end;
    padding-right: 10px;
    padding-bottom: 10px;
    font-style: italic;
    font-weight: 800;
    font-size: 10px;
    text-decoration: none;
    color: #d244d1;
    cursor: pointer;
  }
  .all-notifications {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 451px) {
    right: -118px;
    ::-webkit-scrollbar {
      background: white;
      border-radius: 10px;
      width: 15px;
    }
    ::-webkit-scrollbar-thumb {
      cursor: pointer;
      width: 10px;
      background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
      border-radius: 10px;
    }
  }

  @media screen and (min-width: 576px) {
    width: 400px;
    right: -95px;
  }

  @media screen and (min-width: 768px) {
    width: 500px;
    right: -145px;
    top: 46px;
  }

  @media screen and (min-width: 992px) {
  }
`;
export const NotificationData = styled.div<{
  status: number;
  newStatus: boolean;
}>`
  .hr-line {
    color: #3f1168;
    margin: 0;
  }
  cursor: pointer;
  .notification-data {
    display: flex;
    padding: 15px;
    gap: 20px;
    background-color: #d9d9d9;
    .circle {
      display: flex;
      position: absolute;
      right: 0;
      bottom: 5px;
      background: #fff;
      width: 20px;
      height: 20px;
      border-radius: 40px;
      border: 1px solid #d244d1;
      img {
        margin: auto;
      }
    }
    ${(props) =>
      (props.status === 1 || props.newStatus) &&
      css`
        background-color: white;
      `};
    &:hover {
      background-color: #c4aade;
    }
    .notification-image {
      display: block;
      align-self: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .notification-texts {
      display: flex;
      flex-direction: column;
      p {
        margin: 0;
      }
      .notification-info {
        p.title {
          font-size: 14px;
          color: #3f1168;
          font-weight: 800;
        }
        p.message {
          color: #d244d1;
          font-weight: 500;
          font-size: 12px;
        }
        p.score {
          font-style: italic;
          font-size: 12px;
          color: #3f1168;
          font-weight: 500;
          span.approved {
            color: #12701b;
          }
          span.failed {
            color: #d62929;
          }
        }
      }
      .date-text {
        font-size: 11px;
        font-weight: 600;
        color: #868686;
      }
      .comment-icon {
        color: #e68a0d;
      }
      .like-icon {
        color: red;
      }
    }
  }
  .empty-notifications {
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: 120px;
    font-size: 20px;
    font-weight: 600;
  }
`;
