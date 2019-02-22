import React from 'react';
import styled from 'styled-components';
import H1 from '../Fonts/H1';
import H2 from '../Fonts/H2';

const HelloWraper = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TopContainer = styled.div`
  flex: 1;
`;
const BottomContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SearchButton = styled.input`
  width: 200px;
  height: 30px;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: #f2f2f2;
  text-align: center;
`;
const HelloUserContainer = ({userInfo}) => (
  <HelloWraper>
    <TopContainer>
      <H1 padding="16px 0 0 0">
        Witaj {userInfo.name} {userInfo.surname}!
      </H1>
    </TopContainer>
    <BottomContainer>
      <H2 margin="0 0 8px 0">Skorzystaj z mapy, lub szybkiego wyszukiwania!</H2>
      <SearchButton type="text" placeholder="Under construction 🚧" />
    </BottomContainer>
  </HelloWraper>
);

export default HelloUserContainer;
