import styled, { css } from "styled-components";

export const Selected = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 14px;
  padding-left: 20px;
  height: 43px;
  font-family: "Montserrat", sans-serif;
  padding-block: 10px;
  border-radius: 30px;
  border: 1px solid #6717cd;
  z-index: 5;
`;
export const SelectContain = styled.div`
  position: relative;
  width: 100%;
`;
export const OptionContain = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  color: black;
  width: 100%;
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
  input {
    &[type="radio"] {
      display: none;
    }
  }
`;
export const OptionCat = styled.div<{ category: string; marked: string }>`
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
  input {
    &[type="radio"] {
      display: none;
    }
  }
  ${(props) =>
    props.marked.includes(props.category) &&
    css`
      background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
      color: white;
      &:first-child {
        border-radius: 10px 10px 0 0;
      }
      &:last-child {
        border-radius: 0 0 8px 8px;
      }
    `}
`;
export const Label2 = styled.label`
  display: flex;
  font-size: 14px;
  gap: 5px;
  padding-block: 5px;
  max-width: 95%;
  overflow: hidden;
  padding-inline: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  white-space: nowrap;
`;
export const CaretD2 = styled.i`
  position: absolute;
  top: 28%;
  right: 15px;
  background-image: url(../images/admin/Courses/fillArrowDown.svg);
  background-position: center;
  background-repeat: no-repeat;
  height: 24px;
  width: 20px;
  pointer-events: none;
`;
