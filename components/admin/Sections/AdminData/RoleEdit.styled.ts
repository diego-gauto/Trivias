import styled from "styled-components";

export const ModalContain = styled.div`
display: flex;
flex-direction: column;
//height: 0px;
padding: 15px;
gap: 20px;
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const IconRoleContain = styled.div`
  display: flex;
  position: relative;
`;
export const TitleContain = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const SectionOptions = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
`;
export const RowContain = styled.div`
display: flex;
gap: 20px;
justify-content: space-between;
&:hover{
  cursor: pointer;
}
`;
export const OptionsContain = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const Title = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const SelectedRoleContain = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  width: 180px;
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
  padding-block: 5px;
  border-radius: 15px;
  gap: 10px;
  border: 1px solid #6717CD;
  z-index: 5;
  li{
    list-style-type: none;
  }
  input{
    //z-index: -1;
  }
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;