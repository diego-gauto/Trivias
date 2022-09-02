import styled from "styled-components";

export const HWContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
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