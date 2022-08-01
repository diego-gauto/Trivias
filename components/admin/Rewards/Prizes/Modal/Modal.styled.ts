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
  border-radius:20px;
  :focus{
    outline: 1px solid #8E2DE2;
  }
`;
export const Input2 = styled.input`
  width: 100%;
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  padding-inline: 50px 20px;
  padding-block: 10px;
  border:1px solid #6717CD;
  border-radius:20px;
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
`;