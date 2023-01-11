import { gql } from '@apollo/client';
import { UserInfoFragment } from 'graphql/fragments/user';

export const GET_COMMENTS = gql`
  query getCommentsByEntityId(
    $entityId: ID!
    $entityType: String!
    $limit: Int
    $offset: Int
  ) {
    getCommentsByEntityId(
      entityId: $entityId
      entityType: $entityType
      limit: $limit
      offset: $offset
    ) {
      _id
      content
      createdAt
      priceSuggestion {
        _id
        price
        status
        createdBy
      }
      creator {
        ...UserInfoFragment
      }
    }
  }
  ${UserInfoFragment}
`;
