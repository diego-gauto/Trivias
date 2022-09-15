import Image from "next/image";
import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  top: 20px;
  gap: 20px;
  @media (max-width: 1023px) {
    gap: 40px;
  }
`;
export const ImageContain = styled.div`
  width: 100%;
  height: 550px;
  position: relative;
  @media (max-width: 1023px) {
    height: 480px;
  }
`;
export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right: 100px;
  @media(max-width:1023px){
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    padding-left: 20px;
    padding-right: 0;
  }
`;
export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  gap: 5px;
  @media(max-width:1023px){
    align-items: flex-start;
  }
`;
export const Title = styled.h1`
  color: white;
  font-size: 24px;
  font-family: 'Montserrat',sans-serif;
  margin: 0;
  @media(max-width:1023px){
    font-size: 20px;
  }
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
  @media(max-width:1023px){
    font-size: 20px;
  }
`;
export const SpanText = styled.span`
  color: #E0C3FC;
  font-size: 24px;
  font-family: 'Montserrat',sans-serif;
  margin: 0;
`;

export const CardContain = styled.div`
  display: flex;
  padding-inline: 30px;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  width: fit-content;
  @media(max-width:1023px){
    width: 300px;
    position: relative;
    justify-content: center;
  }
`;
export const Cardcontent = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  @media(max-width:1023px){
    position: absolute;
    top: 0;
    max-width: 250px;
    min-width: 200px;
  }
`;
export const Cardcontent2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 412px;
  height: 328px;
  @media(max-width:1023px){
    position: absolute;
    top: -20px;
    left: 0;
    max-width: 250px;
  min-width: 200px;
    }
`;
export const Cardcontent3 = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  @media(max-width:1023px){
    position: absolute;
    top: 20px;
    right: 0;
    max-width: 250px;
  min-width: 200px;
  }
`;
export const RespContain = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  @media(max-width: 1023px){
    display: flex;
    justify-content: center;
  }
`;
export const TextContain = styled.div`
  display: flex;
  background: white;
  flex-direction: column;
  height:139px;
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
  @media(max-width:1023px){
    position: absolute;
    bottom: 10px;
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 20px;
  }
`;
export const ImageContent = styled.div`
  display: flex;
  position: relative;
  height: 189px;
  width:
`;