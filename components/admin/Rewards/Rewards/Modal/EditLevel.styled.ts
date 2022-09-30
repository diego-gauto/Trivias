import styled from "styled-components";

export const ModalContain = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  flex-direction: column;
  width: 100%;
  height: 850px;
  overflow-y: auto;
  position: relative;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;

}
&::-webkit-scrollbar-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  ...
}
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
  gap: 15px;
  padding-block: 10px;
  padding-inline: 20px;
  flex-direction: column;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export const Add = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

`;
export const AddText = styled.p`
  display: flex;
  gap: 5px;
  font-size: 16px;
  padding-block: 10px;
  padding-inline: 20px;
  border-radius: 100px;
  border: 2px solid #6717CD;

  font-weight: 600;
  font-family: 'Montserrat',sans-serif;
  color: #6717CD;
  margin: 0;
  cursor: pointer;
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
  outline: none;
  :focus{
    border: 2px solid #8E2DE2;
  }
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
`;
export const Button = styled.button`
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  padding-block: 8px;
  padding-inline: 20px;
  background: #6717CD;
  border-radius: 100px;
  color: white;
  border: none;
  &:hover{
    transition: .2s ease all;
    background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
    padding-block: 10px;
    padding-inline: 22px;
  }
`;