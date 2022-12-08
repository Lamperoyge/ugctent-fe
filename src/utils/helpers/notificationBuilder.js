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
        fullName: `${notification?.creator?.firstName} ${notification?.creator?.lastName}`,
        title: `applied for your job ${notification?.entity?.title}`,
        subtitle: notification?.description ? `${notification?.description?.substring(0, 15)}...` : null,
        link: `/projects/${notification?.entity?.parentEntityId}/applications/${notification?.entityId}`,
    }
};

const buildJobCompletedNotificationToAssignee = notification => {
    return {
        avatar: notification?.creator?.avatar,
        fullName: `${notification?.creator?.firstName} ${notification?.creator?.lastName}`,
        title: `marked the job you're assigned to as completed`,
        subtitle: `${notification?.entity?.title?.substring(0,15)}...`,
        link: `/projects/${notification?.entityId}`,
    }
}

export default function notificationBuilder(notification) {

    switch (notification.notificationType) {
        case NOTIFICATION_TYPES.JOB_APPLICATION_RECEIVED:
            return buildJobApplicationNotification(notification);
        case NOTIFICATION_TYPES.JOB_STATUS_COMPLETED:
            return buildJobCompletedNotificationToAssignee(notification);
        default:
            return null
    }

};