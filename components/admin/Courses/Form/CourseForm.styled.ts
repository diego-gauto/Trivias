import styled from "styled-components";

export const CourseFormContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
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
export const TagContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
export const Select = styled.select`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  width: 100%;
  padding:10px 0 10px 20px;
  border:1px solid #6717CD;
  border-radius:20px;
  outline:none;
  cursor: pointer;
  -webkit-appearance: none;
`;
export const TagTitle = styled.p`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  color: #6717CD;
  margin: 0;
`;
export const TagLabel = styled.label`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  margin: 0;
  display: block;
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input{
    position: absolute;
    opacity: 0;
    cursor: pointer;
    &:hover ~ span {
      background: #ccc;
    }
    &:checked + span{
      background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
      &::after{
        display: block;
      }
    }
  }
  span{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 20px;
    width: 20px;
    background-color: white;
    border:1px solid black;
    border-radius: 50%;
    &::after {
    top: 0;
     left: 0;
     width: 18px;
     height: 18px;
     border-radius: 50%;
     background: transparent;
     border: 2px solid white;
     content: "";
      position: absolute;
      display: none;
   }
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