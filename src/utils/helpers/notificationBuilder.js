import {NOTIFICATION_ENTITY_TYPES, NOTIFICATION_TYPES} from '../constants';

/*

    ** Notification Builder **

    This function is used to build the notification object that is used to create a notification in the database.

    notification: {
        _id,
        entityType,
        entityId,
        createdBy,
        viewedAt,
        notificationType,
        createdAt,
        updatedAt
    }


*/


// 1. user first name
// 2. user last name
// 3. user avatar
// 3. job title
// 4. created 


const buildJobApplicationNotification = (notification) => {
    return {
        avatar: notification?.creator?.avatar,
        title: `${notification?.creator?.firstName} ${notification?.creator?.lastName} applied for your job ${notification?.entity?.title}`,
        subtitle: `${notification?.description?.substring(0, 15)}...`,
        link: `/projects/${notification?.entity?.parentEntityId}/applications/${notification?.entityId}`,
    }
};

export default function notificationBuilder(notification) {

    switch (notification.entityType) {
        case NOTIFICATION_ENTITY_TYPES.JOB_APPLICATION:
            return buildJobApplicationNotification(notification);
        default:
            return null
    }

};