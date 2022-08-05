import styled from "styled-components";

export const CourseFormContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  width: 100%;
`;
export const Title = styled.h1`
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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
  &:hover{
    background: #5b02cc;
  }
`;
export const InputForm = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
export const InputContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const IconContain = styled.div`
  display: flex;
  position: relative;
`;
export const InputContain2 = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  gap: 20px;
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
  width: 100%;
  border:1px solid #6717CD;
  border-radius:20px;
  :focus{
    outline: 1px solid #8E2DE2;
  }
`;
export const InputIcon = styled.input`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  padding-inline: 50px 20px;
  padding-block: 10px;
  width: 100%;
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
  height:100%;
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