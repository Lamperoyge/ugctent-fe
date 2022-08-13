import { gql } from '@apollo/client';
import { UserFragment } from 'graphql/fragments/user';

export const GET_LOGGED_IN_USER = gql`
  query {
    getLoggedInUser {
      _id
      isOnboarded
      email
      userType
    }
  }
`;
