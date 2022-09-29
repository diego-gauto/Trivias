import styled from "styled-components";

export const MasonryItem = styled.div`
width: 360px;
margin: 0 auto;
@media only screen and (max-width: 1024px) {
  width: 170px;
}
`;

export const MasonryImage = styled.img`
width: auto;
border-radius: 12px;
height: 100%;
@media only screen and (max-width: 1024px) {
  height: auto;
  width: 100%;
}
`;

export const MasonryCard = styled.div`
display:flex;
flex-direction:column;
break-inside:avoid;
gap:10px;
border-radius:10px; 
border: 1px solid #6717CD;
width:350px;
padding:15px;
margin-bottom:20px;
margin: 0 auto;
@media only screen and (max-width: 1024px) {
  width: 100%;
  padding: 7.5px;
  gap: 0;
}
`;

export const CardTitle = styled.h1`
  font-family:'Montserrat',sans-serif;
  font-size: 18px;
`;
