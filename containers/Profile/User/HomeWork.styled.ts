import styled, { css } from "styled-components";

export const HWContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
`;
export const TitleContain = styled.div`
display: flex;
padding: 20px;
p{
  font-family:'Montserrat',sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}
`;
export const Table = styled.table`
td{
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  padding-left: 10px;
  padding-block: 15px;
  text-align: left;
}
  th{
    padding-left: 10px;
    padding-block: 15px;
    text-align: left;
    background-color: #6717CD;
    color: white;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    }
tr{  
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
export const Button = styled.div<{status:any}>`
  display: flex;
  margin: auto;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
  padding: 10px;
  color: white;
  background: #E70000;
  border-radius: 100px;
  ${props => props.status == true && css`
  background: #33C600;
  `}
  cursor: pointer;
`;
export const Download = styled.div`
  display: flex;
  color: black;
  text-decoration: none;
  padding: 15px;
  &:hover{
    font-weight: 600;
  }
`;