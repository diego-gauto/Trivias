import styled from "styled-components";
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
