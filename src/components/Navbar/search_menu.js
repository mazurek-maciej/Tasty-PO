import React from 'react'
import styled from 'styled-components'

const Menu = styled.div`
  width: 100vw;
  height: 25vh;
  display: none;
  position: absolute;
  z-index: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f9f9f9;
  box-shadow: 0px 6px 20px -10px rgba(0,0,0,0.75);
`;

const SearchMenu = ({ isSearchMenuActive }) => (
    <Menu className={isSearchMenuActive}>
        <h1 className='subtitle'>Znajdź swój ulubiony lokal!</h1>
        <form>
            <div className="field">
                <input className='input' type="text"/>
            </div>
            <div className="field">
                <button className='button is-info'>Szukaj</button>
            </div>
        </form>
    </Menu>
)

export default SearchMenu