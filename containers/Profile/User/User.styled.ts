import styled, { css, keyframes } from "styled-components";

export const BackgroundProfile = styled.div`
  width: 100%;
  display: flex;
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @media (max-width: 1023px) {
    flex-direction: column;
    gap: 40px;
    align-items: center;
  }
`;
export const SecondBox = styled.div`
  display:flex;
  flex-direction:column;
  padding: 15px;
  gap: 15px;
  width:100%;
`;
export const ThirdBox = styled.div`
  display:flex;
  width:100%;
  min-height: 410px;
  gap: 10px;
  @media (max-width: 1023px) {
    flex-wrap:wrap;
  }
`;
export const ProfileContainer =  styled.div`
  width:40%;
  background:white;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  padding-inline: 40px;
  padding-block: 40px;
  display: flex;
  flex-direction:column;
  gap:20px;
  @media (max-width: 1023px) {
    display:none
  }
`;
export const ProfilePayment = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  background:white;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius:10px;
  padding:20px;
  @media (max-width: 1023px) {
    order:3;
  }
`;
export const ProfileData = styled.div`
  display:flex;
  flex-direction:column;
  gap: 20px;
  width:100%;
  background:white;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius:10px;
  padding: 15px;
  @media (max-width: 1023px) {
    width:100%;
  }
`;
export const RewardContain = styled.div`
  display:flex;
  flex-direction:column;
  gap: 15px;
  width:100%;
  background:white;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius:10px;
  padding: 20px;
  @media (max-width: 1023px) {
    //width:100%;
  }
`;
export const ProfileIconContain =  styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`;
export const PictureContain = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  position: relative;
`;
export const ProfileIcon = styled.img`
  background-repeat:no-repeat;
  border-radius: 50%;
  width: 100%;
  height: auto;
`;
export const LogOutIcon = styled.i`
  background-image: url(../images/Logout.png);
  background-repeat:no-repeat;
  height: 20px;
  width: 20px;
`;
export const ArrowRight = styled.i`
  background-image: url(../images/arrowr.png);
  background-repeat:no-repeat;
  height: 16px;
  width: 20px;
`;
export const Level = styled.i`
  background-image: url(../images/nivel.png);
  background-repeat:no-repeat;
  height: 48px;
  width: 48px;
  position: absolute;
  bottom: 0;
  right: 0;
`;
export const UserContainer = styled.div`

`;
export const LabelText = styled.label`
  font-family:'Raleway',sans-serif;
  font-size:14px;
`;
export const UserText = styled.p`
  font-family:'Montserrat',sans-serif;
  font-size:18px;
  color:#8E2DE2;
  font-weight:600;
  margin:0;
`;
export const OpenTasks = styled.p`
  font-family:'Montserrat',sans-serif;
  font-size: 18px;
  color: #9011FF;
  font-weight:600;
  margin:0;
  cursor: pointer;
  width: fit-content;
  &:hover{
    color: #600FA6;
    text-decoration: underline;
  }
`;
export const LogOut = styled.p`
  display:flex;
  align-items:center;
  gap:10px;
  font-family:'Montserrat',sans-serif;
  font-size: 16px;
  font-weight: 900;
  color: #8E2DE2;
  margin: auto auto 0 auto;
  cursor: pointer;
  &:hover{
    color: #600FA6;
    text-decoration: underline;
  }
 @media (max-width: 1023px) {
  margin-inline: 0;
  margin-top: 0;
  margin-bottom: 15px;
  }
`;
export const PaymentTitle = styled.h1`
  font-family:'Montserrat',sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  @media (max-width: 1023px) {
    font-size: 20px;
  }
`;
export const PaymentBox = styled.div`
  display:flex;
  width:100%;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  padding-block:8px;
  padding-inline:10px;
  border-radius:10px;
  justify-content:space-between;
  align-items:center;
  @media (max-width: 510px) {
    padding-block: 10px;
    padding-inline: 10px;
  }
`;
export const PayBox = styled.div`
  display:flex;
  gap:10px;
  align-items:center;
`;
export const PayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const VisaIcon = styled.i`
  background-image: url(../images/Visa.png);
  background-repeat:no-repeat;
  height: 32px;
  width: 47px;
  background-position: center;
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
export const TrashIcon = styled.i`
  background-image: url(../images/Trash.png);
  background-repeat:no-repeat;
  height: 21px;
  width: 18px;
  background-position: center;
`;
export const PaymentText = styled.p`
  font-size:14px;
  font-family:'Montserrat',sans-serif;
  font-weight: 600;
  margin:0;
  @media (max-width: 510px) {
    font-size:12px;
  }
`;
export const DeleteContain = styled.div`
  display:flex;
  gap:5px;
  cursor:pointer;
`;
export const DeleteText = styled.p`
  font-size:12px;
  font-family:'Raleway',sans-serif;
  font-weight: 400;
  color: #6717CD;
  margin:0;
  &:hover{
    font-weight: 600;
  }
  @media (max-width: 1280px) {
    display:none;
  }
`;
export const AddPay = styled.p`
  display:flex;
  justify-content:center;
  align-items:center;
  gap:10px;
  margin-top:auto;
  margin-bottom:0;
  font-size:14px;
  font-family:'Raleway',sans-serif;
  font-weight: 700;
  color: #6717CD;
  cursor:pointer;
  &:hover{
    text-decoration:underline;
  }
  @media(max-width: 1023px) {
    margin-top: 25px;
  }
`;
export const RewardBox = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  gap:10px;
  @media (max-width: 400px) {
    gap: 5px
  }
`;
export const DataTitle = styled.h1`
  font-family:'Montserrat',sans-serif;
  font-size: 24px;
  margin:0;
  @media (max-width: 1023px) {
    font-size: 20px;
  }
`;
export const VectorLeft = styled.i`
  background-image: url(../images/chevronl.png);
  background-repeat:no-repeat;
  height: 22px;
  width: 18px;
  background-position: center;
  cursor:pointer;
`;
export const VectorRight = styled.i`
  background-image: url(../images/chevronr.png);
  background-repeat:no-repeat;
  height: 22px;
  width: 18px;
  background-position: center;
  cursor:pointer;
`;
export const RewardTitle = styled.p`
  font-size: 18px;
  font-family:'Montserrat',sans-serif;
  font-weight: 600;
  margin:0;
  text-align:center;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`
export const Pointbox = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  gap: 20px;
`;
export const Currentlvl = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  font-size: 16px;
  font-family:'Montserrat',sans-serif;
  font-weight: 600;
  color:white;
  background-color: #6717CD;
  min-height: 50px;
  min-width: 50px;
  border-radius: 50%;
  background-position: center;
  @media (max-width: 400px) {
    height: 32px;
    width: 32px;
  }
`;
export const Nextlvl = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  font-size: 16px;
  font-family:'Montserrat',sans-serif;
  font-weight: 600;
  color:#6717CD;
  background-color: white;
  border: 1px solid #6717CD;
  min-height: 50px;
  min-width: 50px;
  border-radius: 50%;
  background-position: center;
  @media (max-width: 400px) {
    height: 32px;
    width: 32px;
  }
`;
export const ProgressBar1 = styled("div")<{barProgress:any}>`
  height: 7px;
  background-color: #6717CD;
  border: 1px solid #6717CD;
  position: relative;
  width: ${props=>props.barProgress}%;
`;
export const ProgressBar2 = styled("div")<{barProgress:any}>`
  height: 7px;
  background-color: #6717CD;
  border: 1px solid #6717CD;
  position: relative;
  width: ${props=>props.barProgress}%;
`;
export const CompleteBar = styled.div`
  display:flex;
  width:100%;
  height: 8px;
  max-width:186px;
  border-radius:5px;
  border:1px solid #6717CD;
`;
export const PointsBox = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 0;
  width: 0px;
`;
export const PolygonDown = styled.i`
  background-image: url(../images/PolygonDown.png);
  height: 9px;
  width: 12px;
  background-repeat:no-repeat;
  left:0;
`;
export const UserPoints = styled.p`
  font-size: 14px;
  font-family:'Raleway',sans-serif;
  color: #0000FD;
  margin:0;
  white-space: nowrap;
`;
export const RewardData = styled.div`
  display:flex;
  gap:20px;
  @media (max-width: 1023px) {
    flex-direction:column;
    padding-inline:60px;
    align-items: center;
  }
  @media (max-width: 850px) {
    align-items:center;
  }
`;
export const RewardInfo = styled.div`
  display:flex;
  margin-top:10px;
  flex-direction:column;
  width:100%;
  gap:15px;
  @media (max-width: 1023px) {
    text-align:center;
  }
`;
export const RewardTitleBox = styled.p`
  font-size: 14px;
  font-weight:600;
  font-family:'Montserrat',sans-serif;
  margin:0;
`;
export const RewardPoints = styled.p`
  font-size: 12px;
  opacity:.7;
  font-family:'Raleway',sans-serif;
  margin:0;
`;
export const RewardParagraph = styled.p`
  font-size: 12px;
  font-family:'Raleway',sans-serif;
  margin:0;
  @media (max-width: 1023px) {
    display:none;
  }
`;
export const ImageContain = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  @media (max-width: 1023px) {
    max-height: 260px;
    max-width: 260px;
  }
`;
export const RewardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius:10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
`;
export const AllEditInputs = styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
`;
export const Inputs = styled.div`
  display:flex;
  flex-direction:column;
`;
export const EditText = styled.label`
  font-size: 14px;
  color: #6717CD;
  font-family:'Montserrat',sans-serif;
`;
export const EditInput = styled.input`
  font-size: 14px;
  font-family:'Montserrat',sans-serif;
  padding-inline: 20px;
  padding-block: 8px;
  border:1px solid #6717CD;
  border-radius:20px;
  :focus{
    outline: 1px solid #8E2DE2;
  }
`;
export const EditButtons = styled.div`
  display:flex;
  justify-content:space-between;
  margin-top: auto;
  @media (max-width: 1023px) {
    flex-direction:column;
    gap:10px;
    align-items:center;
  }
`;
export const SaveButton = styled.button`
  padding-block: 10px;
  padding-inline: 25px;
  color: white;
  font-family:'Montserrat',sans-serif;
  font-size: 14px;
  border:none;
  border-radius: 30px;
  background-color: #6717CD;
  &:hover{
    background-color: #5b02cc;
    transform:scale(1.03);
    transition:.5s ease all;
  }
  @media (max-width: 1023px) {
    width: 60%;
  }
  @media (max-width: 1185px) {
    font-size:14px;
  }
`;
export const SubscriptionButton = styled.button`
  padding-block: 10px;
  padding-inline: 25px;
  color: #6717CD;
  font-family:'Montserrat',sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #6717CD;
  border-radius: 30px;
  background-color:white;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
  @media (max-width: 1023px) {
    width: 60%;
  }
  @media (max-width: 1185px) {
    font-size:12px;
  }
`;
export const LevelContain = styled.div`
  position: absolute;
  right: -8px;
  bottom: -8px;
  background: transparent;
  border-radius: 50%;
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
align-self:center;
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