import { gql } from '@apollo/client';

export const CREATE_JOB_SUBMISSION = gql`
    mutation createJobSubmission($input: CreateJobSubmissionInput) {
        createJobSubmission(input: $input) {
            success
        }
    }
`;