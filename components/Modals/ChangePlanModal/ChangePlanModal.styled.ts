import styled from 'styled-components';

export const ChangePlanModalContain = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ede7f2;
  position: relative;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  p {
    font-size: 24px;
    font-weight: 600;
    color: #3f1168;
    margin: 0;
  }
  .close-icon {
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    color: #3f1168;
  }
  .buttons-container{
    margin-top: 20px;
    display: flex;
    gap 10px;
    button{
      border: none;
      border-radius: 15px;
      padding: 8px;
    }
    button.left{
      background: #3f1168;
      color: beige;
    }
    button.right{
       background: #bb7df5;
      color: beige;
    }
  }
  .link{
    font-size: 14px;
    word-wrap: break-word;
    span{
      
    }
  }
`;
