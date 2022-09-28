import styled from "styled-components";

export const UserContain = styled.div`
  display: flex;
  width: 100%;
  padding: 40px;
  height: -webkit-fill-available;
  gap: 20px;
`;
export const FilterContain = styled.div`
  display: flex;
`;

export const Select = styled.div`
  display: flex;
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #6717CD;
  border-right: none;
  border-radius: 10px 0px 0px 10px;
  select{
    border: none;
    outline: none;
    border-radius: 10px 0px 0px 10px;
  }
  option{
    font-size: 14px;
    font-weight: 600;
  }
`;
export const SearchInput = styled.input`
  font-family: 'Montserrat';
  font-size: 14px;
  border: 1px solid #6717CD;
  border-radius: 0px 10px 10px 0px;
  outline: none;
  padding-block: 10px;
  padding-inline: 50px 30px;
`;
export const DownloadUserData = styled.div`
  display: flex;
  img{
    position: absolute;
    width: 15px;
    margin-top: 14px;
    margin-left: 7px;
  }
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
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