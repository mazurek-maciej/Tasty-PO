import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import {ChevronLeft} from 'styled-icons/feather/ChevronLeft';
import H2 from '../Fonts/H2';
import editIcon from '../../utils/icons/Edit.svg';

const PosedTopBar = posed.div({
  enter: {x: 0, opacity: 1},
  exit: {x: 50, opacity: 0},
});
const TopBarWraper = styled(PosedTopBar)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height: 60px;
  margin: 0 16px;
  margin-bottom: 80px;
  width: 340px;
`;
const BackIcon = styled(ChevronLeft)`
  width: 24px;
  height: 24px;
  color: ${({theme}) => theme.colors.$D1};
`;
const EditIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: auto;
  margin-right: 8px;
`;
const TopBar = () => (
  <TopBarWraper>
    <Link to="/main" style={{marginRight: '8px'}}>
      <BackIcon />
    </Link>
    <H2 white big>
      Twój profil
    </H2>
    <EditIcon src={editIcon} />
  </TopBarWraper>
);

TopBar.propTypes = {};

export default TopBar;
