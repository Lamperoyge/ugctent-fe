import { gql } from '@apollo/client';

export const GET_EXPLORE_CREATORS = gql`
  query getCreators(
    $skillIds: [String]
    $interestIds: [String]
    $rangeRating: [Int]
    $limit: Int
    $offset: Int
    $search: String
  ) {
    getCreators(
      skillIds: $skillIds
      interestIds: $interestIds
      rangeRating: $rangeRating
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
