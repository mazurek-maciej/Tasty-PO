import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { addComment } from '../../../store/actions/addCommentAction';

import P from '../../Fonts/P';
import H2 from '../../Fonts/H2';
import Loading from '../../Loading';
import AddComment from './AddComment';
import Comment from './Comment';

const Wraper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`;
const FormWraper = styled.div`
  align-self: flex-start;
  max-width: 300px;
  width: 100%;
  padding: 0 1rem;
`;
const MainCommentWraper = styled.div`
  max-width: 300px;
  width: 100%;
`;

class Index extends React.Component {
  state = {
    comment: '',
    id: this.props.auth.uid,
    restaurantId: this.props.restId,
    name: this.props.profile.name,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addComment(this.state);
    this.setState({
      comment: '',
    });
  };

  handleChange = e => {
    this.setState({
      comment: e.target.value,
    });
  };

  render() {
    const { store, restId, auth } = this.props;
    if (!store.comments) return <Loading />;

    const commentsToDisplay = store.comments.filter(
      com => com.restaurantId === restId
    );

    const userAddComment = store.comments.find(
      comment => comment.id === auth.uid
    );

    return (
      <Wraper>
        {!userAddComment ? <AddComment /> : null}
        <MainCommentWraper>
          <H2>Komentarze</H2>
          {commentsToDisplay.slice(0, 4).map((com, index) => (
            <Comment key={index} name={com.name} text={com.comment} />
          ))}
        </MainCommentWraper>
      </Wraper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  store: state.firestore.ordered,
  profile: state.firebase.profile,
});
const mapDispatchToProps = dispatch => ({
  addComment: comment => dispatch(addComment(comment)),
});

Comment.propTypes = {
  restId: PropTypes.string,
  disp: PropTypes.string,
  store: PropTypes.object,
  auth: PropTypes.object,
  profile: PropTypes.object,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'comments' }])
)(Index);
