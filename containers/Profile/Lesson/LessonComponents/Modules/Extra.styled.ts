import styled from "styled-components";

export const ExtraContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1023px){
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    padding: 20px;
    border-radius: 10px;
  }
  @media (max-width: 400px){
    padding: 15px;
  }
`;
export const Paragraph = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  text-align: justify;
  margin: 0;
  @media (max-width: 1023px){
    font-size: 12px;
  }
`;
export const DownlowadContain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media (max-width: 1023px){
    padding: 10px;
  }
  @media (max-width: 400px){
    padding: 5px;
  }
`;
export const FileIcon = styled.i`
  background-image: url(../images/Video/ExtraMaterial/file.png);
  height: 30px;
  width: 30px;
  background-position: center;
  background-repeat: no-repeat;
`;
export const DownloadText = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  margin: 0;
  @media (max-width: 1023px){
    font-size: 14px;
  }
`;
export const Weight = styled.p`
  font-size: 18px;
  color: gray;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  @media (max-width: 1023px){
    font-size: 14px;
  }
`;