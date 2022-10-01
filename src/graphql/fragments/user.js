import { gql } from '@apollo/client';

export const UserFragment = gql`
  fragment UserFragment on User {
    _id
    email
    isOnboarded
    userType
  }
`;

export const UserInfoFragment = gql`
  fragment UserInfoFragment on UserInfo {
    _id
    bio
    firstName
    profilePicture
    lastName
    interestIds
    companyName
    userId
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
`;
