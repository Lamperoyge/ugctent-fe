import { gql } from '@apollo/client';

export const GET_SKILLS = gql`
  query ($limit: Int, $offset: Int) {
    getSkills(input: { limit: $limit, offset: $offset }) {
      _id
      label
    }
  }
`;
