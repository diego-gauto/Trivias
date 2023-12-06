import styled, { css } from 'styled-components';

export const PayContain = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 10px;
  overflow: auto;

  @media screen and (min-width: 576px) {
    padding: 30px 15px;
  }

  @media screen and (min-width: 768px) {
    padding: 30px 20px;
  }

  @media screen and (min-width: 992px) {
    padding: 30px 30px;
  }

  @media screen and (min-width: 1200px) {
    padding: 30px 40px;
  }
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  flex-direction: column;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  .right-data {
    width: 180px;
  }
  .input-contain {
    display: flex;
    flex-direction: column;
    label {
      font-weight: 600;
      color: #6717cd;
    }
    select {
      padding-block: 5px;
      padding-inline: 20px;
      border-radius: 100px;
      border: 1px solid #6717cd;
    }
    option {
      font-size: 14px;
      font-weight: 600;
    }
  }
  .calendar-contain {
    display: flex;
    flex-direction: column;
    border-radius: 10px 10px 0px 0px;
    position: absolute;
    background-color: white;
    .react-calendar__tile {
      color: #6717cd;
    }
    .react-calendar__tile--active {
      background: #6717cd;
      color: white;
    }
    .react-calendar__month-view__days__day--weekend {
      color: #d10000;
    }
    .react-calendar__tile--now {
      background: #dad3e5;
    }
    right: 0px;
    .close-tab {
      display: flex;
      justify-content: flex-end;
      padding: 5px;
      background-color: #6717cd;
      .close {
        color: white;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .pages {
    display: flex;
    justify-content: space-between;
    padding-inline: 20px;
    padding-bottom: 10px;
    align-items: center;
    p {
      margin: 0;
    }
    .index {
      display: flex;
      gap: 15px;
      align-items: center;
      .current-number {
        cursor: pointer;
        font-size: 30px;
      }
      .default-number {
        cursor: pointer;
        font-size: 20px;
        color: #6717cd;
      }
      .arrows {
        font-size: 30px;
        cursor: pointer;
      }
    }
    .max-pages {
      .max-number {
        font-weight: 600;
        font-size: 24px;
      }
    }
  }

  @media screen and (min-width: 420px) {
    .right-data {
      width: 200px;
    }
  }

  @media screen and (min-width: 540px) {
    .right-data {
      width: 280px;
    }
  }

  @media screen and (min-width: 634px) {
    .right-data {
      width: 360px;
    }
  }
`;
export const TitleContain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;

  @media screen and (min-width: 420px) {
    .right-data {
      padding: 20px;
    }
  }
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
  border: 1px solid #6717cd;
`;
export const ProfileContain = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const IconContain = styled.div`
  display: flex;
  align-items: center;
  border: 2.64589px solid #d9d9d9;
  border-radius: 5px;
  justify-content: center;
  width: 48px;
`;
export const Profile = styled.img`
  width: 32px;
  height: auto;
  border-radius: 50%;
`;
export const NameContainer = styled.img`
  display: flex;
  width: 100%;
  height: auto;
  border-radius: 50%;
`;
export const Imagecontain = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
`;
export const Method = styled('i')<{ brand: any }>`
  background-image: url(../images/admin/${props => props.brand}.png);
  background-repeat: no-repeat;
  width: 35px;
  margin: 5px;
  height: 12px;
  ${props =>
    props.brand == 'mastercard' &&
    css`
      margin: 2px;
      width: 31px;
      height: 20px;
    `}
  ${props =>
    props.brand == 'paypal' &&
    css`
      margin: 2px;
      width: 16px;
      height: 20px;
    `}
  ${props =>
    props.brand == 'stripe' &&
    css`
      background-position: center;
      margin: 2px;
      width: 100%;
      height: 20px;
    `}
`;
export const ButtonIcon = styled.div`
  display: flex;
  position: relative;
`;
