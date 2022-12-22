import { gql } from '@apollo/client';

export const GET_STRIPE_DASHBOARD_LINK = gql`
  query getStripeDashboardLink {
    getStripeDashboardLink
  }
`;

export const GET_STRIPE_BALANCE = gql`
  query getStripeAccountBalance {
    getStripeAccountBalance {
      available {
        amount
        currency
      }
      pending {
        amount
        currency
      }
    }
  }
`;