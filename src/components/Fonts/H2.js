import styled, {css} from 'styled-components';
import {theme} from '../../utils/theme';

const H2 = styled.h2`
  color: ${theme.colors.$D9};
  padding: ${props => `${props.padding}`};
  margin: ${props => `${props.margin}`};
  font-size: ${props =>
    props.big ? `${theme.fonts.$24}` : `${theme.fonts.$18}`};
  transition: 0.8s ease all;
`;

export default H2;
