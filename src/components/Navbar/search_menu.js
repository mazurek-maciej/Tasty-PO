import React from 'react'
import styled from 'styled-components'

const Wraper = styled.div`
    display: none;
    position: absolute;
    z-index: 99999;
    height: 30vh;
    width: 100%;
    justify-content: center;
    align-content: center;
    background-color: snow;
    border-bottom: 1px solid #363636;
`;
const MenuWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 70vw;
  padding: 2rem;
  border-top: 1px solid #363636;
`;
const LinksWraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 100%;
  padding: 1rem;
  align-items: center;
  background-color: #ed4263;
  border-left: 1px solid #363636;
`;


const SearchMenu = ({ isSearchMenuActive, links }) => (
    <Wraper className={isSearchMenuActive}>
        <MenuWraper>
            <h1 className='subtitle'>Znajdź swój ulubiony lokal!</h1>
            <form>
                <div className="field">
                    <input className='input' type="text"/>
                </div>
                <div className="field">
                    <button className='button is-info'>Szukaj</button>
                </div>
            </form>
        </MenuWraper>
        <LinksWraper>
            {links}
        </LinksWraper>
    </Wraper>
)

export default SearchMenu