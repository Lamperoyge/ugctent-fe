import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation createComment(
    $entityId: ID!
    $entityType: String!
    $content: String!
  ) {
    createComment(
      entityId: $entityId
      entityType: $entityType
      content: $content
    ) {
      success
    }
  }
`;
