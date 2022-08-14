import styled, { css } from "styled-components";

export const TabContain = styled.div`
  display: flex;
  width: 100%;
  padding-inline: 40px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  padding-top: 40px;
  padding-inline: 30px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  position: relative;
  gap: 70px;
`;
export const ContainerLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
export const LevelContain = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 3px;
`;
export const AllLevels = styled.div`
  display: flex;
  gap: 3px;
  justify-content: center;
`;
export const LevelCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
`;
export const Level = styled.p`
  position: absolute;
  font-size: 14px;
  top: 40px;
  font-family: 'Raleway', sans-serif;
  text-align: center;
  white-space: nowrap;
  color: #6717CD;
  margin: 0;
  label{
    font-family: 'Raleway', sans-serif;
  }
`;
export const Divider = styled("div")<{size:any, i:any}>`
  border-radius: 10px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  width: 100px;
  height: 4px;
  ${props => (props.i == props.size) && css`
  display: none;
  `}
`;

export const ButtonContain = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const TransparentButton = styled.button`
  display: flex;
  gap: 10px;
  font-size: 16px;
  font-family:'Montserrat',sans-serif;
  background: transparent;
  color: #6717CD;
  padding-block: 10px;
  padding-inline: 30px;
  border: 1px solid #6717CD;
  border-radius: 100px;
`;
export const Grid = styled.i`
  background-image: url(../images/admin/grid.png);
  background-repeat: no-repeat;
  height: 21px;
  width: 21px;
`;