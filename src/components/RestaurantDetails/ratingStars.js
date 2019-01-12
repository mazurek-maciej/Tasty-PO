import React from "react";
import styled from "styled-components";

const Wraper = styled.div`
  width: 100vw;
  display: ${props => (props.disp ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;
const RatingWraper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  text-align: center;
  padding-bottom: 2rem;
  * > h2 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.$white};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    h2 {
      font-size: 1.5rem;
    }
  }
`;
const RatingStar = styled.button`
  flex: 1;
  margin: 1rem;
  padding: 20px 30px;
  border: 1px solid ${({ theme }) => theme.colors.$primary};
  color: ${({ theme }) => theme.colors.$white};
  font-size: 2rem;
  border-radius: 100%;
  background: transparent;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
  :hover {
    background-color: ${({ theme }) => theme.colors.$primary};
    color: ${({ theme }) => theme.colors.$dark};
  }
  :active {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 1rem;
    padding: 10px 15px;
  }
`;

const RatingStars = ({ handleRatingClick, placeId, authId, restaurantIdFromUserProfile }) => (
  <Wraper disp={!restaurantIdFromUserProfile}>
    <RatingWraper>
      <div>
        <h2>Jak oceniasz tą restauracje?</h2>
      </div>
      <div>
        <RatingStar
          onClick={() =>
            handleRatingClick(1, placeId, authId)
          }
        >
          1
        </RatingStar>

        <RatingStar
          onClick={() =>
            handleRatingClick(2, placeId, authId)
          }
        >
          2
        </RatingStar>

        <RatingStar
          onClick={() =>
            handleRatingClick(3, placeId, authId)
          }
        >
          3
        </RatingStar>

        <RatingStar
          onClick={() =>
            handleRatingClick(4, placeId, authId)
          }
        >
          4
        </RatingStar>

        <RatingStar
          onClick={() =>
            this.handleRatingClick(5, placeId, authId)
          }
        >
          5
        </RatingStar>
      </div>
    </RatingWraper>
  </Wraper>
);

export default RatingStars;