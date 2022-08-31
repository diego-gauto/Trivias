import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  display: flex;
  gap: 40px;
  width: 90%;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  ::-webkit-scrollbar{
    display: none;
  }
`;
export const ItemContain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
export const ImageContain = styled.div`
  display: flex;
  width: 260px;
  height: 260px;
  position: relative;
  @media(max-width: 620px){ 
    width: 200px;
    height: 200px;
  }
  @media(max-width: 560px){ 
    width: 150px;
    height: 150px;
  }
`;
export const Title = styled.p`
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  margin: 0;
`;
export const SubTitle = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const CreateIcon = styled.i`
  background-image: url(../images/admin/Rewards/create.png);
  background-repeat: no-repeat;
  position: absolute;
  top: 20px;
  right: 20px;
  height: 32px;
  width: 32px;
  cursor: pointer;
  z-index: 10;
`;
export const Image = styled.img`
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  height: auto;
  &:hover{
    box-shadow: 0px 0px 10px 2px #6717CD;
  }
`;

export const NewPrize = styled.div`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  display: flex;
  min-width: 278px;
  min-height: 278px;
  max-height: 278px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
  `;
export const PrizeText = styled.p`
  font-size: 16px;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  margin: 0;
`;
export const Add = styled.i`
  background-image: url(../images/admin/Rewards/add.png);
  background-repeat: no-repeat;
  height: 78px;
  width: 78px;
`;