import Image from "next/image";
import styled from "styled-components";
import {Col, Row} from "react-bootstrap";

export const  Container = styled.div`
  background-image: url(../images/background.png);
  background-repeat:no-repeat;
  background-size: cover;
  width: 100%;
  min-height:100vh; 
  height: 100%; 
  @font-face{ 
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`; 
export const MasonryContainer = styled.div`
padding-top: 125px:
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
  display: table;
  columns:3; 
  gap:20px; 

`;

export const MasonryWindowParent = styled.div`

overflow: hidden; 
`;
export const MasonryWindow = styled.div`
height: 750px;
width: 100%;
overflow-y: scroll; 
::-webkit-scrollbar {
  width: 0px; 
  background: transparent; /* make scrollbar transparent */
}   
 
 
`;
export const MasonryImage = styled.img`
width: auto;
border-radius: 12px;
height: 75%;
max-height: 170px;
`;
export const MasonryCardLeft = styled.div`
  display:flex;
  flex-direction:column;
  break-inside:avoid;
  gap:10px; 
  border-radius:10px; 
  border: 1px solid #6717CD;
  max-width:350px;
  padding:15px;  
  margin-bottom:20px;  
  height: 250px; 
  margin-left: 25px
`;
export const MasonryCardRight = styled.div`
  display:flex;
  flex-direction:column;
  break-inside:avoid;
  gap:10px; 
  border-radius:10px; 
  border: 1px solid #6717CD;
  max-width:350px;
  padding:15px;  
  margin-bottom:20px;
  height: 250px;
  margin-left: -25px
`;
export const Col_Table = styled(Col)`
  display:inline-block;
  padding-top: 100px;
`;
export const Row_Table = styled(Row)`
  width: 1200px;
`;
export const MasonryCardCentered = styled.div`
  display:flex;
  flex-direction:column;
  break-inside:avoid;
  gap:10px;
  height: 250px;
  border-radius:10px;
  border: 1px solid #6717CD;
  max-width:350px;  
  padding:15px;
  margin-bottom:20px;
`;
export const MasonryCardAlignA = styled.div`

`;
export const MasonryCardAlignB = styled.div`
bottom: 80px;
position: relative;
`;
export const CardTitle = styled.h1`
  font-family:'Montserrat',sans-serif;
  font-size: 18px;
`;