import styled from 'styled-components';

export const GeneralContain = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
  background-color: #f3f3f5;
  @media (max-width: 1100px) {
    padding: 10px;
  }
`;
export const AllEditInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  /* Tablet */
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
  }

  /* Escritorio */
  @media screen and (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px;
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    background: #ffffff;
    padding: 20px;
    @media (max-width: 500px) {
      padding: 10px;
    }
  }
`;

export const ImageInGrid = styled.img`
  width: 100%;
  padding: 20px;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-bottom: 30px;
  @media (max-width: 1100px) {
    flex-wrap: wrap;
  }
`;
export const ColumnsContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 380px;
  width: 100%;
  margin-left: 320px;
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    background: #ffffff;
    padding: 20px;
    width: auto;
    @media (max-width: 500px) {
      padding: 10px;
    }
  }
`;
export const EditButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2%;
`;

export const EditInputResponsive = styled.input`
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  padding-block: 10px;
  padding-inline: 20px;
  border: 1px solid #6717cd;
  border-radius: 20px;
  outline: none;
  :focus {
    border: 2px solid #8e2de2;
  }
`;

export const EditInputTextAreaResponsive = styled.textarea`
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  padding-block: 10px;
  padding-inline: 15px;
  border: 1px solid #6717cd;
  border-radius: 2px;
  outline: none;
  resize: none;
  :focus {
    border: 2px solid #8e2de2;
  }
`;

export const EditInput = styled.input`
  font-size: 14px;
  width: 330px;
  font-family: 'Montserrat', sans-serif;
  padding-block: 10px;
  padding-inline: 20px;
  border: 1px solid #6717cd;
  border-radius: 20px;
  outline: none;
  :focus {
    border: 2px solid #8e2de2;
  }
`;
export const EditInput2 = styled.textarea`
  font-size: 14px;
  width: 330px;
  padding-inline: 20px;
  overflow: hidden;
  resize: none;
  font-family: 'Montserrat', sans-serif;
  padding: 15px;
  border: 1px solid #6717cd;
  border-radius: 20px;
  outline: none;
  :focus {
    border: 2px solid #8e2de2;
  }
`;
export const EditText = styled.label`
  font-size: 14px;
  color: #6717cd;
  font-family: 'Montserrat', sans-serif;
`;
export const FolderInput = styled.input`
  background-image: url(../images/admin/Rewards/folder.svg);
  background-repeat: no-repeat;
  background-position: 5% 50%;
  font-size: 14px;
  width: 330px;
  text-indent: 40px;
  font-family: 'Montserrat', sans-serif;
  padding: 10px;
  border: 1px solid #6717cd;
  border-radius: 20px;
  :focus {
    outline: 1px solid #8e2de2;
  }
  ::file-selector-button {
    display: none;
  }
`;

export const FolderInputResponsive = styled.input`
  background-image: url(../images/admin/Rewards/folder.svg);
  background-repeat: no-repeat;
  background-position: 5% 50%;
  font-size: 14px;
  text-indent: 60px;
  font-family: 'Montserrat', sans-serif;
  padding: 10px;
  border: 1px solid #6717cd;
  border-radius: 20px;
  :focus {
    outline: 1px solid #8e2de2;
  }
  ::file-selector-button {
    display: none;
  }
`;

export const InputsResponsive = styled.div`
  display: flex;
  flex-direction: column;
  select {
    padding-block: 10px;
    padding-inline: 20px;
    border-radius: 100px;
    border: 1px solid #6717cd;
  }
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  select {
    padding-block: 10px;
    padding-inline: 20px;
    border-radius: 100px;
    border: 1px solid #6717cd;
    max-width: 330px;
  }
`;
export const ProfileData = styled.div`
  padding: 10px;
  padding-top: 25px;
  @media (max-width: 1100px) {
    padding-inline: 0;
  }
`;
export const SaveButton = styled.button`
  padding-block: 15px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  padding-inline: 25px;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  border: none;
  border-radius: 30px;
  background-color: #6717cd;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const HeaderMenu = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding-inline: 0px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const AddText = styled.div`
  ont-family: 'Nunito', sans-serif;
  font-size: 18px;
`;
export const AddTextContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  justify-content: space-between;
  margin-right: 5%;
`;
export const AddTitle = styled.div`
  ont-family: 'Nunito', sans-serif;
  font-weight: 400;
  font-size: 36px;
  display: flex;
  width: 205px;
  height: 54px;
  left: 40px;
  top: 165px;
  margin: 2%;
`;
export const GonvarText = styled.div`
  display: absolute;
  color: #41417e;
  width: 98px;
  height: 24px;
  left: 31px;
  top: 103px;
  font-family: 'Nunito', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
`;
export const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;
export const HomePageContain = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;
export const OptionBtn = styled.div`
  display: flex;
  width: 380px;
  justify-content: center;
  height: 112px;
  background: #ffffff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  align-items: center;
  text-align: center;
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  @media (max-width: 1100px) {
    max-width: 380px;
    width: 100% !important;
  }
  &:hover {
    background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
    transform: scale(1.03);
    transition: 0.5s ease all;
    color: white;
    cursor: pointer;
  }
`;
export const OptionBtnOn = styled(OptionBtn)`
  background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
  color: white;
  &:hover {
    cursor: pointer;
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
export const columnsContainer = styled.div`
  display: flex;
`;
