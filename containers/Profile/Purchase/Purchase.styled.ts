import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  flex-direction:column;
  gap:25px;
  background-color:white;
  width: 100%;
  min-height:100vh;
  padding-block:40px;
  padding-inline:90px;
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const Title = styled.h1`
  font-family:'Montserrat',sans-serif;
  font-size: 36px;
  font-weight: 400;
  margin:0;
`;
export const PayBox = styled.div`
  display:flex;
  flex-direction:column;
  gap:20px;
  width:100%;
`;
export const DataPayment = styled.div`
  display:flex;
  width:100%;
  padding-block:30px;
  padding-inline:30px;
  position:relative;
  gap:5px;
  justify-content:center;
  align-items:center;
  border-radius:10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const DataPaymentContain = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
`;
export const ProcessText = styled.p`
  font-family:'Montserrat',sans-serif;
  font-size: 16px;
  font-weight: 600;
  position:absolute;
  color:#6717CD;
  text-align:center;
  margin:0;
  bottom:0px;
`;
export const ProcessText2 = styled.p`
  font-family:'Raleway',sans-serif;
  font-size: 14px;
  font-weight: 400;
  position:absolute;
  text-align:center;
  margin:0;
  bottom:0px;
`;
export const ProcessCircle = styled.div`
  width:50px;
  height:50px;
  border:1px solid #8E2DE2;
  border-radius:25px;
`;
export const ProcessCircle2 = styled.div`
  width:30px;
  height:30px;
  border-radius:15px;
  border:1px solid gray;
`;
export const Division = styled.div`
  width:200px;
  height:4px;
  background:gray;
`;
export const SubContainer = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:20px;
  width:100%;
`;
export const SubContainer2 = styled.div`
  display:flex;
  flex-direction:column;
  gap:30px;
  width:50%;
  flex: 1 413px;
`;
export const ContainTitle = styled.h1`
  font-weight:600;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  margin:0;
`;
export const PaymentContain = styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
  padding:20px;
  width:100%;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const PaymentMethod = styled.div`
  display:flex;
  padding-block:10px;
  padding-inline:20px;
  align-items:center;
  gap: 10px;
  width:100%;
  border-radius:6px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const PayText = styled.p`
  font-weight:600;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  margin:0;
`;
export const VisaIcon = styled.i`
  background-image: url(../images/Visa.png);
  background-repeat:no-repeat;
  height: 32px;
  width: 47px;
  background-position: center;
`;
export const PaypalIcon = styled.i`
  background-image: url(../images/Paypal.png);
  background-repeat:no-repeat;
  height: 32px;
  width: 47px;
  background-position: center;
`;
export const NewMethodContain = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
`;
export const NewMethod = styled.div`
  display:flex;
  gap:20px;
  width:100%;
`;
export const NewMethodBox = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  padding-block:30px;
  width:50%;
  border-radius:10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const ButtonContain = styled.div`
  display:flex;
  justify-content:space-between;
`;
export const TransparentButton = styled.button`
  font-family:'Montserrat',sans-serif;
  font-size:16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background:transparent;
  color: #6717CD;
  border-radius: 30px;
  border:1px solid #6717CD;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const PurpleButton = styled.button`
  font-family:'Montserrat',sans-serif;
  font-size:16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background-color: #6717CD;
  color: #fff;
  border-radius: 30px;
  border:none;
  &:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const PurchaseContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex: 1 413px;
  gap: 20px;
  padding:20px;
  border-radius: 10px;
  width:50%;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const CourseId = styled.p`
  font-size: 14px;
  font-family:'Raleway',sans-serif;
  margin:0;
`;
export const CourseName = styled.h1`
  font-size: 24px;
  font-weight: 600;
  font-family:'Montserrat',sans-serif;
  display:flex;
  justify-content:space-between;
  margin:0;
`;
export const CourseCost = styled.span`
  color: #8E2DE2;
  font-size: 24px;
  font-family:'Montserrat',sans-serif;
`;
export const CardContain = styled.div`
  display:flex;
  justify-content:center;
  padding-inline:20px;
`;
export const Card = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  border-radius:10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
`;
export const CourseText = styled.div`
  display:flex;
  flex-direction:column;
  padding:20px;
`;
export const CourseImage = styled(Image)`
  border-radius: 10px 10px 0 0;
`;
export const TitleCourse = styled.p`
  font-size: 24px;
  font-family:'Montserrat',sans-serif;
  font-weight:600;
  margin:0;
`;
export const Subtitle = styled.p`
  font-size: 12px;
  font-family:'Raleway',sans-serif;
  margin:0;
`;
export const CourseInfo = styled.p`
  font-size: 14px;
  font-family:'Raleway',sans-serif;
  margin:0;
`;