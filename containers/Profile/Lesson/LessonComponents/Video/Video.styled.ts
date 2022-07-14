import Image from "next/image";
import styled from "styled-components";

export const VideoContain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
export const Title = styled.h1`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const VideoImage = styled(Image)`
  
`;