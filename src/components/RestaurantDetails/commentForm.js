import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {addComment} from '../../store/actions/addCommentAction';
import styled from 'styled-components';
import Loading from '../Loading';

const Wraper = styled.div`
  display: ${props => (props.disp ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CommentsWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.colors.$white};
`;
const FormWraper = styled.div`
  max-width: 600px;
  width: 100%;
  form {
    margin: 1rem;
  }
`;
const Comment = styled.div`
  border: 1px solid hsla(0, 0%, 30%, 0.3);
  border-radius: 24px;
  color: ${({theme}) => theme.colors.$dark};
  padding: 24px;
  margin: 1rem;
  box-shadow: 0 4px 15px 0 hsla(220, 15%, 80%, 1);
`;
const NameWraper = styled.div`
  padding-bottom: 0.5rem;
`;
const CommentName = styled.p`
  font-weight: 600;
`;
const MainCommentWraper = styled.div`
  max-width: 600px;
  width: 100%;
`;
const CommentWraper = styled.div`
  padding: 16px;
  border-radius: 12px;
  box-shadow: inset 0 0 10px hsla(0, 0%, 30%, 0.3);
`;
const Title = styled.h3`
  color: ${({theme}) => theme.colors.$dark};
  font-weight: 600;
  margin: 1rem 0;
`;

class CommentForm extends React.Component {
  state = {
    comment: '',
    name: '',
    id: '',
    restaurantId: '',
  };
  render() {
    const {store, restId, disp, profile} = this.props;
    if (!store.comments) return <Loading />;
    if (!store.comments) return <Loading />;
    const searchForComments = store.comments.filter(
      com => com.restaurantId === restId,
    );
    return (
      <Wraper disp={disp}>
        <FormWraper>
          <form onSubmit={this.handleSubmit}>
            <Title>Wyraź swoją opinię</Title>
            <div className="field">
              <input
                className="input"
                type="text"
                id="name"
                placeholder="Podaj swoje imię"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <textarea
                className="textarea"
                placeholder="Wprowadź swoją opinię"
                id="comment"
                type="text"
                value={this.state.comment}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <button className="button is-success">Zatwierdź</button>
            </div>
          </form>
        </FormWraper>
        <MainCommentWraper>
          {searchForComments.map(com => (
            <Comment key={com.name}>
              <NameWraper>
                <CommentName>{com.name}</CommentName>
              </NameWraper>
              <CommentWraper>
                <p>{com.comment}</p>
              </CommentWraper>
            </Comment>
          ))}
        </MainCommentWraper>
      </Wraper>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addComment(this.state);
    this.setState({
      name: '',
      comment: '',
    });
  };
  handleChange = e => {
    const userId = this.props.auth.uid;
    const restId = this.props.restId;
    const userName = this.props.profile.name;
    this.setState({
      name: userName,
      id: userId,
      restaurantId: restId,
    });
  };
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    store: state.firestore.ordered,
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addComment: comment => dispatch(addComment(comment)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{collection: 'comments'}]),
)(CommentForm);
