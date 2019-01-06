import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose';

const PosedNav = posed.div({
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            opacity: { ease: 'easeIn', duration: 300 },
        }
    },
    hidden: {
        opacity: 0,
        x: '100%',
        transition: {
            opacity: { ease: 'easeOut', duration: 300 },
        }
    }
})

const Wraper = styled(PosedNav)`
    position: absolute;
    z-index: 99999;
    height: 100vh;
    width: 50%;
    right: 0;
    justify-content: center;
    align-content: center;
    background-color: snow;
    border-bottom: 1px solid #363636;
`;

const LinksWraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
  align-items: center;
  background-color: #ed4263;
  border-left: 1px solid #363636;
`;


const SearchMenu = ({ isSearchMenuActive, links }) => (
    <Wraper 
    pose={ isSearchMenuActive ? 'visible' : 'hidden'}
    className={isSearchMenuActive}>
        <LinksWraper>
            {links}
        </LinksWraper>
    </Wraper>
)

export default SearchMenu