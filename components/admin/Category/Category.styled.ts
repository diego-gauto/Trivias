import styled from "styled-components";

export const CategoryContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

export const TitleContain = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
export const Title = styled.h1`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const FormContain = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
  img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }
  .inputs {
    display: flex;
    gap: 10px;
    width: 100%;
    @media (max-width: 820px) {
      flex-wrap: wrap;
      width: 100%;
    }
  }
`;
export const InputContain = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  input::file-selector-button {
    display: none;
  }
  @media (max-width: 700px) {
    max-width: 500px;
    width: 100% !important;
  }
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
  border-radius: 100px;
  outline: none;
  :focus {
    border: 2px solid #8e2de2;
  }
`;
export const Button = styled.button`
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
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;
export const CatContain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 820px) {
    flex-direction: column-reverse;
  }
`;
export const CatText = styled.p`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #6717cd;
  white-space: nowrap;
  margin: 0;
  @media (max-width: 600px) {
    white-space: initial;
  }
`;
export const CatData = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const EditIcon = styled.i`
  background-image: url(../images/admin/create.svg);
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export const CloseIcon = styled.i`
  background-image: url(../images/admin/close.svg);
  background-position: center;
  background-repeat: no-repeat;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
export const EditCat = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 820px) {
    width: 100%;
  }
`;
