import styled from 'styled-components';
import {theme} from '../../utils/theme';

const P = styled.p`
  color: ${theme.colors.$D8};
  padding: ${props => `${props.padding}`};
  margin: ${props => `${props.margin}`};
  font-size: ${props =>
    props.big
      ? `${theme.fonts.$18}`
      : props.small
      ? `${theme.fonts.$14}`
      : `${theme.fonts.$16}`};
`;

export default P;
