import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
  query getNotifications($limit: Int, $offset: Int) {
    getNotifications(limit: $limit, offset: $offset) {
      _id
      entityType
      entityId
      createdBy
      viewedAt
      notificationType
      createdAt
      updatedAt
      creator {
        firstName
        lastName
        profilePicture
      }
      entity {
        title
        description
        parentEntityId
      }
    }
  }
`;
