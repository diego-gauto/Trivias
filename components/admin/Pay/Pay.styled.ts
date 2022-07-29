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
  padding-block: 10px;
  padding-inline: 20px;
  border-radius: 30px;
  border: 1px solid #6717CD;
`;
export const Table = styled.table`
td{
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  padding-left: 10px;
  padding-block: 15px;
  text-align: left;
}
  th{
    padding-left: 10px;
    padding-block: 15px;
    text-align: left;
    background-color: #6717CD;
    color: white;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    }
tr{  
  &:hover {
  background: #d3d3d3;
}
  border-bottom: 1px solid gray;
  &:first-child {
    border-bottom: none;
 }
  &:last-child {
    border-bottom: none;
 }
}
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
