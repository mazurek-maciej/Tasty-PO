import React from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import {theme} from '../../utils/theme';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: ${({theme}) => theme.colors.$dark};
    font-family: Montserrat;
    *, *::before, *::after {
      box-sizing: border-box;
    }
  }
`;

const Layout = ({children}) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      {children}
    </>
  </ThemeProvider>
);

export default Layout;
