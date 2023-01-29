import { gql } from '@apollo/client';

export const GET_INTERESTS = gql`
  query ($limit: Int, $offset: Int) {
    getInterests(input: { limit: $limit, offset: $offset }) {
      _id
      label
    }
  }
`;
