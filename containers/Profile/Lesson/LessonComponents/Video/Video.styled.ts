import Image from "next/image";
import styled from "styled-components";

export const Segment = styled.div`
  display: flex;
  gap: 20px;
`;
export const VideoContain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width:70%;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media (max-width: 1023px){
    gap: 10px;
    padding: 15px;
  }
  @media (max-width: 900px){
    width:100%;
  }
`;
export const Title = styled.h1`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  @media (max-width: 1023px){
    font-size: 20px;
  }
  @media (max-width: 400px){
    font-size: 16px;
  }
`;
export const TitleContain = styled.div`
  display: flex;
  gap:10px;
  align-items:center;
`;
export const VideoImage = styled(Image)`
  
`;

export const MenuIcon = styled.i`
  background-image: url(../images/hamburger.png);
  height: 16px;
  width: 30px;
  cursor: pointer;
  display: none;
  @media( max-width: 700px){
    display: block;
  }
`;