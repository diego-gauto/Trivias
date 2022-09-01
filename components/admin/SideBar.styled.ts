import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #26264a;
  gap: 20px;
  padding: 20px;
  min-width: 200px;
  min-height: 100vh;
`;
export const Text = styled.p`
  font-size: 20px;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  color: white;
  margin: 0;
`;
export const AdminContain = styled.div`
  display: flex;
  width:100%;
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @font-face{ 
    font-family:Nunito;
    src:url(../fonts/Nunito-VariableFont_wght.ttf);
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