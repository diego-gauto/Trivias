import styled from "styled-components";

export const MainContainer = styled.div`
  margin-top: 10px;
  display: flex;
  width: 60%;
  gap: 20px;
  flex-direction: column;
  @media(max-width: 700px){
    padding-inline: 10px;
    width: 100%;
  }
`;
export const CompleteContain = styled.div`
  display:flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  @media(max-width: 1023px){
    padding: 5px;
  }
  @media(max-width: 1023px){
    padding-block: 20px;
  }
`;
export const PurchaseTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #6717CD;
  font-family: 'Montserrat', sans-serif;
  margin:0;
  @media(max-width: 1023px){
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media(max-width: 400px){
    font-size: 18px;
  }
`;
export const BottomContain = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 60px;
  @media(max-width: 1023px){
    padding-inline: 5px;
  }
`;
export const Text4 = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-family:'Raleyway',sans-serif;
  font-weight:600;
  margin:0;
  @media(max-width: 1023px){
    font-size: 12px;
  }
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
`;