import styled from "styled-components";

export const PayContain = styled.div`
  display: flex;
  width: 100%;
  padding: 40px;
  height: -webkit-fill-available;
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  flex-direction: column;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const TitleContain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
export const Title = styled.h1`
  font-family: 'Montserrat';
  font-size: 24px;
  margin: 0;
`;
export const DateSelect = styled.div`
  font-size: 14px;
  cursor: pointer;
  padding-block: 8px;
  padding-inline: 20px;
  background-color: white;
  min-width: 200px;
  border-radius: 30px;
  border: 1px solid #6717CD;
`;
export const ProfileContain = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const IconContain = styled.div`
  display: flex;
  align-items: center;
  border: 2.64589px solid #D9D9D9;
  border-radius: 5px;
  justify-content: center;
  width: 48px;
`;
export const Profile = styled.i`
  background-image: url(../images/admin/Profile.png);
  background-repeat: no-repeat;
  width: 32px;
  height: 32px;
`;
export const Visa = styled.i`
  background-image: url(../images/admin/VisaLogo.png);
  background-repeat:no-repeat;
  width: 35px;
  margin: 5px;
  height: 12px;
`;
export const MasterCard = styled.i`
  background-image: url(../images/admin/Mastercard.png);
  background-repeat:no-repeat;
  margin: 2px;
  width: 31px;
  height: 20px;
`;
export const PayPal = styled.i`
  background-image: url(../images/admin/PayPal.png);
  background-repeat:no-repeat;
  margin: 2px;
  width: 16px;
  height: 20px;
`;
export const ButtonIcon = styled.div`
  display: flex;
  position: relative;
`;
export const CaretD = styled.i`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  background-image: url(../images/admin/Courses/caret-down.png);
  background-repeat: no-repeat;
  height: 24px;
  width: 20px;
  pointer-events: none;
`;