import styled, { css } from 'styled-components';

export const DefaultContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  flex-direction: column;
  margin: 20px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  p,
  h2 {
    margin: 0;
  }
  media(max-width: 1023px) {
    .table-contain {
      max-width: 100%;
      overflow-x: auto;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    .top-title {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 24px;
        font-weight: 600;
      }
      .icon {
        font-size: 20px;
        color: #6717cd;
        cursor: pointer;
      }
    }
  }
  .title-filter {
    font-size: 20px;
    font-weight: 600;
  }
  .top-data {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-inline: 30px;
    padding-block: 20px;
  }
  @media (max-width: 800px) {
    min-width: unset;
    margin: unset;
    margin-block: 15px;
    .top-data {
      width: 100%;
      .header {
        flex-direction: column;
      }
    }
  }
`;
export const DefaultSearchContainer = styled.div`
  display: flex;
  position: relative;
  .search-input {
    font-size: 14px;
    border: 1px solid #6717cd;
    border-radius: 10px 10px 10px 10px;
    outline: none;
    padding-block: 10px;
    padding-inline: 50px 30px;
  }
  .search-icon {
    background-image: url(../images/admin/search.png);
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
  }
  .users {
    display: flex;
    gap: 20px;
  }
`;
export const DefaultColumn = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${props =>
    props.gap &&
    css`
      gap: ${props.gap}px;
    `}
`;
export const DefaultRow = styled.div<{ gap?: number }>`
  display: flex;
  justify-content: space-between;
  ${props =>
    props.gap &&
    css`
      gap: ${props.gap}px;
    `}
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
export const DefaultFilterContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  position: relative;
  max-width: 33%;
  .title-filter {
    font-size: 14px;
    color: #6717cd;
  }
  .calendar-contain {
    position: absolute;
    width: 300px;
    top: 70px;
    background-color: white;
    z-index: 2;
  }
  .icon {
    position: absolute;
    left: 280px;
    cursor: pointer;
    color: #6717cd;
  }
  .icon-open {
    font-size: 20px;
    position: absolute;
    cursor: pointer;
    bottom: -15px;
    left: 280px;
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
`;
export const AdminTable = styled.table`
  width: 100%;
  display: block;
  overflow-x: auto;
  td {
    font-size: 14px;
    font-family: 'Raleway', sans-serif;
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
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
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
  @media (max-width: 800px) {
    i {
      display: none;
    }
    th,
    td {
      font-size: 16px;
    }
  }
  @media (max-width: 450px) {
    th,
    td {
      font-size: 16px;
    }
  }
`;

export const AdminTable2 = styled.table`
  width: 100%;
  display: block;
  overflow-x: auto;
  td {
    font-size: 14px;
    font-family: 'Raleway', sans-serif;
    padding-left: 10px;
    padding-block: 15px;
    text-align: left;
  }
  th {
    padding-left: 10px;
    padding-block: 15px;
    text-align: left;
    background-color: #6717cd;
    color: white;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
  tr {
    &:hover {
      background: #d3d3d3;
    }
    border-bottom: 1px solid gray;
    &:first-child {
      border-bottom: none;
    }
  }
`;
