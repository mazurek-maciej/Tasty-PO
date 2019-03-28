import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import P from '../../Fonts/P';

const Wrapper = styled.div`
  max-width: 300px;
  width: 100%;
  border: 1px solid hsla(0, 0%, 30%, 0.3);
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.$dark};
  padding: 8px;
  margin: 1rem;
`;
const NameWraper = styled.div`
  padding-bottom: 0.5rem;
`;
const CommentWraper = styled.div`
  padding: 16px;
`;
const Comment = ({ name, text }) => (
  <Wrapper>
    <NameWraper>
      <P bold>{name}</P>
    </NameWraper>
    <CommentWraper>
      <P>{text}</P>
    </CommentWraper>
  </Wrapper>
);

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default Comment;
