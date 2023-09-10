import { gql } from '@apollo/client';
import { UserInfoFragment } from 'graphql/fragments/user';
import { JobFragment } from 'graphql/fragments/job';

export const GET_JOB_APPLICATIONS = gql`
  query getJobApplications(
    $jobId: ID!
    $status: String
    $limit: Int
    $offset: Int
  ) {
    getJobApplications(
      jobId: $jobId
      status: $status
      limit: $limit
      offset: $offset
    ) {
      _id
      jobId
      status
      createdAt
      price
      message
      creatorRating
      creator {
        firstName
        lastName
        userId
        profilePicture
        bio
        taxId
      }
    }
  }
`;

export const GET_JOB_APPLICATION_BY_ID = gql`
  query getJobApplicationById($id: ID!) {
    getJobApplicationById(id: $id) {
      _id
      jobId
      createdAt
      paymentStatus
      creatorRating
      status
      price
      job {
        ...JobFragment
      }
      message
      creator {
        ...UserInfoFragment
      }
    }
  }
  ${UserInfoFragment}
  ${JobFragment}
`;

export const GET_PAYMENT_INTENT = gql`
  query getPaymentIntent($jobApplicationId: ID!) {
    getPaymentIntent(jobApplicationId: $jobApplicationId) 
  }
`;

export const GET_PAYMENT_INTENT_INFO = gql`
  query getPaymentIntentInfo($paymentIntent: String!) {
    getPaymentIntentInfo(paymentIntent: $paymentIntent) {
      status
    }
  }
`;