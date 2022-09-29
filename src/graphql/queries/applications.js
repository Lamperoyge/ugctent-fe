import { gql } from '@apollo/client';

export const GET_JOB_APPLICATIONS = gql`
  query getJobApplications($jobId: ID!, $status: String, $limit: Int, $offset: Int) {
    getJobApplications(jobId: $jobId, status: $status, limit: $limit, offset: $offset) {
      _id
      jobId
      status
      createdAt
      price
      message
      creator {
        firstName
        lastName
        userId
        profilePicture
        bio
      }
    }
  }
`;

export const GET_JOB_APPLICATION_BY_ID = gql`
  query getJobApplicationById($id: ID!) {
    getJobApplicationById(id: $id) {
      _id
      jobId
      status
      price
      message
      creator {
        firstName
        lastName
        userId
        profilePicture
        bio
      }
    }
  }
`;
