import Image from "next/image";
import styled from "styled-components";

export const MainContainer = styled.div`
  background-image: url(../images/background.png);
  background-repeat:no-repeat;
  background-size: cover;
  width: 100%;
  height:100vh;
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`;
export const MasonryContainer = styled.div`

  display:flex;
  flex-direction:column;
  justify-content:center;
  position:absolute;
  margin-top:200px;
  background-color:white;
  width:100%;
  gap:20px;
  padding-inline:160px;
`;
export const MasonryBox = styled.div`
  display:flex;
  justify-content:center;
`;
export const MasonryTitle = styled.h1`
  font-family:'Montserrat',sans-serif;
  font-size:36px;
`;
export const MasonrySpan = styled.span`
  color:#0768FD;
`;
export const MasonryContent = styled.div`
  max-width:60rem;
  margin: 0 auto;
  display: column;
  columns:3;
  gap:20px;
  margin-bottom:10px;
`;
export const MasonryImage = styled.img`
  width:100%;
  border-radius:12px;
`;
export const MasonryCard = styled.div`
  display:flex;
  flex-direction:column;
  break-inside:avoid;
  gap:10px;
  border-radius:10px;
  border: 1px solid #6717CD;
  max-width:350px;
  padding:15px;
  margin-bottom:20px;
`;
export const CardTitle = styled.h1`
  font-family:'Montserrat',sans-serif;
  font-size: 18px;
`;