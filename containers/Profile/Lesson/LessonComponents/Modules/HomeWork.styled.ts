import styled from "styled-components";

export const HomeWorkContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const TaskTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #f8a44c;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 14px;
  }
`;
export const TaskText = styled.p`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  margin: 0;
  text-align: justify;
  @media (max-width: 1023px) {
    font-size: 12px;
  }
`;
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;
export const ReviewButton = styled.button`
  cursor: auto !important;
  display: flex;
  gap: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background: transparent;
  color: #6717cd;
  border: none;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const UploadButton = styled.button`
  display: flex;
  gap: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background: transparent;
  color: #6717cd;
  border-radius: 30px;
  border: 1px solid #6717cd;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const UploadIcon = styled.i`
  background-image: url(../images/Video/HomeWork/upload.png);
  height: 25px;
  width: 25px;
  background-position: center;
  background-repeat: no-repeat;
`;
