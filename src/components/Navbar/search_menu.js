import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

const PosedNav = posed.div({
  visible: {
    opacity: 1,
    applyAtStart: {display: 'block'},
    transition: {
      opacity: {ease: 'easeIn', duration: 200},
    },
  },
  hidden: {
    opacity: 0,
    applyAtEnd: {display: 'none'},
    transition: {
      opacity: {ease: 'easeOut', duration: 300},
    },
  },
});

const Wraper = styled(PosedNav)`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.$D2};
  z-index: 999999;
`;

const LinksWraper = styled.div`
  font-size: 1.2rem;
`;

const SearchMenu = ({isSearchMenuActive, links}) => (
  <Wraper
    active={isSearchMenuActive ? true : false}
    pose={isSearchMenuActive ? 'visible' : 'hidden'}
  >
    <LinksWraper>{links}</LinksWraper>
  </Wraper>
);

export default SearchMenu;
