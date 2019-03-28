import styled from 'styled-components';
import { theme } from '../../utils/theme';

const P = styled.p`
  color: ${theme.colors.$D8};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  font-weight: ${props => (props.bold ? '700' : '300')};
  font-size: ${props =>
    props.big
      ? theme.fonts.$h4
      : props.small
      ? theme.fonts.$label
      : theme.fonts.$text};
`;

export default P;
