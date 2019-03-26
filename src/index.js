import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import fbConfig from './config/fbConfig';
import rootReducer from './store/reducers/rootReducer';
import * as serviceWorker from './serviceWorker';

const GRAPHCMS_API =
  'https://api-euwest.graphcms.com/v1/cjtpsukx119j901b9o41g680a/master';

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache(),
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  compose(
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      reactReduxFirebase(fbConfig, {
        useFirestoreForProfile: true,
        userProfile: 'users',
        attachAuthIsReady: true,
      }), // redux binding for firebase
      reduxFirestore(fbConfig) // redux bindings for firestore
    )
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>,
    document.getElementById('root')
  );
  serviceWorker.unregister();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
