import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ChevronLeft } from 'styled-icons/feather/ChevronLeft';
import H2 from '../Fonts/H2';

const TopBarWrapper = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height: 60px;
  margin: 0 16px;
`;
const BackIcon = styled(ChevronLeft)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.$D1};
`;
const TopBar = ({ title }) => (
  <React.Fragment>
    <TopBarWrapper>
      <Link to="/" style={{ marginRight: '8px' }}>
        <BackIcon />
      </Link>
      <H2 white big>
        {title}
      </H2>
    </TopBarWrapper>
  </React.Fragment>
);

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopBar;
