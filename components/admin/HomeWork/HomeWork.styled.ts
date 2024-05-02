import styled, { css } from 'styled-components';

export const HWContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0;
  overflow: auto;

  @media screen and (min-width: 992px) {
    padding: 40px;
  }
`;
export const TitleContain = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
  select {
    padding-block: 4px;
    padding-inline: 10px;
    border: 2px solid #6717cd;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 700;
    option {
      font-size: 14px;
    }
  }
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  flex-direction: column;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  .pages {
    display: flex;
    justify-content: space-between;
    padding-inline: 20px;
    padding-bottom: 10px;
    align-items: center;
    p {
      margin: 0;
    }
    .index {
      display: flex;
      gap: 10px;
      align-items: center;
      .current-number {
        cursor: pointer;
        font-size: 30px;
      }
      .default-number {
        cursor: pointer;
        font-size: 20px;
        color: #6717cd;
      }
      .arrows {
        font-size: 30px;
        cursor: pointer;
      }
    }
    .max-pages {
      .max-number {
        font-weight: 600;
        font-size: 24px;
      }
    }
  }
`;
export const Table = styled.table`
  display: block;
  overflow-x: scroll;
  td {
    font-size: 16px;
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
export const Button = styled.div<{ status: any; approved: any }>`
  display: flex;
  margin: auto;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
  white-space: nowrap;
  padding: 10px;
  color: white;
  border-radius: 100px;
  ${(props) =>
    props.status === 0 &&
    css`
      background: #9534eb;
    `}
  ${(props) =>
    props.status === 1 &&
    props.approved === 1 &&
    css`
      background: #33c600;
    `}
      ${(props) =>
    props.status === 1 &&
    props.approved === 0 &&
    css`
      background: #e70000;
    `}
  cursor: pointer;
`;
export const Download = styled.div`
  display: flex;
  color: black;
  text-decoration: none;
  padding: 15px;
  white-space: nowrap;
  &:hover {
    font-weight: 600;
    font-size: 13px;
  }
`;
