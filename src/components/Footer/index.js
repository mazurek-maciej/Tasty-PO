import React from 'react';
import styled from 'styled-components';


const FooterWarper = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.colors.$white}
`;

const Footer = () => (
    <FooterWarper>
        Made with 💙 in Politechnika Opolska
    </FooterWarper>
);

export default Footer;