import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #26264a;
  gap: 20px;
  padding: 20px;
  width: 250px;
  height: 100vh;
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
  width: 100%;
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