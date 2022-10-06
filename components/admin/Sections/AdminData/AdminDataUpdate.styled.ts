import styled from "styled-components";

export const UserContain = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 342;
  padding: 15px;
  gap: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const TitleContain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const OptionRole = styled.div`
  &:hover {
    background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
    color: white;
    border-radius: 10px 10px 8px 8px;
  }
  input {
    &[type="radio"] {
      display: none;
    }
  }
`;
export const ButtonRoleContain = styled.div`
  display: flex;
  justify-content: center;
`;
export const UpdateButton = styled.button`
  background-color: #6717cd;
  color: #fff;
  padding-block: 10px;
  padding-inline: 25px;
  border-radius: 30px;
  border: none;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const OptionRoleContain = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  color: black;
  right: 0;
  top: 50px;
  width: 150px;
  position: absolute;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;
export const IconRoleContain = styled.div`
  display: flex;
  position: relative;
  width: 150px;
  top: -40px;
`;
export const SelectedRoleContain = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 15px;
  padding-left: 15px;
  width: 150px;
  height: 44px;
  font-family: "Montserrat", sans-serif;
  padding-block: 10px;
  border-radius: 30px;
  border: 1px solid #6717cd;
  z-index: 5;
`;
export const FirstBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin: 0;
`;
export const CloseIcon = styled.i`
  background-image: url(../images/admin/close.svg);
  background-repeat: no-repeat;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
export const ProfileContain = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
`;
export const ProfilePic = styled.i`
  background-image: url(../images/admin/ProfileIcon.png);
  background-repeat: no-repeat;
  width: 120px;
  height: 120px;
`;
export const Level = styled.i`
  position: absolute;
  transform: translate(-60%, 58%);
  bottom: 5%;
  right: 20%;
  width: 55px;
  height: 55px;
`;
export const Columns = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ColumnContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 180px;
`;
export const Info = styled.p`
  display: flex;
  flex-direction: column;
  font-family: "Raleway", sans-serif;
  font-size: 14px;
  margin: 0;
  width: 180px;
  height: 60px;
`;
export const Label = styled.label`
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #6717cd;
  margin: 0;
`;
export const Courses = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const TitleBox = styled.p`
  font-family: "Raleway", sans-serif;
  font-size: 14px;
  margin: 0;
`;
export const CourseContain = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
export const TransparentButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  background: transparent;
  color: #6717cd;
  padding-block: 10px;
  padding-inline: 30px;
  border: 1px solid #6717cd;
  border-radius: 100px;
  width: fit-content;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const TransparentButton2 = styled.button`
  display: flex;
  justify-content: right;
  width: 270px;
  height: 43px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  background: transparent;
  color: #6717cd;
  padding-block: 9px;
  padding-inline: 15px;
  border: 1px solid #6717cd;
  border-radius: 100px;
`;
export const PayContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const LastContainer = styled.div`
  display: flex;
  gap: 10px;
`;
export const Image1 = styled.i`
  background-image: url(../images/admin/User/D1.png);
  background-repeat: no-repeat;
  width: 151px;
  height: 70px;
`;
export const Image2 = styled.i`
  background-image: url(../images/admin/User/D2.png);
  background-repeat: no-repeat;
  width: 151px;
  height: 70px;
`;
export const Image3 = styled.i`
  background-image: url(../images/admin/User/D3.png);
  background-repeat: no-repeat;
  width: 151px;
  height: 70px;
`;
export const Pay1 = styled.i`
  background-image: url(../images/VisaPay.png);
  background-repeat: no-repeat;
  background-position: center;
  width: 95px;
  height: 66px;
`;
export const Pay2 = styled.i`
  background-image: url(../images/PaypalPay.png);
  background-repeat: no-repeat;
  background-position: center;
  width: 95px;
  height: 66px;
`;
