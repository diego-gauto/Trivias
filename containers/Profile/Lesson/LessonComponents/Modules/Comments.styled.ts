import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  @media (max-width: 1023px){
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    padding: 20px;
    border-radius: 10px;
  }
`;
export const CommentContain = styled.div`
  display: flex;
  gap: 20px;
`;
export const CommentInput = styled.input`
  color: black;
  max-height: 50px;
  padding-inline: 20px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  outline: none;
  opacity: .8;
  border: none;
  width: 100%;
  box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
  border-radius: 20px;
  font-size: 14px;
  ::placeholder{
    color: #adadac;
  }
`;
export const CommentText =styled.div`
  display: flex;
  width: 92%;
  padding-block: 12px;
  padding-inline: 15px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
export const Comment = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const Pp1 = styled.i`
  background-image: url(../images/Video/Comments/profile1.png);
  height: 60px;
  width: 60px;
  background-position: center;
  background-repeat: no-repeat;
`;
export const Pp2 = styled.i`
  background-image: url(../images/Video/Comments/profile2.png);
  height: 60px;
  width: 60px;
  background-position: center;
  background-repeat: no-repeat;
`;
export const Pp3 = styled.i`
  background-image: url(../images/Video/Comments/profile3.png);
  height: 60px;
  width: 60px;
  background-position: center;
  background-repeat: no-repeat;
`;