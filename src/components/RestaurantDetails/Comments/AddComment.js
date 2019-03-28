import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormWraper = styled.div`
  align-self: flex-start;
  max-width: 300px;
  width: 100%;
  padding: 0 1rem;
`;
const Title = styled.h3`
  color: ${({ theme }) => theme.colors.$dark};
  font-weight: 600;
  margin: 1rem 0;
`;
const AddComment = ({ handleSubmit, handleChange, comment }) => (
  <FormWraper>
    <form onSubmit={handleSubmit}>
      <figure>
        <Title>Wyraź swoją opinię</Title>
      </figure>
      <div className="field">
        <textarea
          className="textarea"
          placeholder="Wprowadź swoją opinię"
          id="comment"
          type="text"
          value={comment}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit" className="button is-success">
          Zatwierdź
        </button>
      </div>
    </form>
  </FormWraper>
);

AddComment.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
};

export default AddComment;
