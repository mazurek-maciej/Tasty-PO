import React from 'react';
import styled from 'styled-components';

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
const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  padding-top: 16px;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 2rem;
  }
`;
const H2 = styled.h2`
  color: ${({theme}) => theme.colors.$primary};
  font-size: 2rem;
  margin-bottom: 8px;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 1rem;
  }
`;
const SearchButton = styled.input`
  width: 170px;
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
      <H1>
        Witaj {userInfo.name} {userInfo.surname}!
      </H1>
    </TopContainer>
    <BottomContainer>
      <H2>Skorzystaj z mapy, lub szybkiego wyszukiwania!</H2>
      <SearchButton type="text" placeholder="Under construction 🚧" />
    </BottomContainer>
  </HelloWraper>
);

export default HelloUserContainer;
