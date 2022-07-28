import styled from "styled-components";

export const GeneralContain = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  //padding-top: 20px;
  gap: 20px;
  background-color: #f3f3f5;
`;
export const HeaderMenu = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding-inline: 0px;
  background: #FFFFFF;
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
  margin-left: 3%;
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
  gap:20px;
`;
export const OptionBtn = styled.div`
  display: flex;
  width: 380px;
  justify-content: center;
  height: 112px;
  left: 40px;
  top: 239px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  align-items: center;
  text-align: center;
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  &:hover {
    background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
    transform:scale(1.03);
    transition:.5s ease all;
    color: white;
    cursor: pointer;
  }
`;
