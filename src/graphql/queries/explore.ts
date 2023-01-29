import { gql } from '@apollo/client';

export const GET_EXPLORE_CREATORS = gql`
  query getCreators(
    $skillIds: [String]
    $interestIds: [String]
    $minRating: Int
    $limit: Int
    $offset: Int
    $search: String
  ) {
    getCreators(
      skillIds: $skillIds
      interestIds: $interestIds
      minRating: $minRating
      limit: $limit
      offset: $offset
      search: $search
    ) {
      _id
      userId
      bio
      rating
      ratingsGiven
      city
      country
      firstName
      lastName
      profilePicture
      skills {
        _id
        label
      }
    }
  }
`;
// _id: ID!
// title: String
// price: Float
// createdBy: ID
// creator: UserInfo
// categoryId: ID
// skillIds: [ID]
// skills: [SkillType]
// category: Category
// description: String
// applicationsCount: Int
// createdAt: String
// updatedAt: String
// userApplication: UserApplication

export const GET_EXPLORE_JOBS = gql`
  query getExploreJobs(
    $skillIds: [String]
    $categoryIds: [String]
    $limit: Int
    $offset: Int
    $search: String
    $minBudget: Int
  ) {
    getExploreJobs(
      skillIds: $skillIds
      categoryIds: $categoryIds
      limit: $limit
      offset: $offset
      search: $search
      minBudget: $minBudget
    ) {
      _id
      title
      price
      createdBy
      creator {
        _id
        firstName
        lastName
        profilePicture
        city
        country
      }
      categoryId
      category {
        _id
        label
      }
      skillIds
      skills {
        _id
        label
      }
      description
      applicationsCount
      createdAt
      updatedAt
      userApplication {
        _id
        hasUserApplied
      }
    }
  }
`;