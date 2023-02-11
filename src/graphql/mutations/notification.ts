import { gql } from "@apollo/client";
import { NotificationFragment } from "graphql/fragments/notification";

export const MARK_NOTIFICATION_AS_VIEWED = gql`
    mutation markNotificationAsViewed($notificationId: ID!) {
        markNotificationAsViewed(notificationId: $notificationId) {
            ...NotificationFragment
        }
    }
    ${NotificationFragment}
`;