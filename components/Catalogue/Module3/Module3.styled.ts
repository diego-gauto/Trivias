import styled from "styled-components";

export const Maincontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ImageContent = styled.div`
  display: flex;
  position: relative;
`;
export const InsideContent = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  @media( max-width: 1023px){
    display: none;
  }
`;
export const InsideText = styled.p`
  opacity:.8;
  border: 1px solid white;
  border-radius: 12px;
  padding-block: 3px;
  padding-inline: 20px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  margin: 10px;
  @media( max-width: 1023px){
    font-size: 10px;
    padding-inline: 10px;
  }
`;

export const TextContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding:10px;
  @media( max-width: 600px){
    display: none;
  }
`;
export const Text1 = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  @media( max-width: 1023px){
    font-size: 14px;
  }
`;
export const Text2 = styled.span`
  font-size: 12px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media( max-width: 1023px){
    font-size: 10px;
  }
`;
export const Text3 = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media( max-width: 1023px){
    display: none;
  }
`;
export const ViewCourse = styled.p`
  padding-block: 15px;
  color: #6717CD;
  text-align: center;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 0;
  &:hover{
    color: white;
    background-color: #6717CD;
    border-radius: 0 0 10px 10px;
  }
  @media( max-width: 1023px){
    padding-block: 10px;
    font-size: 14px;
  }
`;
export const DaysLeft = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  font-family: 'Montserrat', sans serif;
  transform: rotate(-40deg);
  color: white;
  top: 30px;
  left: 15px;
  z-index: 2;
`;
export const Band = styled.i`
  background-image: url(../images/Band.png);
  background-repeat:no-repeat;
  width: 132px;
  height: 109px;
  cursor:pointer;
  position: absolute;
  top: -5px;
  left: -5px;
  z-index: 1;
`;