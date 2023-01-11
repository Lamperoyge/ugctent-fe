import { gql } from '@apollo/client';

export const GET_TOTAL_COMPLETED_JOBS = gql`
    query getTotalCompletedJobs {
        getTotalCompletedJobs
    }
`;

export const GET_TOTAL_ASSIGNED_JOBS = gql`
    query getTotalAssignedJobs {
        getTotalAssignedJobs
    }
`;

export const GET_TOTAL_CREATED_JOBS = gql`
    query getTotalCreatedJobs {
        getTotalCreatedJobs
    }
`;