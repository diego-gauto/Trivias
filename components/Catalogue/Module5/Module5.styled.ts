import Image from "next/image";
import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;
export const Banner2 = styled(Image)`
  filter: brightness(40%);
  postion: absolute;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 110px;
  gap: 20px;
`;
export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right: 100px;
`;
export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  gap: 5px;
`;
export const Title = styled.h1`
  color: white;
  font-size: 24px;
  font-family: 'Montserrat',sans-serif;
  margin: 0;
`;
export const LimitTime = styled.p`
  color: white;
  font-size: 16px;
  font-family: 'Montserrat',sans-serif;
  margin: 0;
`;
export const SuscribeText = styled.p`
  display: flex;
  gap: 10px;
  color: white;
  font-size: 24px;
  font-family: 'Montserrat',sans-serif;
  margin: 0;
`;
export const SpanText = styled.span`
  color: #E0C3FC;
  font-size: 24px;
  font-family: 'Montserrat',sans-serif;
  margin: 0;
`;

export const CardContain = styled.div`
  display: flex;
  padding-inline: 20px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
export const Cardcontent = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
`;
export const TextContain = styled.div`
  display: flex;
  background: white;
  flex-direction: column;
  gap: 12px;
  padding:10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius:0 0 10px 10px;
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
`;
export const PurpleButton = styled.button`
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  background-color: #6717CD;
  padding-block: 15px;
  padding-inline: 25px; 
  color: #fff;
  border-radius: 30px;
  border:none;
  &:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const Divider = styled.p`
  font-size: 60px;
  color: white;
  margin: 0;
  cursor:context-menu;
`;