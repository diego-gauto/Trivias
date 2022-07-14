import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;
export const TextContain = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
`;
export const Title = styled.p`
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const Banner = styled(Image)`
  postion: absolute;
  clip-path: polygon(100% 0%,
    100% 0%,
    100% 80%,
    0% 100%,
    0% 0%);
  `;