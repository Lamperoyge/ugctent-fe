import {gql} from '@apollo/client';

export const CREATE_JOB_APPLICATION = gql`
  mutation createJobApplication($input: CreateJobApplicationInput) {
    createJobApplication(input: $input) {
      success
    }
  }
`;

export const APPROVE_JOB_APPLICATION = gql`
  mutation approveJobApplication($jobApplicationId: ID!) {
    approveJobApplication(jobApplicationId: $jobApplicationId) {
      success
    }
  }
`;

export const REJECT_JOB_APPLICATION = gql`
  mutation rejectJobApplication($jobApplicationId: ID!) {
    rejectJobApplication(jobApplicationId: $jobApplicationId) {
      success
    }
  }
`;
