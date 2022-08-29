import { gql } from '@apollo/client';

export const GET_CREATED_JOBS = gql`
  query getJobsForBusinessUser($input: GetByIdInput) {
    getJobsForBusinessUser(input: $input) {
      _id
      title
      assigneeId
      price
      createdBy
      categoryId
      skillIds
      dueDate
      links
      status
      description
    }
  }
`;

export const GET_ASSIGNED_JOBS = gql`
  query getJobsForCreator($input: GetByIdInput) {
    getJobsForCreator(input: $input) {
      _id
      title
      assigneeId
      price
      createdBy
      categoryId
      skillIds
      dueDate
      links
      status
      description
    }
  }
`;
