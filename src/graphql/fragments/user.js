import { gql } from '@apollo/client';

export const UserFragment = gql`
  fragment UserFragment on User {
    _id
    email
    isOnboarded
    userType
  }
`;
