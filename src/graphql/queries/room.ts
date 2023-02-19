import { gql } from '@apollo/client';
import { NotificationFragment } from 'graphql/fragments/notification';

export const GET_ROOM_FOR_MEMBER_IDS = gql`
  query getRoomForMemberIds(
    $senderId: ID!
    $receiverId: ID!
    $limit: Int
    $offset: Int
  ) {
    getRoomForMemberIds(
      senderId: $senderId
      receiverId: $receiverId

      limit: $limit
      offset: $offset
    ) {
      _id
      members
      messages {
        text
        createdBy
      }
    }
  }
`;
