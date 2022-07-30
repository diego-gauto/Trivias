import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction:column;
  padding-block: 20px;
  padding-inline: 30px;
  gap: 20px;
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const TitleContain = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const Text2 = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #6717CD;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const InputContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Label = styled.label`
  font-size: 14px;
  color: #6717CD;
  font-family: 'Montserrat',sans-serif;
`;
export const Input = styled.input`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  padding-inline: 20px;
  padding-block: 10px;
  border:1px solid #6717CD;
  border-radius:20px;
  :focus{
    outline: 1px solid #8E2DE2;
  }
`;
export const Select = styled.select`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  padding:10px 0 10px 20px;
  border:1px solid #6717CD;
  border-radius:20px;
  outline:none;
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
`;
export const PurpleButton = styled.button`
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  padding-block: 15px;
  padding-inline: 25px;
  background: #6717CD;
  border-radius: 30px;
  color: white;
  border: none;
  width: fit-content;
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
export const ImageContain= styled.div`
  display: flex;
  position: relative;
`;
export const CardContain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export const CardTitle = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const CardSubTitle = styled.p`
  font-size: 12px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const CardImage = styled.i`
  background-image: url(../images/admin/User/ImageCard.png);
  background-repeat: no-repeat;
  height: 180px;
  width: 389px;
`;
export const LessonText = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  color: white;
  opacity: .8;
  padding-block: 3px;
  padding-inline: 20px;
  border-radius: 10px;
  border: 1px solid white;
`;