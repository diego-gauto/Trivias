import styled from "styled-components";

export const ModalContain = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  flex-direction: column;
  width: 100%;
`;
export const TitleContain = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.p`
  font-size: 24px;
  font-family: 'Montserrat',sans-serif;
  margin: 0;
`;
export const InputContain = styled.div`
  display: flex;
  flex-direction:column;
  position: relative;
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
  border-radius: 100px;
  :focus{
    outline: 1px solid #8E2DE2;
  }
`;
export const Input2 = styled.div`
  width: 100%;
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  padding-inline: 50px 20px;
  padding-block: 10px;
  height: 43px;
  border:1px solid #6717CD;
  border-radius:20px;
  input::file-selector-button {
    display: none;
  }
  label{
    color: #6717CD;
  }
  :focus{
    outline: 1px solid #8E2DE2;
  }
`;
export const InputBig = styled.textarea`
  font-size: 12px;
  font-family:'Montserrat',sans-serif;
  text-align: justify;
  padding-block: 10px;
  width:100%;
  height:100px;
  padding-inline: 20px;
  border:1px solid #6717CD;
  border-radius: 10px;
  overflow: hidden;
  resize: none;
  :focus{
    outline: 1px solid #8E2DE2;
  }
::placeholder{
}
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
export const Button = styled.button`
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  padding-block: 15px;
  padding-inline: 25px;
  background: #6717CD;
  border-radius: 100px;
  color: white;
  border: none;&:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const ButtonTransparent = styled.button`
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  padding-block: 15px;
  padding-inline: 25px;
  background: white;
  border-radius: 100px;
  color: #6717CD;
  border: 1px solid #6717CD;
`;
export const IconContain = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;
export const Folder = styled.i`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
  background-image: url(../images/admin/Rewards/folder.png);
  background-repeat: no-repeat;
  height: 24px;
  width: 24px;
  pointer-events: none;
`;
export const Selected = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 16px;
  padding-left: 20px;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  padding-block: 10px;
  border-radius: 100px;
  border: 1px solid #6717CD;
  z-index: 5;
`;
export const SelectContain = styled.div`
  position: relative;
  width: 100%;
`;
export const OptionContain = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: 100%;
  color: black;
  right:0;
  position: absolute;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;
export const Option = styled.div`
  width: 100%;
  &:hover{
    background: linear-gradient(135deg,#8E2DE2 0%,#4A00E0 100%);
    color:white;
    &:first-child {
      border-radius: 10px 10px 0 0;
    }
    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
  input{
    &[type="radio"]{
      display: none;
    }
  }
`;
export const LabelSelect = styled.label`
  display: flex; 
  font-size: 16px;
  gap: 5px;
  padding-block: 10px;
  padding-inline: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  white-space: nowrap;
`;
export const CaretD = styled.i`
  position: absolute;
  top: 70%;
  transform: translateY(-50%);
  right: 15px;
  background-image: url(../images/admin/Courses/caret-down.png);
  background-repeat: no-repeat;
  height: 24px;
  width: 20px;
  pointer-events: none;
`;