import styled, { css } from "styled-components";

export const FilterContainer = styled.div<{ filter: boolean }>`
  position: fixed;
  width: 0;
  background-color: white;
  top: 242px;
  right: 40px;
  transition: 1s ease all;
  z-index: 1;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  opacity: 0;
  ${(props) =>
    props.filter === true &&
    css`
      transition: 1s ease all;
      width: 300px;
      opacity: 1;
    `}
  .content {
    display: flex;
    flex-direction: column;
    padding: 20px;
    position: relative;
    gap: 10px;
    p {
      margin: 0;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      color: #6717cd;
    }
    .filter-contain {
      display: flex;
      flex-direction: column;
      gap: 2px;
      .title-filter {
        font-size: 16px;
        color: #6717cd;
      }
    }
  }
`;
