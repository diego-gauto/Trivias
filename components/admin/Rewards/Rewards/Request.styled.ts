import styled, { css } from "styled-components";
import { Container } from "./Points.styled";


export const Contain = styled(Container)`
  gap: 0;
  padding: 0;
`;  	
export const FirstContain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 20px;
  padding-inline: 40px;
`;
export const Title = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const SearchContain = styled.div`
  display: flex;
  position: relative;
`;
export const Search = styled.input`
  min-width: 320px;
  border: 1px solid #6717CD;
  border-radius: 100px;
  padding-block: 10px;
  padding-inline: 50px 10px;
  outline: none;
`;
export const Profile = styled.img`
  width: 32px;
  height: auto;
  border-radius: 50%;
`;
export const SearchIcon = styled.i`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  background-image: url(../images/admin/search.png);
  background-repeat: no-repeat;
  height: 22px;
  width: 22px;
`;
export const IconContain = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
export const Imagecontain = styled.div`
  display: flex;
  width: 32px;
  height: 32px;

`;
export const Button = styled.div<{status:any}>`
  display: flex;
  margin: auto;
  font-size: 14px;
  font-weight: 600;
  width: fit-content;
  padding: 10px 20px;
  color: white;
  background: #E70000;
  border-radius: 100px;
  ${props => props.status == true && css`
  background: #33C600;
  `}
  cursor: pointer;
`;
