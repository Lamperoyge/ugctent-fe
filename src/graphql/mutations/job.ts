import { gql } from '@apollo/client';

export const CREATE_JOB = gql`
  mutation createJob($input: CreateJobInput) {
    createJob(input: $input) {
      success
    }
  }
`;

export const ARCHIVE_JOB = gql`
  mutation archiveJob($jobId: ID!) {
    archiveJob(jobId: $jobId) {
      success
    }
  }
`;

export const COMPLETE_JOB = gql`
  mutation completeJob($jobId: ID!) {
    completeJob(jobId: $jobId) {
      success
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation updateJob($input: UpdateJobInput) {
    updateJob(input: $input) {
      success
    }
  }
`;

export const REQUEST_INVOICE = gql`
  mutation requestInvoice($jobId: ID!, $input: RequestInvoiceInput) {
    requestInvoice(jobId: $jobId, input: $input) {
      success
    }
  }
`;