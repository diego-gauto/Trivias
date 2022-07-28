import PhoneInput from 'react-phone-number-input';
import styled from 'styled-components';


export const ProfilePicture = styled.i`
  background-image: url(../images/DefaultIcon.png);
  height: 106px;
  width: 98px;
  background-position: center;
  border:none;
  background-repeat:no-repeat;
`;
export const ProfilePicture2 = styled.i`
  background-image: url(../images/DefaultIcon.png);
  height: 140px;
  width: 140px;
  background-position: center;
  border:none;
  background-repeat:no-repeat;
`;

export const AnimatedBackground = styled.video  `
width: auto;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: -2;
    margin-left: -80px;
`; 

export const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 90vh;
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  @media (max-width: 760px) {
    padding:15px;
  }
`;

export const LoginBox = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  padding-inline:90px;
  padding-block:40px;
  border: 1px solid #fff;
  box-sizing: border-box;
  width:100%;
  gap: 15px;
  max-width:515px;
  min-height:680px;
  background:transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 10px;
  backdrop-filter: blur(180px);
  backdrop-opactiy:10px;
  font-family: Montserrat;
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 15px;
  }
  @media (max-width: 530px) {
    padding-inline:20px;
  }
`;
export const LoginBox2 = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  padding-inline:70px;
  padding-block:40px;
  border: 1px solid #fff;
  box-sizing: border-box;
  width:100%;
  gap:25px;
  max-width:727px;
  min-height:680px;
  background:transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 10px;
  backdrop-filter: blur(180px);
  backdrop-opactiy:10px;
  font-family: Montserrat;
  position:relative;
  @media (max-width: 760px) {
    padding-inline:30px;
  }
`;


export const Title = styled.h1`
  font-family: Montserrat;
  color: #fff;
  font-style: normal;
  font-size: 36px;
  text-align: center;
  text-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  font-family: Montserrat;
  @media (max-width: 670px) {
    font-size:30px;
  }
`;

export const Box1 = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  @media (max-width: 670px) {
    width: 100%;
    max-width: 320px;
  }
`;
export const Box2 = styled.div`
  position:relative;
  width:100%;
  @media (max-width: 670px) {
    width: 100%;
    max-width: 320px;
  }
`;
export const PasswordBox = styled.div`
  position:relative;
  @media (max-width: 670px) {
    width: 100%;
    max-width: 320px;
  }
  `;
export const Text2 = styled.label`
  font-size: 14px;
  color: #fff;
  opacity: .8;
  @media (max-width: 670px) {
    font-size: 12px;
  }
`;
export const TextInput = styled.input`
  color: #fff;
  outline: none;
  opacity: .8;
  border: 1px solid white;
  width: 100%;
  height: 40px;
  background:transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 20px;
  padding: 0 0 0 20px;
  font-size: 14px;
  ::placeholder{
    color: #adadac;
  }
  @media (max-width: 670px) {
    font-size: 12px;;
  }
`; 
export const TextInput_2 = styled.input`
  color: #fff;
  outline: none;
  opacity: .8;
  border: 1px solid white;
  width: 100%;
  height: 40px;
  background:transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 20px;
  padding: 0 0 0 20px;
  font-size: 14px;

  > i {
    display: none !important;
  }
  
  ::placeholder{
    color: #adadac;
  }
  @media (max-width: 670px) {
    font-size: 12px;;
  }

`;
export const InputPhone = styled(PhoneInput)`
  flex: 1 1;
  height: 40px;
  background: transparent;
  opacity: .8;
  border-radius: 30px;
  border: 1px solid white;
  .PhoneInputInput {
    border: none;
    outline: none;
    color: #fff;
    min-width: 255px;
    background: transparent;
    @media (max-width: 420px) {
      min-width: 80%;
    }
    @media (max-width: 360px) {
      min-width: 77%;
    }
    @media (max-width: 330px) {
      min-width: 75%;
    }
  }
  .PhoneInputCountry {
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    left: 20px;
    margin-right: var(--PhoneInputCountrySelect-marginRight);
}
  @media (max-width: 670px) {
    font-size: 12px;
  }
`;
export const ArchiveInput = styled.input`
  color: #fff;
  outline: none;
  opacity: .8;
  border: 1px solid white;
  width: 100%;
  height: 40px;
  background:transparent;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 20px;
  padding: 0 0 0 50px;
  font-size: 14px;
  ::placeholder{
    color:#adadac;
  }
  @media (max-width: 670px) {
    font-size: 12px;
  }
`;
export const PurpleButton2 = styled.button`
  background-color: #6717CD;
  color: #fff;
  height: 50px;
  border-radius: 30px;
  border:none;
  &:hover{
    background-color: #5000b5;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const GoogleButton = styled.button`
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  background-color: #de5246;
  color: #fff;
  height: 50px;
  width:100%;
  border-radius: 30px;
  border:none;
  &:hover{
    background-color: #db2c1d;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const FacebookButton = styled.button`
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  background-color: #0768fd;
  color: #fff;
  height: 50px;
  width:100%;
  border-radius: 30px;
  border:none;
  &:hover{
    background-color: #0755fd;
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const TransparentButton = styled.button`
  background:transparent;
  color: #fff;
  height: 50px;
  border-radius: 30px;
  border:1px solid white;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const GoogleIcon = styled.i`
  background-image: url(../images/logo-google.png);
  height: 21px;
  width: 21px;
  border-style:none;
  background-position: center;
`;
export const FacebookIcon = styled.i`
  background-image: url(../images/logo-facebook.png);
  height: 21px;
  width: 21px;
  background-position: center;
`;
export const EyeIcon = styled.i`
background-image: url(../images/eye.png);
height: 15px;
width: 22.5px;
background-position: center;
position: absolute;
top: 50%;
right: 15px;
transform: translateY(-50%);
`;
export const LineIcon = styled.i`
  background-image: url(../images/Line-2.png);
  height: 30px;
  width: 2px;
  background-position: center;
  position: absolute;
  top: 0;
  left: 50px;
  margin: 29px 0 0 12px;
  opacity:.4;
  @media (max-width: 670px) {
    left: 45px;
  }
  @media (max-width: 420px) {
    left: 40px;
  }
`;
export const FolderIcon = styled.i`
  background-image: url(../images/folder.png);
  height: 24px;
  width: 24px;
  top: 50%;
  left: 20px;
  background-position: center;
  position: absolute;
  opacity:.8;
  cursor:pointer;
  z-index: 1;
`;

export const AllButtons = styled.div`
  display:flex;
  justify-content:center;
  flex-direction: column;
  gap: 15px;
  max-width:272px;
  width:100%;
`;
export const Paragraph = styled.div`
  text-align:center;
  gap:5px;
`;
export const InputContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap:25px;
  margin-bottom:20px;
`;
export const Text3 = styled.p`
  font-family: Raleway;
  text-align: center;
  font-size: 14px;
  color: #FFFFFF;
  margin:0;
  opacity: .8;
  @media (max-width: 670px) {
    font-size: 10px;
  }
`;
export const LinkText = styled.span`
  font-family: Raleway;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  text-decoration: underline;
  @media (max-width: 670px) {
    font-size: 10px;
  }
  cursor:pointer;
`;