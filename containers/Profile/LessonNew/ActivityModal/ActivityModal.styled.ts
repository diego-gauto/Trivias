import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  background-color: #ede7f2;
  border-radius: 20px;
  .title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
    width: 100%;
    .title {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      color: #3f1168;
      margin-bottom: 10px;
    }
    /*
    .activity--default {color: #d244d1;}
    .activity--approve {color: #197569;}
    .activity--not-approve {color: #d72424;}
    .activity--in-review { color: #7f21cf;}
    */
    .title--not-approve {
      color: #d72424;
    }
    .title--default {
      color: #d244d1;
    }
    .title--in-review {
      color: #7f21cf;
    }
    .close-icon {
      color: #3f1168;
      position: absolute;
      font-size: 20px;
      cursor: pointer;
      top: 8px;
      right: 8px;
    }
  }
  /* style={{ paddingTop: '10px', paddingBottom: '10px', color: '#3f1168' }} */
  .card-p {
    padding-bottom: 10px;
    padding-top: 10px;
    color: #3f1168;
  }
  .btn-aceppt {
    width: 50%;
    margin-left: 10px;
    padding: 4px 10px;
    color: white;
    border-radius: 20px;
    border: 1px solid #8e2de2;
    background: #8e2de2;
    text-decoration: none;
    &:hover {
      opacity: 0.7;
    }
  }
`;
