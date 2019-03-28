import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import posed from 'react-pose';
import { ChevronLeft } from 'styled-icons/feather/ChevronLeft';
import H2 from '../Fonts/H2';

const PosedTopBar = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 },
});
const TopBarWrapper = styled(PosedTopBar)`
  align-self: flex-start;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height: 60px;
  margin: 0 16px;
  margin-bottom: 48px;
`;
const PosedIcon = posed(ChevronLeft)({
  hoverable: true,
  init: {
    x: 0,
    scale: 1,
  },
  hover: {
    x: -2,
    scale: 1.05,
  },
});
const BackIcon = styled(PosedIcon)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.$D9};
`;

const TopContainer = () => (
  <TopBarWrapper>
    <Link to="/" style={{ marginRight: '8px' }}>
      <BackIcon />
    </Link>
    <H2 big>Twoja lista</H2>
  </TopBarWrapper>
);

export default TopContainer;
