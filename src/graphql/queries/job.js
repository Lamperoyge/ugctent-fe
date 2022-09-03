import { gql } from '@apollo/client';

export const GET_CREATED_JOBS = gql`
  query getJobsForBusinessUser($input: GetByIdInput) {
    getJobsForBusinessUser(input: $input) {
      _id
      title
      assigneeId
      price
      createdBy
      category {
        _id,
        label
      }
      skills {
        _id,
        label
      }
      dueDate
      links
      status
      description
      applicationsCount
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
      skills {
        _id,
        label
      }
      dueDate
      links
      status
      description
    }
  }
`;
