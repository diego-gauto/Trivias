import Image from "next/image";
import Link from "next/link";
import { Button } from "react-bootstrap";
import styled from 'styled-components';

export const NavContainer = styled.div` 
  z-index: 10;
  display:flex;
  width:100%;
  justify-content:space-between;
  background-color:transparent;
  padding-block: 10px;
  padding-inline: 20px;
  @font-face{ 
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`;
export const NavHome = styled.div` 
  position: fixed;
  z-index: 10;
  display:flex;
  width:100%;
  justify-content:space-between;
  background-color:transparent;
  padding-block: 10px;
  padding-inline: 20px;
  @font-face{ 
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`;
export const NavTags = styled.div`
  display:flex;
  gap:40px;
  align-items:center;
`;
export const Logo = styled(Image)`
  cursor:pointer;
`;
export const NavText = styled.a`
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-family:'Montserrat',sans-serif;
  cursor:pointer;
  margin:0;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover{
    text-decoration:underline; 
  }
  &:active{
    font-weight: 600;
    color:red;
  }
`;
export const UserText = styled.p`
  color: black;
  font-size: 18px;
  font-family:'Montserrat',sans-serif;
  cursor:pointer;
  margin:0;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover{
    text-decoration:underline; 
  }
`;
export const UserContain = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const PurpleButton = styled.button`
  background-color: #6717CD;
  color: #fff;
  width: 160px;
  height: 50px;
  font-size: 16px;
  font-family:'Montserrat',sans-serif;
  border-radius: 25px;
  border:none;
  &:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const Level = styled.i`
  background-image: url(../images/Navbar/lvl.png);
  background-repeat:no-repeat;
  width: 50px;
  height: 50px;
`;
export const UserImage = styled.i`
  background-image: url(../images/Navbar/userImage.png);
  background-repeat:no-repeat;
  width: 50px;
  height: 50px;
  cursor:pointer;
`;