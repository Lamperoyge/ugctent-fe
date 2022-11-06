import { gql } from '@apollo/client';

export const GET_SUBMISSIONS_FOR_JOB = gql`
  query getSubmissionsForJob($input: GetSubmissionsForJobInput) {
    getSubmissionsForJob(input: $input) {
      _id
      jobId
      description
      links {
        displayName
        url
      }
      status
      createdAt
      creator {
        firstName
        lastName
      }
    }
  }
`;
