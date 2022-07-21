import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  background: white;
  width: 100%;
  justify-content:space-between;
  align-items:center;
  padding: 20px;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @font-face{ 
    font-family:Nunito;
    src:url(../fonts/Nunito-VariableFont_wght.ttf);
  }
  @media(max-width: 870px) {
    display: block;
    min-height: 220px;
    padding: 10px;
    flex-direction: column;
    column-count: 2;
    column-gap: 30%;
  }
`;
export const Logo2 = styled.i`
  display: flex;
  background-image: url(../images/logo2.png);
  background-repeat:no-repeat;
  width: 100px;
  height: 75px;
  cursor: pointer;
  @media(max-width: 870px) {
    height: 90px;
  }
`;
export const FooterGroupText = styled.div`
  display:flex;  
  gap:100px;
  @media(max-width: 870px) {
    flex-direction: column;
    gap: 10px;
  }
`;
export const Column = styled.div`
  display: inline;
  //flex-direction:flex-end;
  gap:20px; 
  @media(max-width: 870px) {
    gap: 10px;
  }
`;
export const FooterText = styled.p`
  font-size: 18px;
  font-family: 'Nunito',sans-serif;
  margin: 0;
  @media(max-width: 870px) {
    font-size: 15px;
    line-height: 25px;
  }
`;
export const FooterIcons = styled.div`
  display:flex;
  flex-direction: column;
  gap:10px;
  align-items: flex-end;
`;
export const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  width:100%;
  padding-block: 15px;
  padding-inline: 20px;
  
`;
export const BottomText = styled.p`
  font-size:14px;
  color:white;
  font-family:'Raleway',sans-serif;
  margin:0;
  opacity:.8;
  @media(max-width: 870px) {
      font-size:12px;
  }
`;
export const SocialContainer = styled.div`
  display: flex;
  align-items: center;
  gap:10px;
`;
export const FBIcon = styled.i`
  background-image: url(../images/facebook.png);
  background-repeat:no-repeat;
  width: 30px;
  height:30px;
  cursor:pointer;
`;
export const WAIcon = styled.i`
  background-image: url(../images/whatsapp.png);
  background-repeat:no-repeat;
  width: 30px;
  height:30px;
  cursor:pointer;
`;
export const IGIcon = styled.i`
  background-image: url(../images/instragram2.png);
  background-repeat:no-repeat;
  width: 30px;
  height:30px;
  cursor:pointer;
`;