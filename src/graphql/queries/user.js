import { gql } from '@apollo/client';
import { UserFragment } from 'graphql/fragments/user';

export const GET_LOGGED_IN_USER = gql`
  query {
    getLoggedInUser {
      _id
      isOnboarded
      email
      userType
      userInfo {
        _id
        userId
        bio
        firstName
        profilePicture
        lastName
        interestIds
        companyName
        taxId
        contactName
        skillIds
        categoryIds
        city
        country
        isStripeVerified
      }
    }
  }
`;
