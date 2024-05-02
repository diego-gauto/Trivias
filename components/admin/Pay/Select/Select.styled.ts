import styled from 'styled-components';

export const Selected = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 15px;
  padding-left: 15px;
  font-family: 'Montserrat', sans-serif;
  padding-block: 3px;
  border-radius: 30px;
  border: 1px solid #6717cd;
  z-index: 5;
`;
export const SelectContain = styled.div`
  position: relative;
  width: 260px;
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
  width: 260px;
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
    &[type='radio'] {
      display: none;
    }
  }
`;
export const Label = styled.label`
  display: flex;
  font-size: 16px;
  gap: 5px;
  padding-block: 10px;
  padding-inline: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  white-space: nowrap;
`;
export const CaretD = styled.i`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  background-image: url(../images/admin/Courses/caret-down.png);
  background-repeat: no-repeat;
  height: 24px;
  width: 20px;
  pointer-events: none;
`;
