import React from "react";
import styled from "styled-components";
import posed from "react-pose";

const PosedNav = posed.div({
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: { ease: "easeIn", duration: 300 }
    }
  },
  hidden: {
    opacity: 0,
    x: "100%",
    transition: {
      opacity: { ease: "easeOut", duration: 300 }
    }
  }
});

const Wraper = styled(PosedNav)`
  display: ${props => props.active ? 'block' : 'none'};
  position: absolute;
  z-index: 99999999;
  right: 0;
  width: 30vw;
  height: 90vh;
  border-bottom: 1px solid #363636;
`;

const LinksWraper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 99999999;
  width: 100%;
  padding: 1rem;
  align-items: center;
  background-color: #ed4263;
  border-left: 1px solid #363636;
`;

const SearchMenu = ({ isSearchMenuActive, links }) => (
  <Wraper
    active={isSearchMenuActive ? true: false}
    pose={isSearchMenuActive ? "visible" : "hidden"}
    className={isSearchMenuActive}
  >
    <LinksWraper>{links}</LinksWraper>
  </Wraper>
);

export default SearchMenu;
