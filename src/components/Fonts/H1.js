import styled from "styled-components";
import { theme } from "../../utils/theme";

const H1 = styled.h1`
  color: ${theme.colors.$darkFont};
  padding: ${props => `${props.padding}`};
  margin: ${props => `${props.margin}`};
  font-size: ${props =>
    props.big ? `${theme.fonts.$32}` : `${theme.fonts.$26}`};
`;

export default H1;
