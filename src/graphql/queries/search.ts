import { gql } from '@apollo/client';

export const GLOBAL_SEARCH = gql`
  query search($query: String!) {
    search(query: $query) {
      jobs {
        _id
        title
        description
        createdAt
        updatedAt
        price
      }
      creators {
        _id
        firstName
        lastName
        profilePicture
        bio
      }
      companies {
        _id
        companyName
        firstName
        lastName
        profilePicture
        bio
      }
    }
  }
`;
