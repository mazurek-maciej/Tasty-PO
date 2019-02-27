import React from 'react';
import styled, {css} from 'styled-components';
import H2 from '../../components/Fonts/H2';

const ratingsCheck = css`
  display: none;
`;
const RatingWraper = styled.div`
  display: ${props => (props.disp ? 'flex' : 'none')};
  flex-direction: column;
  max-width: 900px;
  text-align: center;
  padding-bottom: 2rem;
  * > h2 {
    font-size: 1.2rem;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    h2 {
      font-size: 1rem;
    }
  }
  ${props => props.hide && ratingsCheck}
`;

const RatingStar = styled.button`
  flex: 1;
  margin: 8px;
  padding: 20px 30px;
  border: 1px solid ${({theme}) => theme.colors.$primary};
  color: ${({theme}) => theme.colors.$dark};
  font-size: 2rem;
  border-radius: 100%;
  background: ${({theme}) => theme.colors.$primary};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
  &::after {
    position: absolute;
    content: '';
    z-index: -1;
    opacity: 0;
    top: 0;
    left: 0;
    border-radius: 100%;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.6);
    transition: all 0.2s ease-in;
  }
  :hover::after,
  :active::after {
    opacity: 1;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 1rem;
    padding: 10px 15px;
  }
`;
const RatingsStars = ({place, auth, disp, handleClick, hide}) => (
  <RatingWraper disp={disp} hide={hide}>
    <div>
      <H2>Jak oceniasz tą restauracje?</H2>
    </div>
    <div>
      <RatingStar onClick={() => handleClick(1, place, auth)}>1</RatingStar>

      <RatingStar onClick={() => handleClick(2, place, auth)}>2</RatingStar>

      <RatingStar onClick={() => handleClick(3, place, auth)}>3</RatingStar>

      <RatingStar onClick={() => handleClick(4, place, auth)}>4</RatingStar>

      <RatingStar onClick={() => handleClick(5, place, auth)}>5</RatingStar>
    </div>
  </RatingWraper>
);

export default RatingsStars;
