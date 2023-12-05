import styled from "styled-components";

export const CancelReview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  .title-contain {
    display: flex;
    h2 {
      font-weight: 600;
    }
  }
  .user-answers {
    display: flex;
    flex-direction: column;
    gap: 5px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    border-radius: 10px 10px 0px 0px;
    width: 100%;
    td {
      font-size: 12px;
    }
    .name-td {
      position: relative;
      .tp {
        opacity: 0;
        position: absolute;
        top: -30px;
        left: 0;
        background-color: black;
        padding-inline: 20px;
        padding-block: 5px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        p {
          margin: 0;
          white-space: nowrap;
        }
      }
      &:hover {
        .tp {
          transition: 0.4s ease all;
          opacity: 1;
        }
      }
    }
  }

  @media screen and (min-width: 992px) {
    padding: 20px;
  }
`;
