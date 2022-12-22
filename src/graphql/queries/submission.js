import { gql } from '@apollo/client';

export const GET_SUBMISSIONS_FOR_JOB = gql`
  query getSubmissionsForJob($jobId: ID!, $limit: Int!, $offset: Int!) {
    getSubmissionsForJob(jobId: $jobId, limit: $limit, offset: $offset) {
      _id
      description
      status
      createdAt
      creator {
        firstName
        lastName
      }
    }
  }
`;

export const GET_SUBMISSION_BY_ID = gql`
  query getSubmissionById($submissionId: ID!) {
    getSubmissionById(submissionId: $submissionId) {
      _id
      jobId
      attachments
      title
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