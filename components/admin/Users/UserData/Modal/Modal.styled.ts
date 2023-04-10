import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 20px;
  padding-inline: 30px;
  gap: 20px;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const TitleContain = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.p`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const Data = styled.div`
  display: flex;
  gap: 40px;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Text1 = styled.p`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  margin: 0;
`;
export const Text2 = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #6717cd;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const InputContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Label = styled.label`
  font-size: 14px;
  color: #6717cd;
  font-family: "Montserrat", sans-serif;
`;
export const Input = styled.input`
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  padding-inline: 20px;
  padding-block: 10px;
  border: 1px solid #6717cd;
  border-radius: 20px;
  outline: none;
  :focus {
    border: 2px solid #8e2de2;
  }
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
`;
export const PurpleButton = styled.button`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  padding-block: 15px;
  padding-inline: 25px;
  background: #6717cd;
  border-radius: 30px;
  color: white;
  border: none;
  width: fit-content;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const MainCard = styled.div`
  display: flex;
  justify-content: center;
`;
export const Card = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
export const ImageContain = styled.div`
  display: flex;
  position: relative;
  .img-course {
    width: 100%;
    border-radius: 10px 10px 0 0;
  }
`;
export const CardContain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export const CardTitle = styled.p`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const CardSubTitle = styled.p`
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  margin: 0;
`;
export const LessonText = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  color: #6717cd;
  opacity: 0.8;
  font-weight: 600;
  padding-block: 3px;
  padding-inline: 20px;
  border-radius: 10px;
  border: 2px solid #6717cd;
`;
export const IconContain = styled.div`
  display: flex;
  position: relative;
`;
export const CaretD = styled.i`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  background-image: url(../images/admin/Courses/caret-down.png);
  background-repeat: no-repeat;
  height: 24px;
  width: 20px;
  pointer-events: none;
`;
