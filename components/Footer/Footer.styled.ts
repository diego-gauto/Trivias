import styled, { keyframes } from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: white;
  position: relative;

  align-items: center;
  padding: 20px;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Nunito;
    src: url(../fonts/Nunito-VariableFont_wght.ttf);
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const Logo2 = styled.i`
  background-size: contain;
  background-position: center;
  background-image: url(../images/Navbar/Logo.svg);
  background-repeat: no-repeat;
  width: 100px;
  height: 80px;
  cursor: pointer;
`;
export const FooterGroup = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const FooterResponsive = styled.div`
  display: none;
  gap: 5px;
  padding-top: 0;
  padding-inline: 20px;
  padding-bottom: 20px;
  background-color: white;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  justify-content: space-between;
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Nunito;
    src: url(../fonts/Nunito-VariableFont_wght.ttf);
  }
  @media (max-width: 1023px) {
    display: flex;
  }
  @media (max-width: 767px) {
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
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const FooterText = styled.a`
  font-size: 18px;
  font-family: "Nunito", sans-serif;
  margin: 0;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    color: #6717cd;
  }
  @media (max-width: 870px) {
    font-size: 15px;
    line-height: 25px;
  }
`;
export const FooterIcons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  @media (max-width: 1023px) {
    margin-top: 25px;
    align-items: flex-end;
  }
`;
export const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
  width: 100%;
  padding-block: 15px;
  padding-inline: 20px;
  @media (max-width: 1023px) {
    padding: 10px;
  }
`;
export const BottomText = styled.p`
  font-size: 14px;
  color: white;
  font-family: "Raleway", sans-serif;
  margin: 0;
  opacity: 0.8;
  @media (max-width: 1023px) {
    font-size: 12px;
  }
  @media (max-width: 400px) {
    font-size: 10px;
  }
`;
export const SocialContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  a {
    display: flex;
  }
`;
export const FBIcon = styled.i`
  background-image: url(../images/fb.svg);
  background-repeat: no-repeat;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
`;
export const WAIcon = styled.i`
  background-image: url(../images/whatsapp.svg);
  background-repeat: no-repeat;
  width: 31px;
  height: 31px;
  cursor: pointer;
  border-radius: 50%;
`;
export const IGIcon = styled.i`
  background-image: url(../images/instagram.svg);
  background-repeat: no-repeat;
  width: 31px;
  height: 31px;
  cursor: pointer;
  border-radius: 6px;
`;
export const TextFinish = styled.p`
  font-size: 12px;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  color: #6717cd;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  margin: 0;
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;
export const LoaderContain = styled.div`
  box-sizing: border-box;
  display: block;
  width: 30px;
  height: 30px;
  margin: 6px;
  border-width: 9px;
  border-style: solid;
  border-radius: 50%;
  border-color: #6717cd transparent transparent;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none
    running;
`;
