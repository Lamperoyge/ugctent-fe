import { gql } from "@apollo/client";

export const CREATE_USER_INFO = gql`
  mutation createUserInfo($input: UserInfoInput) {
    createUserInfo(input: $input) {
      _id
      bio
      firstName
      profilePicture
      lastName
      interestIds
      companyName
      works {
        title
        clientName
        attachments
        description
      }
      taxId
      contactName
      socialLinks {
        youtube
        facebook
        instagram
        tiktok
      }
      skillIds
      categoryIds
      website
      city
      country
    }
  }
`;

export const CONNECT_STRIPE = gql`
  mutation createUserInfoStripe {
    createUserInfoStripe {
      url
    }
  }
`;
