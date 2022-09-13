import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:70%;
  gap: 30px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  @media (max-width: 1023px){
    padding: 10px;
    box-shadow: none;
    gap: 0;
  }
  @media (max-width: 900px){
    width:100%;
  }
`;
export const TitleContain = styled.div`
  display: flex;
  gap: 50px;
  @media (max-width: 1023px){
    display: none;
  }
`;
export const IconContain = styled.div`
  display: none;
  @media (max-width: 1023px){
    display: flex;
    padding-inline: 50px;
    justify-content: space-between;
  }
  @media (max-width: 600px){
    padding-inline: 30px;
  }
  @media (max-width: 374px){
    padding-inline: 15px;
  }
`;
export const SelectContain = styled.div`
  display: flex;
  position: relative;
  background-color: white;
  padding-block: 10px;
  padding-inline: 30px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px -8px 10px 0px rgba(0, 0, 0, 0.2);
  @media (max-width: 600px){
    padding-block: 5px;
    padding-inline: 15px;
  }
`;
export const UnSelected = styled.div`
  display: flex;
  padding-block: 10px;
  padding-inline: 30px;
  @media (max-width: 600px){
    padding-block: 5px;
    padding-inline: 15px;
  }
`;
export const Titles = styled.p`
  font-size: 16px;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
  color: #6717CD;
  margin: 0;
  cursor: pointer;
`;
export const PositionTitle = styled.p<{position:any}>`
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  color: #6717CD;
  margin: 0;
  @media (max-width: 1023px){
    display: none;
  }
  ${props => props.position == 1 && css`
      font-weight:700;
  `}
  ${props => props.position == 2 && css`
      font-weight:700;
  `}
  ${props => props.position == 3 && css`
      font-weight:700;
  `}
  ${props => props.position == 4 && css`
  font-weight:700;
`}
`;
export const ListIcon = styled.i`
  -webkit-mask-image: url(../images/Video/icons/list2.png);
  background-color: #8E2DE2 ;
  height: 32px;
  width: 32px;
  display: none;
  cursor: pointer;
  @media (max-width: 1023px){
    display: flex;
  }
`;
export const EaselIcon = styled.i`
  -webkit-mask-image: url(../images/Video/icons/easel.png);
  background-color: #8E2DE2 ;
  height: 32px;
  width: 32px;
  display: none;
  cursor: pointer;
  @media (max-width: 1023px){
    display: flex;
  }
`;
export const BookIcon = styled.i`
  -webkit-mask-image: url(../images/Video/icons/book.png);
  background-color: #8E2DE2 ;
  height: 32px;
  width: 32px;
  display: none;
  cursor: pointer;
  @media (max-width: 1023px){
    display: flex;
  }
`;
export const ChatboxIcon = styled.i`
  -webkit-mask-image: url(../images/Video/icons/chatbox.png);
  background-color: #8E2DE2 ;
  height: 32px;
  width: 32px;
  display: none;
  cursor: pointer;
  @media (max-width: 1023px){
    display: flex;
  }
`;
