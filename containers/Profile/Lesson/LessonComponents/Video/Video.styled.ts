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
  gap: 20px;
  width:70%;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media (max-width: 1023px){
    gap: 10px;
    padding: 15px;
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
export const VideoImage = styled(Image)`
  
`;