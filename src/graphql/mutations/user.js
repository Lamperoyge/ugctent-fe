import { gql } from '@apollo/client';
import { UserFragment } from 'graphql/fragments/user';

export const EMAIL_SIGN_UP = gql`
  mutation emailSignUp($input: EmailSignUpInput) {
    emailSignUp(input: $input) {
      user {
        ...UserFragment
      }
      token
    }
  }
  ${UserFragment}
`;

export const EMAIL_SIGN_IN = gql`
  mutation emailSignIn($input: EmailSignInInput) {
    emailSignIn(input: $input) {
      user {
        ...UserFragment
      }
      token
    }
  }
  ${UserFragment}
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      success
    }
  }
`;
