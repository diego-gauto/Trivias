import Image from 'next/image';
import styled from 'styled-components';

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
  @media( max-width: 1023px){
    display:none;
  }
`;
export const Logo2 = styled.i`
  background-image: url(../images/logo2.png);
  background-repeat:no-repeat;
  width: 100px;
  height: 80px;
  cursor: pointer;
`;
export const FooterGroup = styled.div`
  display: flex;
  width: 50%;
  justify-content:space-between;
  @media(max-width: 1023px) {
    display: none;
  }
`;
export const FooterResponsive = styled.div`
  display: none;
  gap: 5px;
  padding-top: 0;
  padding-inline: 20px;
  padding-bottom: 20px;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  justify-content: space-between;
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @font-face{ 
    font-family:Nunito;
    src:url(../fonts/Nunito-VariableFont_wght.ttf);
  }
  @media(max-width: 1023px) {
    display: flex;
  }
  @media(max-width: 767px) {
  padding-inline: 10px;
  padding-bottom: 10px;
  }
`;
export const RespContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const RespContainer2 = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  flex-direction: column;
  justify-content: flex-end;
`;
export const Column = styled.div`
  display:flex;
  flex-direction:column;
  gap:20px; 
`;
export const FooterText = styled.p`
  font-size: 18px;
  font-family: 'Nunito',sans-serif;
  margin: 0;
  @media(max-width: 1023px) {
    font-size: 14px;
  }
`;
export const FooterIcons = styled.div`
  display:flex;
  flex-direction: column;
  gap:10px;
  align-items: center;
  @media(max-width: 1023px) {
    margin-top: 25px;
    align-items: flex-end;
  }
`;
export const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  width:100%;
  padding-block: 15px;
  padding-inline: 20px;
  @media(max-width: 1023px) {
    padding: 10px;
  }
`;
export const BottomText = styled.p`
  font-size:14px;
  color:white;
  font-family:'Raleway',sans-serif;
  margin:0;
  opacity:.8;
  @media(max-width: 1023px) {
    font-size: 12px;
  }
  @media(max-width: 400px) {
    font-size: 10px;
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