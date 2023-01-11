import { gql } from '@apollo/client';

export const CREATE_JOB_SUBMISSION = gql`
    mutation createJobSubmission($input: CreateJobSubmissionInput) {
        createJobSubmission(input: $input) {
            success
        }
    }
`;

export const APPROVE_JOB_SUBMISSION = gql`
    mutation approveJobSubmission($submissionId: ID!) {
        approveJobSubmission(submissionId: $submissionId) {
            success
        }
    }
`;

export const REJECT_JOB_SUBMISSION = gql`
    mutation rejectJobSubmission($submissionId: ID!) {
        rejectJobSubmission(submissionId: $submissionId) {
            success
        }
    }
`;