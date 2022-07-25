import styled from "styled-components";

export const HomeWorkContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-inline: 20px;
  @media (max-width: 1023px){
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    padding: 20px;
    gap: 10px;
    border-radius: 10px;
  }
`;
export const TaskTitle = styled.p`
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 14px;
  }
`;
export const TaskText = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
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
export const UploadButton = styled.button`
  display: flex;
  gap: 10px;
  font-family:'Montserrat',sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background: transparent;
  color: #6717CD;
  border-radius: 30px;
  border:1px solid #6717CD;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
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