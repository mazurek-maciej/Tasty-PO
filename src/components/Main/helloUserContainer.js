import React from 'react';
import styled from 'styled-components';
import H1 from '../Fonts/H1';
import H2 from '../Fonts/H2';
import mainBg from '../../images/MainBg.jpg';
import { media } from '../../utils/media';

const HelloWraper = styled.div`
  max-width: 1120px;
  width: 100%;
  max-height: 400px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  ${media.tablet`
    align-items: center;
  `}
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
  border: 1px solid ${({ theme }) => theme.colors.$D3};
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: #f2f2f2;
  text-align: center;
`;
const ContainersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  ${media.phone`
    margin: 0 16px;
  `}
`;
const ImageShape = styled.div`
  position: absolute;
  background: url(${mainBg});
  background-size: cover;
  top: 0;
  right: 0;
  max-width: 1000px;
  width: 100%;
  height: 600px;
  clip-path: circle(50% at 70% 30%);
  z-index: -1;
`;
const ShapeBg = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.$cyan90};
  background-size: cover;
  top: 0;
  right: 0;
  max-width: 1030px;
  width: 100%;
  height: 640px;
  clip-path: circle(50% at 70% 30%);
  z-index: -2;
`;

const HelloUserContainer = ({ userInfo }) => (
  <React.Fragment>
    <HelloWraper>
      <ContainersWrapper>
        <TopContainer>
          <H1 padding="16px 0 0 0">
            Witaj {userInfo.name} {userInfo.surname}!
          </H1>
        </TopContainer>
        <BottomContainer>
          <H2 margin="0 0 8px 0">
            Skorzystaj z mapy, lub szybkiego wyszukiwania!
          </H2>
          <SearchButton type="text" placeholder="Under construction 🚧" />
        </BottomContainer>
      </ContainersWrapper>
    </HelloWraper>
    <ImageShape />
    <ShapeBg />
  </React.Fragment>
);

export default HelloUserContainer;
