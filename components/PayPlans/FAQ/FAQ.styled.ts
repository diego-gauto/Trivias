import styled from "styled-components";

export const FaqStyle = styled.div`
  .faq {
    
    .faq-bold {
      font-size: large;
    }
    i {
      font-weight: unset;
    }

    .q-container {
      border-radius: 14px;
      cursor: pointer;
    }
    .q {     
      align-items: center;
      display: flex;
      justify-content: space-between;
    }
    .icon {
      border-radius 100%;
      background-color: #3f1168;
      color: #ffffff;
      min-width: 18px;
    }
    .open-q {
      color: #d244d1;
      .icon{
        border-radius 100%;
        background-color: #d244d1;
        color: #ffffff;
      }
    }
    @media(max-width: 500px){
      p{
        font-size: 16px;
      }
    }
  }
`;
