import styled from 'styled-components';

export const FooterContainerMobile = styled.div`
  z-index: 2;
  display: none;
  width: 100%;
  background-color: #29282c;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  padding-block: 25px;
  padding-right: 0;
  align-items: baseline;
  gap: 10px;
  img {
    width: 120px;
  }
  .right {
    display: flex;
    flex-direction: column;
    color: #ede7f2;
    p {
      margin: auto;
      cursor: pointer;
      font-size: x-small;
    }
  }
  .right-section {
    display: flex;
    color: #ede7f2;
    font-size: 12px;
    p {
      font-weight: bold;
      margin: 0;
      span {
        border-right: 2px solid white;
        border-left: 1px solid white;
        padding-inline: 10px;
        margin-left: 10px;
        @media only screen and (max-width: 1250px) {
          border-right: none;
        }
      }
    }
    @media only screen and (max-width: 1250px) {
      flex-direction: column;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1028px) {
    display: flex;
  }
  @media only screen and (max-width: 1250px) {
    flex-direction: column;
    align-items: center;
  }
`;
