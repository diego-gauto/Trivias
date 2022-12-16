import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
`;
export const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;
export const CourseName = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;
export const TitleContain = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
export const ChevU = styled.i`
  background-image: url(../images/Video/icons/arrowUp.svg);
  background-repeat: no-repeat;
  background-position: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export const ChevD = styled.i`
  background-image: url(../images/Video/icons/arrowDown.svg);
  background-repeat: no-repeat;
  background-position: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export const CourseContent = styled.div`
  display: flex;
  gap: 50px;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  .circle {
    display: flex;
    width: 100%;
    height: 20px;
    border-radius: 10px;
  }
`;
export const Text = styled.p`
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  text-align: justify;
`;
export const Label = styled.label`
  font-size: 16px;
  color: #6717cd;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;
export const TransparentButton = styled.button`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  background: transparent;
  color: #6717cd;
  padding-block: 10px;
  padding-inline: 30px;
  border: 1px solid #6717cd;
  border-radius: 100px;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const PurpleButton = styled.button`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  background: #6717cd;
  color: white;
  padding-block: 10px;
  padding-inline: 30px;
  border-radius: 100px;
  border: none;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const RedButton = styled.button`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  background: #dc3545;
  color: white;
  padding-block: 10px;
  padding-inline: 30px;
  border-radius: 100px;
  border: none;
  &:hover {
    background-color: #842029;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
