import { gql } from '@apollo/client';

export const NotificationFragment = gql`
  fragment NotificationFragment on Notification {
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
`;
