import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 20px;
  padding-inline: 30px;
  gap: 20px;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const TitleContain = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
`;
export const Title = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const Content = styled.p`
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;
export const TransparentButton = styled.button`
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  background: transparent;
  color: #6717cd;
  padding-block: 10px;
  padding-inline: 30px;
  border: 1px solid #6717cd;
  border-radius: 100px;
`;
export const PurpleButton = styled.button`
  display: flex;
  gap: 5px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  background: #6717cd;
  color: white;
  padding-block: 10px;
  padding-inline: 30px;
  border-radius: 100px;
  border: none;
`;
export const Trash = styled.i`
  background-image: url(../images/admin/Courses/trashInv.png);
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
`;
