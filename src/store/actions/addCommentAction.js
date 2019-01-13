export const addComment = comment => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore
      .collection('comments')
      .add({
        ...comment,
      })
      .then(() => {
        dispatch({type: 'ADD_COMMENT', comment});
      });
  };
};
