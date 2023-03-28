import { gql } from '@apollo/client';

export const GET_USER_FEEDBACK = gql`
    query getFeedbackForUser($userId: ID!, $limit: Int, $offset: Int) {
        getFeedbackForUser(userId: $userId, limit: $limit, offset: $offset) {
            _id,
            rate,
            createdBy,
            receiverId,
            jobId,
            note
        }
    }
`;
