import styled from "styled-components";

export const DropDown = styled.i`
  top: 50%;
  right: 20px;
  transform: translateY(-40%);
  pointer-events: none;
  background-image: url(../images/Preview/purpleArrowDown.svg);
  position: absolute;
  height: 10px;
  width: 16px;
  background-position: center;
  background-repeat: no-repeat;
`;
export const Selected = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 16px;
  justify-content: center;
  width: 260px;
  font-family: "Montserrat", sans-serif;
  padding-block: 10px;
  color: #6717cd;
  border-radius: 30px;
  border: 1px solid #6717cd;
  z-index: 5;
  @media (max-width: 991px) {
    font-size: 14px;
    padding-block: 8px;
    width: 210px;
  }
  @media (max-width: 399px) {
    font-size: 12px;
    padding-block: 8px;
    width: 174px;
  }
`;
export const SelectContain = styled.div`
  position: relative;
`;
export const OptionContain = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  color: black;
  right: 0;
  position: absolute;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;
export const Option = styled.div`
  &:hover {
    background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
    color: white;
    &:first-child {
      border-radius: 10px 10px 0 0;
    }
    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
`;
export const Input = styled.input`
  &[type="radio"] {
    display: none;
  }
`;
export const Label = styled.label`
  display: flex;
  font-size: 16px;
  gap: 5px;
  padding-block: 10px;
  padding-inline: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  white-space: nowrap;
  @media (max-width: 991px) {
    font-size: 14px;
    padding-block: 8px;
    padding-inline: 10px;
  }
  @media (max-width: 399px) {
    font-size: 12px;
    padding-block: 8px;
    padding-inline: 5px;
  }
`;
export const Episodes = styled.p`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  white-space: nowrap;
  margin: 0;
  @media (max-width: 991px) {
    font-size: 14px;
  }
  @media (max-width: 399px) {
    font-size: 12px;
  }
`;
