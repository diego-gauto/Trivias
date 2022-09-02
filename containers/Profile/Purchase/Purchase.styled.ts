import Image from "next/image";
import styled, { css, keyframes } from "styled-components";
import InputMask from 'react-input-mask';

export const Container = styled.div`
  display:flex;
  flex-direction:column;
  gap:25px;
  background-color:white;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-block:10px;
  padding-inline:60px;
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @media(max-width: 1023px){
    padding-inline: 20px;
  }
`;
export const Title = styled.h1`
  font-family:'Montserrat',sans-serif;
  font-size: 36px;
  font-weight: 400;
  margin:0;
  @media(max-width: 1023px){
    display:none;
  }
`;
export const PayBox = styled.div`
  display:flex;
  align-items: center;
  flex-direction:column;
  gap: 20px;
  width: 100%;
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
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  @media(max-width: 1023px){
    display: none;
  }
`;
export const DataPaymentContain = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
`;
export const ProcessText = styled.p`
  font-family:'Montserrat',sans-serif;
  font-size: 14px;
  position:absolute;
  text-align:center;
  margin:0;
  bottom:0px;
`;
export const ProcessCircle = styled.div`
  width:32px;
  height:32px;
  border:1px solid gray;
  border-radius:25px;
`;
export const Division = styled.div`
  width:200px;
  height:4px;
  background:gray;
`;
export const TextPosition = styled.p`
  font-family:'Montserrat',sans-serif;
  font-size: 16px;
  font-weight: 600;
  position:absolute;
  color: #6717CD;
  text-align:center;
  margin:0;
  bottom:0px;
`;
export const CirclePosition = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #6717CD;
  border-radius:25px;
`;
export const Division2 = styled.div`
  width:200px;
  height:4px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
`;
export const PastText = styled.p`
  font-family:'Montserrat',sans-serif;
  font-size: 16px;
  position:absolute;
  color: #6717CD;
  text-align:center;
  margin:0;
  bottom:0px;
`;
export const PastCircle = styled.div`
  width:32px;
  height:32px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  border-radius:25px;
`;
export const SubContainer = styled.div`
  display:flex;
  justify-content: center;
  flex-wrap: wrap;
  gap:20px;
  width:100%;
`;
export const SubContainer2 = styled.div`
  display:flex;
  flex-direction:column;
  gap:30px;
  width:50%;
  flex: 1 480px;
  @media(max-width: 1023px){
    gap: 20px;
  }
`;
export const ContainTitle = styled.h1`
  display: flex;
  justify-content: space-between;
  font-weight:600;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  margin:0;
  @media(max-width: 400px){
    font-size: 14px;
  }
`;
export const PaymentContain = styled.div`
  display:flex;
  flex-direction:column;
  gap: 15px;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
`;
export const PaymentMethod = styled("div")<{active:any}>`
  ${props => (props.active == true) && css`
  box-shadow: 0px 0px 10px 1px rgba(103, 23, 205, 0.7) !important;
  `}
  display: flex;
  align-items: center;
  padding-block: 10px;
  padding-inline: 20px;
  gap: 10px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover{
    box-shadow: 0px 0px 10px 1px rgba(103, 23, 205, 0.7);
  }
`;
export const PayText = styled.p`
  text-align: center;
  font-weight:600;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  margin:0;
  @media(max-width: 1023px){
    font-size: 12px;
  }
`;
export const PayText2 = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  margin:0;
  @media(max-width: 1023px){
    display: none;
  }
`;
export const PaymentsContainer = styled.div`
  display:flex;
  gap: 10px;
`;
export const VisaPay = styled.i`
  background-image: url(../images/VisaPay.svg);
  background-repeat:no-repeat;
  height: 96px;
  width: 144px;
  background-position: center;
  @media(max-width: 500px){
    width: 95px;
    height: 65px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;
export const PayPal = styled.i`
  background-image: url(../images/PaypalPay.png);
  background-repeat:no-repeat;
  height: 96px;
  width: 144px;
  background-position: center;
  @media(max-width: 500px){
    width: 120px;
  }
`;
export const CardIconResp = styled("i")<{brand:any}>`
  ${props => (props.brand == 'visa') && css`
        background-image: url(../images/visa-icon.png);
  `}
  ${props => (props.brand == 'mastercard') && css`
        background-image: url(../images/mastercard-icon.png);
  `}
  ${props => (props.brand == 'amex') && css`
        background-image: url(../images/amex-icon.png);
  `}
  
  background-repeat:no-repeat;
  width: 59px;
  height: 33px;
  background-position: center;
  @media( max-width: 1023px){
    display: none;
  }
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
  width: 100%;
`;
export const NewMethod = styled.div`
  display:flex;
  gap:20px;
  width:100%;
  justify-content: center;
`;
export const NewMethodBox = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  padding-block:30px;
  width: 220px;
  border-radius:10px;
  width: 100%;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:active{
    border: 1px solid black;
  }
  &:hover{
    box-shadow: 0px 0px 10px 1px rgba(103, 23, 205, 0.7);
  }
  @media(max-width: 500px){
    width: 50%;
    padding-block: 18px;
    margin-left: 25%;
  }
`;
export const NewMethodBox2 = styled.div`
  
  @media(max-width: 500px){
    display: visible;
    top: 40%;
    height: 120px;
    position: absolute;
    left: 27.5%;
    width: 45%;
    //z-index:;
  }
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
  @media(max-width: 400px){
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 15px;
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
  @media(max-width: 400px){
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 15px;
  }
`;
const glow = keyframes`
  0% {
    background-position: 0% 50%;
    transform: scale(1);
  }
  50% {
    background-position: 100% 50%;
    transform: scale(1.05);
  }
  100% {
    background-position: 0% 50%;
  }
`;
export const PurpleBuyButton = styled.button`
  font-family:'Montserrat',sans-serif;
  font-size:16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background: linear-gradient(135deg, #8E2DE2 0%, #804FB3 25%, #6c4b91 50%, #552586 75%, #4A00E0 100%);
  background-size: 200% 100%;
  animation: ${glow} 2.7s ease infinite ;
  color: #fff;
  border-radius: 30px;
  border:none;
  // &:hover{
  //   background-color: #5000b5;
  //   transform:scale(1.03);
  //   transition:.5s ease all;
  // }
  @media(max-width: 1023px){
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 15px;
  }
`;
export const PurchaseContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex: 1 403.5px;
  gap: 20px;
  padding:20px;
  border-radius: 10px;
  width: 50%;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  @media(max-width: 1023px){
    flex: 1 500px;
    gap: 10px;
    margin-bottom: 10px;
    order: -1;
  }
`;
export const CourseId = styled.p`
  font-size: 14px;
  font-family:'Raleway',sans-serif;
  margin:0;
  @media(max-width: 1023px){
    font-size: 12px;
  }
`;
export const CourseName = styled.h1`
  font-size: 24px;
  font-weight: 600;
  font-family:'Montserrat',sans-serif;
  display:flex;
  justify-content:space-between;
  margin:0;
  @media(max-width: 1115px){
    font-size: 18px;
  }
  @media(max-width: 400px){
    font-size: 14px;
  }
`;
export const CourseCost = styled.span`
  color: #6717CD;
  font-size: 24px;
  font-family:'Montserrat',sans-serif;
  @media(max-width: 1115px){
    font-size: 20px;
  }
  @media(max-width: 1023px){
    display: none;
  }
`;
export const CourseCostResp = styled.span`
  display: none;
  color: #6717CD;
  font-size: 20px;
  font-weight: 600;
  font-family:'Montserrat',sans-serif;
  @media(max-width: 1023px){
    display: flex;
    font-size: 18px;
  }
  @media(max-width: 400px){
    font-size: 14px;
  }
`;
export const CardContain = styled.div`
  display:flex;
  justify-content:center;
  padding-inline:20px;
  @media(max-width: 1023px){
    display: none;
    padding-inline: 5px;
  }
`;
export const Card = styled.div`
  display:flex;
  position: relative;
  flex-direction:column;
  justify-content:center;
  border-radius:10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
`;
export const ImageContain = styled.div`
  display: flex;
  position: relative;
`;
export const NumberLesson = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  font-size: 14px;
  font-family:'Raleway',sans-serif;
  color: white;
  padding-block: 5px;
  padding-inline: 10px;
  border: 1px solid white;
  border-radius: 10px;
  @media(max-width: 1023px){
    font-size: 10px;
  }
`;
export const CourseText = styled.div`
  display:flex;
  flex-direction:column;
  padding: 20px;
`;
export const CourseImage = styled(Image)`
  border-radius: 10px 10px 0 0;
`;
export const TitleCourse = styled.p`
  font-size: 24px;
  font-family:'Montserrat',sans-serif;
  font-weight:600;
  margin:0;
  @media(max-width: 1023px){
    font-size: 20px;
  }
  @media(max-width: 400px){
    font-size: 16px;
  }
`;
export const Subtitle = styled.p`
  font-size: 12px;
  font-family:'Raleway',sans-serif;
  margin:0;
  @media(max-width: 1023px){
    font-size: 10px;
  }
`;
export const CourseInfo = styled.p`
  font-size: 14px;
  font-family:'Raleway',sans-serif;
  margin:0;
  @media(max-width: 1023px){
    display: none;
  }
`;
export const ContainerCard = styled.div`
  display:flex;
  flex-direction:column;
  gap: 15px;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
`;
export const InputText = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #6717CD;
  font-family:'Montserrat',sans-serif;
  @media( max-width: 400px){
    font-size: 12px;
  }
`;
export const Input = styled.input`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  padding:10px 0 10px 20px;
  border:1px solid #6717CD;
  border-radius:20px;
  :focus{
    outline: 1px solid #8E2DE2;
  }
  @media( max-width: 400px){
    font-size: 12px;
  }
`;
export const InputCard = styled(InputMask)`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  padding:10px 0 10px 20px;
  border:1px solid #6717CD;
  border-radius:20px;
  :focus{
    outline: 1px solid #8E2DE2;
  }
  @media( max-width: 400px){
    font-size: 12px;
  }
`;
export const InputContain = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  @media(max-width: 1023px){
    flex-direction: column;
    gap: 15px;
  }
`;
export const AlertIcon = styled.i`
  background-image: url(../images/alert-circle.png);
  background-repeat:no-repeat;
  height: 20px;
  width: 20px;
  background-position: center;
`;
export const Text = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #6717CD;
  font-family:'Raleyway',sans-serif;
  font-weight:600;
  margin:0;
  @media(max-width: 600px){
    font-size: 10px;
  }
`;
export const Text2 = styled.p`
  font-size: 14px;
  font-family:'Raleyway',sans-serif;
  font-weight:600;
  margin:0;
  @media(max-width: 600px){
    font-size: 10px;
  }
`;
export const Text3 = styled.p`
  font-size: 18px;
  font-family:'Montserrat',sans-serif;
  margin:0;
`;
export const BotContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;
export const PurchaseText = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-family:'Raleyway',sans-serif;
  font-weight:600;
  margin:0;
  @media( max-width: 400px){
    font-size: 10px;
  }
`;
export const PurchaseData = styled.span`
  align-items: center;
  font-size: 14px;
  font-family:'Raleyway',sans-serif;
  font-weight:400;
  margin:0;
  @media(max-width: 1023px){
    font-size: 12px;
  }
  @media( max-width: 400px){
    font-size: 10px;
  }
  `;
export const InfoCard = styled.div`
  display: flex;
  gap: 5px;
  align-items:center;
`;
export const PurchaseContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: gray;
  border-radius: 15px;
`;
const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;
export const LoaderContain = styled.div`
box-sizing: border-box;
display: block;
width: 30px;
height: 30px;
margin: 6px;
border-width: 9px;
border-style: solid;
border-radius: 50%;
border-color: #6717CD transparent transparent;
animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none running;
`;