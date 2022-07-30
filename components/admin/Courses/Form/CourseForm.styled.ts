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
  padding:10px 0 10px 20px;
  border:1px solid #6717CD;
  border-radius:20px;
  outline:none;
`;
export const TagTitle = styled.p`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  color: #6717CD;
  margin: 0;
`;
export const TagDiv = styled.div`
  display: flex;
  padding-left: 20px;
  gap: 5px;
`;
export const Tags = styled.input`
`;
export const TagLabel = styled.label`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  margin: 0;
`;
