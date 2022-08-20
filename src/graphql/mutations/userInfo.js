import { gql } from '@apollo/client';

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
      displayName
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
