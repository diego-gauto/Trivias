import styled from 'styled-components';

export const PayStyles = styled.div`
  p,
  h1,
  h2,
  h3 {
    font-weight: bolder;
    color: #3f1168;
  }
  p {
    i {
      font-weight: 500 !important;
    }
  }
  .colors {
    .back {
      background-color: #ece7f2;
    }
    .break {
      background-color: #dad3e5;
    }
    .yellow {
      color: #ff9f00;
    }
    .purple-pink {
      color: #d244d1;
    }
    .purple {
      color: #3f1168;
    }
  }

  .no-bold {
    font-weight: unset;
  }
  .middle {
    display: flex;
    justify-content: center;
    width: 90%;
  }

  .faq {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .faq-bold {
      font-size: large;
    }
  }

  .continue {
    font-weight: 500;
    padding-inline: 30px;
    background: none;
    border-radius: 20px;
    border: 1px solid #3f1168;
    color: #3f1168;
  }

  .plans {
    display: flex;
  }
  .plans-res {
    display: none;
  }

  .select-plan {
    display: none;
    align-items: center;
    margin-bottom: 50px;
    justify-content: center;
    font-size: 20px;
    flex-wrap: wrap;
    .options {
      display: flex;
      gap: 5px;
      .option {
        margin: 0;
        padding: 10px;
        cursor: pointer;
        border-radius: 8px;
        background-color: white;
        transition: 0.3s ease all;
        font-size: 16px;
      }
      .link {
        background: linear-gradient(to right, #8825e1 0%, #af39cd 100%);
        color: white;
        cursor: unset;
      }
    }
  }

  @media (max-width: 600px) {
    .plans {
      display: none;
    }
    .plans-res {
      display: flex;
    }
    .select-plan {
      display: flex;
    }
    .py-5 {
      padding-inline: 10px;
    }
    .d-inline-flex {
      flex-direction: column;
    }
    .px-5 {
      padding-inline: 1.4rem !important;
    }
    .m-5 {
      margin: 0 !important;
      padding-block: 20px;
    }
  }
`;
