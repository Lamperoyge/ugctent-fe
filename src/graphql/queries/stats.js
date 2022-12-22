import { gql } from '@apollo/client';

export const GET_TOTAL_COMPLETED_JOBS = gql`
    query getTotalCompletedJobs {
        getTotalCompletedJobs
    }
`;