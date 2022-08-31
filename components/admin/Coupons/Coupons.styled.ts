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
  &:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const SelectContain = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 40px;
`;
export const RadioContain = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 5px;
  div{
    font-size: 14px;
    font-family:'Montserrat',sans-serif;
  }
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
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  font-weight: 600;
  margin: 0;
`;
export const ActiveC = styled.div`
   position: relative;
   display: flex;
   width: 16px;
   height: 16px;
   border-radius: 50%;
   border: 1px solid #6717CD;
   div{
    margin: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #6717CD;
   }
`;
export const UnActiveLbl = styled.label`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  opactiy: .8;
  margin: 0;
`;
export const UnActive = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid gray;
`;
export const IconContain = styled.div`
  display: flex;
`;