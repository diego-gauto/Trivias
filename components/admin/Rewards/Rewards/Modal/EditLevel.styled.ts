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
export const Level = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat',sans-serif;
  margin: 0;
`;
export const LevelContain = styled.div`
  display: flex;
  gap: 10px;
  padding-block: 10px;
  padding-inline: 20px;
  flex-direction: column;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export const Add = styled.div`
  display: flex;
  padding-block: 50px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
`;
export const AddText = styled.p`
  display: flex;
  gap: 5px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat',sans-serif;
  color: #6717CD;
  margin: 0;
`;
export const AddIcon = styled.i`
  background-image: url(../images/admin/Rewards/add2.png);
  background-repeat: no-repeat;
  height: 24px;
  width: 24px;
`;
export const Close = styled.i`
  background-image: url(../images/admin/Rewards/close.png);
  background-repeat: no-repeat;
  height: 24px;
  width: 24px;
  cursor: pointer;
`;
export const  Contain = styled.div`
  display: flex;
  gap: 30px;
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
  width: 100%;
  font-family:'Montserrat',sans-serif;
  padding-inline: 20px;
  padding-block: 10px;
  border:1px solid #6717CD;
  border-radius:20px;
  :focus{
    outline: 1px solid #8E2DE2;
  }
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
`;
export const Button = styled.button`
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  padding-block: 15px;
  padding-inline: 25px;
  background: #6717CD;
  border-radius: 30px;
  color: white;
  border: none;
`;