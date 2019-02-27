import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import H2 from '../Fonts/H2';

const PosedPopUp = posed.div({
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
});
const Pop = styled(PosedPopUp)`
  position: fixed;
  top: 0;
  z-index: 3;
  display: ${props => (props.pop ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: hsla(0, 0%, 0%, 0.9);
  box-shadow: 0 4px 20px hsla(0, 0%, 0%, 0.8);
`;
const PopUpWraper = styled.div`
  display: flex;
  align-items: center;
  button {
    margin: 1rem;
  }
  h2 {
    margin: 1rem;
  }
`;
const PopUp = ({active}) => (
  <Pop pop={active}>
    <H2 white>Dziękujemy za oddanie głosu!</H2>
  </Pop>
);
export default PopUp;
