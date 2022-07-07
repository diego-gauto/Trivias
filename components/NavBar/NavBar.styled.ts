import Image from "next/image";
import { Button } from "react-bootstrap";
import styled from 'styled-components';

export const NavContainer = styled.div`
  position:fixed;
  z-index: 1;
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
export const NavText = styled.p`
  color:white;
  font-size: 18px;
  font-weight: 500;
  font-family:'Montserrat',sans-serif;
  cursor:pointer;
  margin:0;
  &:hover{
    text-decoration:underline; 
  }
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