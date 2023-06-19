import styled, { css } from "styled-components";

export const FilterContainer = styled.div<{ show: boolean }>`
  position: absolute;
  width: 0;
  background-color: white;
  top: 170px;
  right: 40px;
  transition: 1s ease all;
  z-index: 10000;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  opacity: 0;
  pointer-events: none;
  max-height: 800px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    background: white;
    border-radius: 10px;
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
    border-radius: 10px;
    width: 6px;
  }
  @media (max-width: 1023px) {
    right: 0px;
    left: 20px;
  }
  ${(props) =>
    props.show === true &&
    css`
      pointer-events: unset;
      transition: 1s ease all;
      width: 360px;
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
      .react-calendar__tile {
        color: #6717cd;
      }
      .react-calendar__tile--active {
        background: #6717cd;
        color: white;
      }
      .react-calendar__month-view__days__day--weekend {
        color: #d10000;
      }
      .react-calendar__tile--now {
        background: #dad3e5;
      }
    }
  }
`;
