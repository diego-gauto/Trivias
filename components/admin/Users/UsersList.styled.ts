import styled from "styled-components";

export const UserContain = styled.div`
  display: flex;
  width: 100%;
  padding: 40px;
  height: -webkit-fill-available;
  gap: 20px;
`;
export const SearchInput = styled.input`
  font-family: 'Montserrat';
  font-size: 14px;
  border: 1px solid #6717CD;
  outline: none;
  padding-block: 10px;
  padding-inline: 50px 30px;
  border-radius: 30px;
`;
export const SearchIcon = styled.i`
  background-image: url(../images/admin/search.png);
  background-repeat:no-repeat;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
`;
export const EditIcon = styled.i`
  background-image: url(../images/admin/create.png);
  background-repeat:no-repeat;
  width: 24px;
  height: 24px;
`;
export const SearchContain = styled.div`
  display: flex;
  position: relative;
`;
export const UserShow = styled.p`
  display: flex;
  cursor: pointer;
  gap: 2px;
  align-items: center;
  font-family: 'Raleway';
  font-size: 14px;
  margin: 0;
`;