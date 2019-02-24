import React from 'react';
import styled from 'styled-components';
import H2 from '../Fonts/H2';

const TopBarWraper = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height: 60px;
  margin: 0 16px;
  margin-bottom: 80px;
  width: 340px;
`;
const TopBar = ({title}) => (
  <TopBarWraper>
    <a style={{marginRight: '8px'}}>
      <span style={{color: '#f9f9f9'}}>◁</span>
    </a>
    <H2 white big>
      {title}
    </H2>
  </TopBarWraper>
);

export default TopBar;
