import styled from 'styled-components';
import { theme } from '../../utils/theme';
import { media } from '../../utils/media';

const H1 = styled.h1`
  color: ${props =>
    props.white ? `${theme.colors.$D1}` : `${theme.colors.$darkFont}`};
  padding: ${props => `${props.padding}`};
  margin: ${props => `${props.margin}`};
  font-size: ${theme.fonts.$h1} ${media.phone`
    font-size: ${theme.fonts.$h2}
  `};
`;

export default H1;
