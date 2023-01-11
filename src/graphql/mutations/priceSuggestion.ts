import { gql } from '@apollo/client';

export const CREATE_PRICE_SUGGESTION = gql`
    mutation createPriceSuggestion($price: Float!, $jobApplicationId: ID!) {
        createPriceSuggestion(price: $price, jobApplicationId: $jobApplicationId) {
            success
        }
    }
`;

export const ACCEPT_PRICE_SUGGESTION = gql`
    mutation acceptPriceSuggestion($priceSuggestionId: ID!) {
        acceptPriceSuggestion(priceSuggestionId: $priceSuggestionId) {
            success
        }
    }
`;

export const REJECT_PRICE_SUGGESTION = gql`
    mutation rejectPriceSuggestion($priceSuggestionId: ID!) {
        rejectPriceSuggestion(priceSuggestionId: $priceSuggestionId) {
            success
        }
    }
`;