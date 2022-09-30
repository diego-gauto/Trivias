import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 20px;
  width: 100%;
`;
export const TitleContain = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.h1`
  font-size: 36px;
  font-family:'Montserrat',sans-serif;
  margin: 0;
`;
export const Button = styled.button`
  display: flex;
  gap: 5px;
  font-size: 16px;
  font-family:'Montserrat',sans-serif;
  font-weight: 600;
  background: transparent;
  color: #6717CD;
  border: 1px solid #6717CD;
  border-radius: 30px;
  padding-block: 10px;
  padding-inline: 20px;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const TrashIcon = styled.i`
  background-image: url(../images/trash.png);
  background-repeat: no-repeat;
  height: 21px;
  width: 20px;
  cursor: pointer;
`;
export const EditContain = styled.div`
  display: flex;
  padding: 20px;
  gap: 10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
export const Contain1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 33.33%;
  align-items: center;
`;
export const ImageContain = styled.div`
  display: flex;
  width: 320px;
  height: 200px;
  position: relative;
img{
  width: 100%;
  height: auto;
  border-radius: 10px;
}
`;
export const Contain2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 33.33%;
`;
export const Contain3 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 33.33%;
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
export const Extra = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border:1px solid #6717CD;
  border-radius: 10px;
  padding-inline: 20px;
  padding-block: 10px;
  p{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-family:'Montserrat',sans-serif;
    margin: 0;
  }
  i{
    cursor: pointer;
    font-style: normal;
    font-weight: 600;
  }
`;
export const Input = styled.input`
  font-size: 14px;
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
export const InputSelect = styled.input`
  font-size: 14px;
  position: relative;
  font-family:'Montserrat',sans-serif;
  width: 100%;
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
  height: 200px;
  padding-inline: 20px;
  border:1px solid #6717CD;
  border-radius: 10px;
  overflow: hidden;
  resize: none;
  outline: none;
  :focus{
    border: 2px solid #8E2DE2;
  }
`;

export const HwTitle = styled.p`
  font-size: 24px;
  font-family:'Montserrat',sans-serif;
  margin-bottom: 15px;
`;
export const SlideContain = styled.div`
  display: flex;
  gap: 10px;
`;
export const TitleSlide = styled.p`
  font-size: 16px;
  font-family:'Montserrat',sans-serif;
  font-weight: 600;
  margin-bottom: 9px;
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
export const TransparentButton = styled.button`
  font-size: 16px;
  font-family:'Montserrat',sans-serif;
  background: transparent;
  color: #6717CD;
  padding-block: 10px;
  padding-inline: 30px;
  border: 1px solid #6717CD;
  border-radius: 100px;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
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
export const Folder = styled.i`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
  background-image: url(../images/admin/Rewards/folder.png);
  background-repeat: no-repeat;
  height: 24px;
  width: 24px;
  z-index: 1;
`;