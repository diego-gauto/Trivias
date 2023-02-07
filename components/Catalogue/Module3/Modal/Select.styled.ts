import styled from "styled-components";

export const DropDown = styled.i`
  pointer-events: none;
  background-image: url(../images/Preview/purpleArrowDown.svg);
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
  align-items: center;
  gap: 10px;
  padding-inline: 15px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  padding-block: 5px;
  color: #942ced;
  border-radius: 30px;
  border: 1px solid #942ced;
  z-index: 5;
  svg {
    font-size: 22px;
  }
  @media (max-width: 991px) {
    font-size: 12px;
    padding-inline: 10px;
    padding-block: 3px;
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
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.25);
  z-index: 1;
  min-width: 300px;
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

  p {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding-block: 10px;
    padding-inline: 20px;
    font-weight: 600;
    margin: 0;
    span {
      font-weight: 500;
      white-space: nowrap;
    }
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
