import styled from "styled-components";

export const ModalContain = styled.div`
  display: flex;
  flex-direction: column;
  //height: 0px;
  padding: 15px;
  gap: 20px;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  .custom-modal {
    padding: 20px;
  }
`;
export const ModalCustom = styled.div`
  padding: 20px;
  h2 {
    color: #6717cd;
  }
  p {
    color: #6717cd;
    margin: 0;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
`;
export const IconRoleContain = styled.div`
  display: flex;
  position: relative;
`;
export const TitleContain = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const SectionOptions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
export const RowContain = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
`;
export const OptionsContain = styled.div`
  display: flex;
`;
export const Title = styled.p`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const SelectedRoleContain = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  padding: 10px;
  font-family: "Montserrat", sans-serif;
  padding-block: 5px;
  border-radius: 15px;
  gap: 10px;
  border: 1px solid #6717cd;
  z-index: 5;
  li {
    list-style-type: none;
  }
  input {
    //z-index: -1;
  }
  .role-row {
    display: flex;
    flex-direction: column;
    .tasks {
      padding-left: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
  .open-courses {
    color: #6717cd;
    cursor: pointer;
    &:hover {
      font-weight: 700;
    }
  }
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;
