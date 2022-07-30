import styled from "styled-components";

export const CouponContain = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  gap: 20px;
`;
export const Container = styled.div`
  display: flex;
  padding-block: 20px;
  padding-inline: 40px;
  min-width: 430px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  flex-direction: column;
  gap: 20px;
  height: fit-content;
`;
export const Title = styled.div`
  font-size: 24px;
  font-family:'Montserrat',sans-serif;
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
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
`;
export const PurpleButton = styled.button`
  font-size: 16px;
  font-family:'Montserrat',sans-serif;
  background: #6717CD;
  color: white;
  padding-block: 10px;
  padding-inline: 30px;
  border-radius: 100px;
  border: none;
`;
export const SelectContain = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 40px;
`;
export const RadioContain = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  div{
    font-size: 14px;
    font-family:'Montserrat',sans-serif;
  }
`;
export const Tags = styled.input`
`;
export const TagLabel = styled.label`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  margin: 0;
`;
export const TableContain = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  height: fit-content;
  width: 100%;
`;
export const TableTitle = styled.p`
  font-size: 24px;
  font-family:'Montserrat',sans-serif;
  margin: 0;
`;
export const TitleContain = styled.div`
  padding-block: 20px;
  padding-inline: 40px;
`;
export const ActiveLbl = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
`;
export const Active = styled.input`
  width: 14px;
  height: 14px;
  &:hover ~ ${ActiveLbl} {
    background: #bebebe;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 6px;
      background: #eeeeee;
    }
  }
  ${(props) =>
    props.checked &&
    ` 
    &:checked + ${ActiveLbl} {
      background: #db7290;
      border: 1px solid #db7290;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        margin: 6px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: white;
      }
    }
  `}
`;
export const IconContain = styled.div`
  display: flex;
  padding-left: 20px;
`;