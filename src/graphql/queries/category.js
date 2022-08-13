import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query ($limit: Int, $offset: Int) {
    getCategories(input: { limit: $limit, offset: $offset }) {
      _id
      label
    }
  }
`;
