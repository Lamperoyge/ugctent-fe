import { gql } from '@apollo/client';

export const CREATE_JOB = gql`
  mutation createJob($input: CreateJobInput) {
    createJob(input: $input) {
        success
    }
  }
`;
