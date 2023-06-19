import styled from "styled-components";

export const UserContain = styled.div`
  display: flex;
  width: 100%;
  padding: 40px;
  height: auto;
  gap: 20px;
  position: relative;
  overflow: auto;
  @media (max-width: 1000px) {
    padding: 20px;
  }
`;
export const FilterContain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  .filter-contain {
    display: flex;
  }
  button {
    border: none;
    margin-right: 20px;
    color: #fff;
    background-color: #6717cd;
    border-radius: 100px;
    padding-inline: 20px;
    &:hover {
      opacity: 0.5;
    }
  }
`;

export const Select = styled.div`
  display: flex;
  font-family: "Montserrat";
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #6717cd;
  border-right: none;
  border-radius: 10px 0px 0px 10px;
  select {
    padding-inline: 15px;
    border: none;
    outline: none;
    border-radius: 10px 0px 0px 10px;
  }
  option {
    font-size: 14px;
    font-weight: 600;
  }
`;
export const SearchInput = styled.input`
  font-family: "Montserrat";
  font-size: 14px;
  border: 1px solid #6717cd;
  border-radius: 0px 10px 10px 0px;
  outline: none;
  padding-block: 10px;
  padding-inline: 50px 30px;
`;
export const DownloadUserData = styled.div`
  display: flex;
  height: 43px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  background: transparent;
  color: #6717cd;
  padding-block: 9px;
  padding-inline: 15px;
  border: 1px solid #6717cd;
  width: fit-content;
  border-radius: 100px;
  img {
    height: auto;
    width: 15px;
  }
  p {
    margin: 0;
  }
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
`;
export const SearchIcon = styled.i`
  background-image: url(../images/admin/search.png);
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
`;
export const EditIcon = styled.i`
  background-image: url(../images/admin/create.svg);
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
`;
export const SearchContain = styled.div`
  display: flex;
  position: relative;
  .hidden {
    width: 30px;
    height: 20px;
    background: white;
    position: absolute;
    right: 27px;
    top: 10px;
    z-index: 1;
  }
`;
export const UserShow = styled.p`
  display: flex;
  cursor: pointer;
  gap: 2px;
  align-items: center;
  font-family: "Raleway";
  font-size: 14px;
  margin: 0;
`;
