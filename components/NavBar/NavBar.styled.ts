import Image from "next/image";
import styled, { css } from "styled-components";

export const NavContainer = styled("div")<{pathname: any, color: any}>` 
  z-index: 10;
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: white;
  padding-block: 10px;
  padding-inline: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  @font-face{ 
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  ${props => props.pathname == '/' && css`
    position: fixed;
    background-color: transparent;
    box-shadow: none;
    `}
  ${props => props.color == 1 && css`
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    `}
    @media(max-width: 1023px) {
      background-color: white;
      padding-block: 0;
      padding-inline: 0;
    }
`;
export const NavTags = styled.div`
  display:flex;
  gap: 40px;
  align-items:center;
  @media(max-width: 1023px) {
    display: none;
  }
`;
export const Logo = styled(Image)`
  cursor: pointer;
`;
export const LogoContain = styled.div`
  display: flex;
  @media(max-width: 1023px) {
    display: none;
  }
`;
export const NavText = styled("a")<{pathname: any, color: any}>`
  color: black;
  text-decoration: none;
  font-size: 18px;
  font-family:'Montserrat',sans-serif;
  cursor:pointer;
  margin:0;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover{
    color: black;
    text-decoration: none;
    font-weight: 600;
  }
  &::active{
    font-weight: 600;
  }
  @media(max-width: 1023px){
    font-size: 16px;
  }
  ${props => (props.color == 0 && props.pathname == '/') && css`
  color: white;
  &:hover{
    color: white;
  }
`}
`;
export const PurpleButton = styled.button`
  background-color: #6717CD;
  color: #fff;
  padding-block: 15px;
  padding-inline: 25px;
  font-size: 16px;
  font-family:'Montserrat',sans-serif;
  border-radius: 25px;
  border:none;
  &:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
  @media(max-width: 1023px) {
    padding-block: 10px;
  }
  @media(max-width: 450px) {
    padding-block: 8px;
    padding-inline: 12px;
    font-size: 14px;
  }
  
`;
export const UserContain = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const Level = styled.i`
  background-image: url(../images/Navbar/lvl.png);
  background-repeat:no-repeat;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
export const UserImage = styled.i`
  background-repeat:no-repeat;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
`;
export const LogoS = styled.i`
  background-image: url(../images/Navbar/LogoSmall.png);
  background-repeat:no-repeat;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
export const NavResponsive = styled.div`
  z-index: 10;
  display: none ;
  align-items: center;
  width: 100%;
  padding-block: 10px;
  padding-inline: 20px;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @font-face{ 
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @media(max-width: 1023px) {
    display: flex;
  }
  @media(max-width: 450px) {
    padding-block: 5px;
    padding-inline: 10px;
  }

  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const HamburgerContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  background-color: white;
  padding-block: 20px;
  padding-inline: 30px;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  @media(max-width: 424px){
    padding: 20px;
  }
  @media(max-width: 350px){
    padding: 10px;
  }
`;
export const Close = styled.i`
  background-image: url(../images/Navbar/CloseIcon.png);
  background-repeat:no-repeat;
  width: 26px;
  height: 26px;
  cursor: pointer;
`;
export const MenuIcon = styled.i`
  background-image: url(../images/Navbar/menu.png);
  background-repeat:no-repeat;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
export const Points = styled.p`
  font-size: 12px;
  font-family:'Raleway',sans-serif;
  font-weight: 600;
  margin:0;
`;
export const PointsContain = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
export const IconsContain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const TagsResp = styled.div`
  display:none;
  gap: 40px;
  align-items:center;
  @media(max-width: 1023px) {
    display: flex;
  }
  @media(max-width: 767px) {
    gap: 20px;
  }
  @media(max-width: 450px) {
    padding-left: 20px;
    gap: 10px;
  }
  a{
    color: black;
  text-decoration: none;
  font-size: 16px;
  font-family:'Montserrat',sans-serif;
  cursor:pointer;
  margin:0;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover{
    color: black;
    text-decoration: none;
    font-weight: 600;
  }
  &::active{
    font-weight: 600;
  }
  }
`;
export const HBMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  list-style: none;
  @media(max-width: 424px){
    padding: 10px;
  }
  a{
    text-decoration: none;
  }
`;
export const HBList = styled.li`
  color: black;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-family: 'Montserrat', sans-seriff;
  padding-block: 20px;
  cursor: pointer;
  @media(max-width: 424px){
    font-size: 16px;
  }
  @media(max-width: 350px){
    font-size: 14px;
  }
  a{
    display: flex;
    text-decoration: none;
  }
  &:hover{
    text-decoration: none;
    font-weight: 600;
  }
`;