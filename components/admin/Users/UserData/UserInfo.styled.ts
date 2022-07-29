import styled from "styled-components";

export const UserContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 20px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const TitleContain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const FirstBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const Title = styled.h1`
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 16px;
  margin: 0;
`;
export const CloseIcon = styled.i`
  background-image: url(../images/admin/close.png);
  background-repeat:no-repeat;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;