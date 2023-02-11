import { gql } from '@apollo/client';

export const CREATE_RATE = gql`
  mutation createRate($rate: Float!, $jobId: ID!, $note: String) {
    createRate(rate: $rate, jobId: $jobId, note: $note) {
      success
    }
  }
`;
