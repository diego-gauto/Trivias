import { ModalHeader } from "react-bootstrap";
import styled from "styled-components";

export const ModContainer = styled.div`
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;
export const Title = styled(ModalHeader)`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  border: none;
  padding: 0;
`;
export const DataContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const InputContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
    color: #8e2de2;
    font-weight: 600;
    margin: 0;
  }
  input {
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
    padding-inline: 20px;
    padding-block: 10px;
    width: 100%;
    border: 1px solid #6717cd;
    border-radius: 20px;
    :focus {
      outline: 1px solid #8e2de2;
    }
  }
  select {
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
    padding-inline: 20px;
    padding-block: 10px;
    width: 100%;
    border: 1px solid #6717cd;
    border-radius: 20px;
    :focus {
      outline: 1px solid #8e2de2;
    }
  }
  textarea {
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
    text-align: justify;
    padding-block: 10px;
    padding-inline: 20px;
    height: 108px;
    border: 1px solid #6717cd;
    border-radius: 10px;
    overflow: hidden;
    resize: none;
    :focus {
      outline: 1px solid #8e2de2;
    }
  }
`;
export const ItemContain = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Text = styled.p`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  margin: 0;
`;
export const Text2 = styled.p`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  color: #8e2de2;
  font-weight: 600;
  margin: 0;
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
  button {
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    padding-block: 15px;
    padding-inline: 25px;
    background: #6717cd;
    border-radius: 100px;
    color: white;
    border: none;
    &:hover {
      background-color: #5000b5;
      transform: scale(1.03);
      transition: 0.5s ease all;
    }
  }
`;
export const SafeContained = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

p{
  font-size: 16px;
  font-family:'Montserrat',sans-serif;
  color: #33C600;
  font-weight: 600;
  margin: 0;
}
button{
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  padding-block: 15px;
  padding-inline: 25px;
  background: #33C600;
  border-radius: 100px;
  color: white;
  border: none;
  &:hover{
    transform:scale(1.1);
    transition:.5s ease all;
  }
`;
