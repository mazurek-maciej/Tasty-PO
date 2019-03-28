import styled, { css } from 'styled-components';
import { theme } from '../../utils/theme';
import { media } from '../../utils/media';

const H2 = styled.h2`
  display: inline-block;
  color: ${props =>
    props.white ? `${theme.colors.$D1}` : `${theme.colors.$D9}`};
  padding: ${props => props.padding};
  margin: ${props => `${props.margin}`};
  font-size: ${theme.fonts.$h2};
  font-size: ${props => `${props.size}px`};
  transition: 0.8s ease all;
  position: relative;
  border-bottom: ${props =>
    props.underline ? `1px solid ${theme.colors.$D9}` : null};
  ${media.phone`
    font-size: ${theme.fonts.$h3}
  `}
`;

export default H2;
