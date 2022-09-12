import { gql } from '@apollo/client';

export const JobFragment = gql`
  fragment JobFragment on Job {
    _id
    title
    assigneeId
    price
    createdBy
    category {
      _id
      label
    }
    skills {
      _id
      label
    }
    dueDate
    links
    status
    description
    applicationsCount
  }
`;
