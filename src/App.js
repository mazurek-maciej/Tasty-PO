import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Layout from './components/Layout/layout';
import Root from './routes';

const App = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <Root />
    </Layout>
  );
};

export const posts = gql`
  query content(
    $first: Int
    $skip: Int
    $where: RestaurantsWhereInput
    $orderBy: RestaurantsOrderByInput
  ) {
    restaurantses: restaurantsesConnection(
      first: $first
      skip: $skip
      where: $where
      orderBy: $orderBy
    ) {
      edges {
        node {
          status
          updatedAt
          createdAt
          id
          slug
          title
        }
      }
    }
  }
`;

export const postsQueryVars = {
  skip: 0,
  first: 4,
};

export default graphql(posts)(App);
