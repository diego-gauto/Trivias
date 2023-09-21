import styled from "styled-components";

export const PurpleButton = styled.button`
  border-radius: 100px;
  padding-block: 8px;
  padding-inline: 25px;
  color: white;
  border: none;
  background-color: #3f1168;
  &:hover {
    background-color: #3f1168;
    color: white;
    opacity: 0.67;
  }
`;
export const SelectInput = styled.select`
  color: #3f1168;
  padding: 10px;
  border-radius: 100px;
  border: none;
  outline: none;
  font-weight: 500;
  background-color: transparent;
  border: 1px solid #3f1168;
  width: 100%;
`;
