import styled, { css } from "styled-components";

export const NotificationContainer = styled.div<{ not: boolean }>`
  position: absolute;
  cursor: auto;
  transition: 0.4s ease-in-out;
  background-color: white;
  height: 0;
  opacity: 0;
  top: 46px;
  right: -545px;
  box-shadow: 0px 3px 7px 1px rgba(0, 0, 0, 0.2);
  padding-top: 20px;
  border-radius: 0 0 10px 10px;
  width: 400px;
  z-indez: 10;
  gap: 20px;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.not &&
    css`
      height: 350px;
      overflow: auto;
      transition: 0.4s ease-in-out;
      opacity: 1;
      right: -145px;
      ::-webkit-scrollbar {
        background: white;
        border-radius: 10px;
        width: 10px;
      }
      ::-webkit-scrollbar-thumb {
        width: 10px;
        background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
        border-radius: 10px;
      }
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
    min-height: 22px;
  }
  .read-all-tag {
    font-size: 12px;
    text-decoration: underline;
    color: #0000ee;
    cursor: pointer;
  }
  .all-notifications {
    display: flex;
    flex-direction: column;
  }
`;
export const NotificationData = styled.div<{
  status: boolean;
  newStatus: boolean;
}>`
  .hr-line {
    color: #3f1168;
    margin: 0;
  }
  .notification-data {
    display: flex;
    padding: 15px;
    gap: 20px;
    cursor: pointer;
    background-color: #ece8f0;
    ${(props) =>
      (props.status || props.newStatus) &&
      css`
        background-color: white;
      `};
    &:hover {
      background-color: #c4aade;
    }
    .notification-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .notification-texts {
      display: flex;
      flex-direction: column;
      p {
        margin: 0;
      }
      .notification-info {
        color: #3f1168;
        font-size: 14px;
        span {
          font-weight: 600;
        }
      }
      .date-text {
        font-size: 10px;
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
