import { gql } from '@apollo/client';
import { JobFragment } from 'graphql/fragments/job';

export const GET_CREATED_JOBS = gql`
  query getJobsForBusinessUser($input: GetByIdInput) {
    getJobsForBusinessUser(input: $input) {
      _id
      title
      assigneeId
      price
      createdBy
      category {
        _id
        label
      }
      skills {
        _id
        label
      }
      dueDate
      links
      status
      description
      applicationsCount
      updatedAt
    }
  }
`;

export const GET_ASSIGNED_JOBS = gql`
  query getJobsForCreator($input: GetJobsInput) {
    getJobsForCreator(input: $input) {
      _id
      title
      assigneeId
      price
      createdBy
      updatedAt
      categoryId
      skills {
        _id
        label
      }
      dueDate
      links
      status
      description
    }
  }
`;

export const GET_JOB_BY_ID = gql`
  query getJobById($id: ID!) {
    getJobById(id: $id) {
      _id
      title
      assigneeId
      assignee {
        firstName
        lastName
        userId
        profilePicture
      }
      price
      creator {
        firstName
        lastName
        userId
      }
      category {
        _id
        label
      }
      skills {
        _id
        label
      }
      submissionsCount
      applicationsCount
      attachments
      dueDate
      links
      status
      description
      createdAt
      updatedAt
      userApplication {
        _id
        hasUserApplied
      }
    }
  }
`;

export const GET_JOBS = gql`
  query getJobs($input: GetJobsInput) {
    getJobs(input: $input) {
      ...JobFragment
    }
  }
  ${JobFragment}
`;
