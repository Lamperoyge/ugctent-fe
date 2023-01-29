import { gql } from '@apollo/client';

export const CategoryFragment = gql`
  fragment CategoryFragment on Category {
    _id
    label
  }
`;
