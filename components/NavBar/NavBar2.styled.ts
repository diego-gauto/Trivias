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
  position: relative;
  @font-face{ 
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  ${props => props.pathname == '/' && css`
    position: fixed;
    background-color: transparent;
    `}
  ${props => props.color == 1 && css`
    background-color: white;
    `}
`;
export const NavTags = styled.div`
  display:flex;
  gap:40px;
  align-items:center;
  @media(max-width: 1023px) {
    display: none;
  }
`;
export const Logo = styled(Image)`
  cursor: pointer;
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