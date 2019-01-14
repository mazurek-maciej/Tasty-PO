import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {addComment} from '../../store/actions/addCommentAction';
import styled from 'styled-components';
import Loading from '../Loading';

const Wraper = styled.div`
  display: ${props => (props.disp ? 'flex' : 'none')};
  justify-content: center;
  width: 100%;
  color: ${({theme}) => theme.colors.$white};
`;
const CommentsWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.colors.$white};
`;
const Comment = styled.div`
  width: 500px;
  border: 1px solid gray;
  background-color: #efefef;
  color: ${({theme}) => theme.colors.$dark};
  padding: 1rem;
  margin: 0.5rem;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.3);
  @media (min-width: 320px) and (max-width: 480px) {
    width: 200px;
  }
`;
const NameWraper = styled.div`
  padding-bottom: 0.5rem;
`;
const CommentWraper = styled.div`
  background-color: #f4f4f4;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
`;

class CommentForm extends React.Component {
  state = {
    comment: '',
    name: '',
    id: '',
    restaurantId: '',
  };
  render() {
    const {store, restId, disp} = this.props;
    if (!store.comments) return <Loading />;
    if (!store.comments) return <Loading />;
    const searchForComments = store.comments.filter(
      com => com.restaurantId === restId,
    );
    console.log(this.props);
    return (
      <Wraper disp={disp}>
        <div className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-7">
                <form onSubmit={this.handleSubmit}>
                  <h3 className="subtitle">Wyraź swoją opinię</h3>
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
              </div>
            </div>
            <CommentsWraper>
              {searchForComments.map(com => (
                <Comment>
                  <NameWraper>
                    <p>{com.name}</p>
                  </NameWraper>
                  <CommentWraper>
                    <p>{com.comment}</p>
                  </CommentWraper>
                </Comment>
              ))}
            </CommentsWraper>
          </div>
        </div>
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
    this.setState({
      [e.target.id]: e.target.value,
      id: userId,
      restaurantId: restId,
    });
  };
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    store: state.firestore.ordered,
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
