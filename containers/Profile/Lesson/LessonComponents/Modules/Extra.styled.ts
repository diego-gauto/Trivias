import styled from "styled-components";

export const ExtraContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1023px) {
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    padding: 20px;
    border-radius: 10px;
  }
  @media (max-width: 400px) {
    padding: 15px;
  }
`;
export const Paragraph = styled.p`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  text-align: justify;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 12px;
  }
`;
export const DownlowadContain = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 1023px) {
    padding: 10px;
  }
  @media (max-width: 400px) {
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
  font-size: 18px;
  font-weight: 600;
  color: #3f1168;
  opacity: 0.7;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 14px;
  }
`;
export const Pdf = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  opacity: 0.7;
  color: #8e5fc1;
  svg {
    font-size: 22px;
  }
  &:hover {
    opacity: 1;
    color: #8e2de2;
    font-weight: 600;
    transition: 0.5s ease all;
  }
`;
export const Weight = styled.p`
  font-size: 18px;
  color: gray;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 14px;
  }
`;
