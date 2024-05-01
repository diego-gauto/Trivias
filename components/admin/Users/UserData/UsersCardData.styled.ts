import styled, { css } from 'styled-components';

export const UserContain = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
  width: 100%;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  position: absolute;
`;
export const UserInfo = styled.div`
  display: grid;
  padding-left: 15px;
  grid-template-columns: 1fr;

  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const TitleContain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const FirstBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin: 0;
`;
export const CloseIcon = styled.i`
  background-image: url(../images/admin/close.svg);
  background-position: center;
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
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
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
  gap: 10px;
`;
export const Info = styled.p`
  display: flex;
  flex-direction: column;
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  margin: 0;
  height: 60px;
`;
export const Label = styled.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #6717cd;
  margin: 0;
`;
export const Courses = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  .img-gonvar {
    width: 10%;
  }
`;
export const TitleBox = styled.p`
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
`;
export const CourseContain = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  .contain-course {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .date {
      font-size: 12px;
      margin: 0;
      width: fit-content;
    }
    img {
      border-radius: 10px;
      width: 230px;
    }
  }
`;
export const TransparentButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Montserrat', sans-serif;
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

export const CardIconResp = styled('i')<{ brand: any }>`
  ${(props) =>
    props.brand == 'visa' &&
    css`
      background-image: url(../images/visa-icon.png);
    `}
  ${(props) =>
    props.brand == 'mastercard' &&
    css`
      background-image: url(../images/mastercard-icon.png);
    `}
  ${(props) =>
    props.brand == 'amex' &&
    css`
      background-image: url(../images/amex-icon.png);
    `}
  background-repeat:no-repeat;
  background-size: contain;
  width: 95px;
  height: 66px;
  background-position: center;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const Background = styled.div``;
export const OuterProgress = styled.div`
  width: 54px;
  height: 54px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 5px 2px #6717cd;
    transition: 1s ease all;
  }
`;
export const ProgressSvg = styled.svg`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  stroke-dasharray: 157;
  position: absolute;
  z-index: 1;
  transform: rotate(-90deg);
  border-radius: 50%;
  filter: blur(0.5px);
`;
export const LevelContain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const CurrentLevel = styled.p`
  font-size: 24px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  color: #6717cd;
  margin: 0;
  z-index: 1;
  line-height: 30px;
`;
export const ProgressCircle = styled('circle')<{ progress: number }>`
  fill: none;
  stroke: url(#gradient2);
  stroke-width: 4px;
  stroke-dasharray: 157;
  stroke-dashoffset: ${(props) => props.progress};
  stroke-linecap: round;

  cx: 27px;
  cy: 27px;
  r: 25px;
`;
export const ProgressBackground = styled.circle`
  fill: none;
  stroke: #808080;
  stroke-width: 4px;
  stroke-dasharray: 157;
  stroke-dashoffset: 0;
  cx: 27px;
  cy: 27px;
  r: 25px;
`;
export const Vector = styled.i`
  background-image: url(../images/Rewards/VectorS.png);
  background-repeat: no-repeat;
  height: 10px;
  width: 17px;
  position: absolute;
  bottom: 14px;
  z-index: 1;
`;
export const Vector2 = styled.i`
  background-image: url(../images/Rewards/VectorS.png);
  background-repeat: no-repeat;
  height: 10px;
  width: 17px;
  position: absolute;
  bottom: 8px;
  z-index: 1;
`;
