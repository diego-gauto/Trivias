import styled from 'styled-components';

export const RewardsContainer = styled.div`
  padding-block: 75px;

  width: 100%;
  position: relative;
  .side-images {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    transform: translateY(-50px);
    z-index: -1;
  }
  .card-container {
    position: relative;
    z-index: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    .points {
      &:hover {
        background: linear-gradient(to bottom right, #ff8900, #d244d1, #962dec);
      }
    }
    .time {
      &:hover {
        background: linear-gradient(to bottom right, #00da5f, #3d86b8);
      }
    }
    .awards {
      &:hover {
        background: linear-gradient(to bottom right, #019fff, #9603ed);
      }
    }
    .reward-card {
      background-color: #ffffff;
      position: relative;
      max-width: 310px;
      min-width: 310px;
      min-height: 450px;
      border-radius: 55px;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
      margin: 30px;
      .normal-card {
        transition: 0.2s ease;
        display: unset;
        .icons {
          position: relative;
          padding-top: 150px;
          .title-img {
            transform: translateY(-50px);
            position: absolute;
          }
        }
      }
      .hover-card {
        transition: 0.2s ease;
        color: #ffffff;
        display: none;
        .yellow {
          color: #ffb413;
        }
      }
      .blue {
        color: #3965f8;
      }
      .teal {
        color: #11c378;
      }
      &:hover {
        .normal-card {
          transition: 0.2s ease;
          display: none;
        }
        .hover-card {
          transition: 0.2s ease;
          display: unset;
        }
      }
    }
  }
  @media (max-width: 1100px) {
    .card-container {
      flex-wrap: wrap;
    }
  }
  @media (max-width: 650px) {
    margin-block: 50px;
    .text-title {
      font-size: 1.7rem !important;
      text-align: start;
    }
    img {
      margin-right: 0.5rem !important;
    }
    h5 {
      margin-top: 20px;
      padding-inline: 20px;
    }
    .all-center {
      img {
        width: 40px;
      }
    }
    .side-images {
      display: none;
    }
    .card-container {
      flex-direction: column;
      width: unset;
    }
    .reward-card {
      margin: 15px !important;
      min-height: 370px !important;
      .m-5 {
        margin: 1.5rem !important;
      }
    }
  }
  @media (max-width: 400px) {
    h5 {
      font-size: 0.9rem;
      font-weight: 400;
    }
  }
`;
