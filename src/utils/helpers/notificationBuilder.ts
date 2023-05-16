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

const buildJobApplicationAcceptedNotification = (notification) => {
    return {
        avatar: notification?.creator?.avatar,
        fullName: `${notification?.creator?.firstName} ${notification?.creator?.lastName}`,
        title: `accepted your application for the job: ${notification?.entity?.title}. \n You're now assigned to this job`,
        subtitle: notification?.description ? `${notification?.description?.substring(0, 15)}...` : null,
        link: `/projects/${notification?.entity?.parentEntityId}`,
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

const ENITITY_TYPE_LABELS = {
    [NOTIFICATION_ENTITY_TYPES.JOB]: 'job',
    [NOTIFICATION_ENTITY_TYPES.JOB_APPLICATION]: 'job application',
    [NOTIFICATION_ENTITY_TYPES.SUBMISSION]: 'submission',
    [NOTIFICATION_ENTITY_TYPES.COMMENT]: 'comment'
}

const buildCommentMentionNotification = notification => {
    let link = '';
    if(notification?.entityType === NOTIFICATION_ENTITY_TYPES.JOB_APPLICATION) {
        link = `/projects/${notification?.entity?.parentEntityId}/applications/${notification?.entityId}`
    }

    if(notification?.entityType === NOTIFICATION_ENTITY_TYPES.SUBMISSION) {
        link = `/projects/${notification?.entity?.parentEntityId}?submission=${notification?.entityId}`
    }

    if(notification?.entityType === NOTIFICATION_ENTITY_TYPES.JOB) {
        link = `/projects/${notification?.entityId}`
    }

    const subtitle = notification?.entity?.description ? `${notification?.entity?.description?.substring(0, 15)}` : null;
    return {
        avatar: notification?.creator?.avatar,
        fullName: `${notification?.creator?.firstName} ${notification?.creator?.lastName}`,
        title: `left a comment on ${ENITITY_TYPE_LABELS[notification?.entityType]}`,
        subtitle: subtitle?.length > 15 ? `${subtitle}...` : subtitle,
        link,
    }
}

const buildSubmissionReceived = notification => {
    return {
        avatar: notification?.creator?.avatar,
        fullName: `${notification?.creator?.firstName} ${notification?.creator?.lastName}`,
        title: `submitted to your job`,
        subtitle: notification?.entity?.title ? `${notification?.entity?.title?.substring(0, 15)}...` : '',
        link: `/projects/${notification?.entity?.parentEntityId}?submission=${notification?.entityId}`
    }
}

const buildSubmissionStatusChange = (notification, verb) => {
    return {
        avatar: notification?.creator?.avatar,
        fullName: `${notification?.creator?.firstName} ${notification?.creator?.lastName}`,
        title: `${verb} your submission to the job`,
        subtitle: notification?.entity?.title ? `${notification?.entity?.title?.substring(0, 15)}...` : '',
        link: `/projects/${notification?.entity?.parentEntityId}?submission=${notification?.entityId}`
    }
};

const buildJobInvoiceRequested = (notification) => {
    return {
        avatar: notification?.creator?.avatar,
        fullName: `${notification?.creator?.firstName} ${notification?.creator?.lastName}`,
        title: `requested an invoice for the job`,
        subtitle: notification?.entity?.title ? `${notification?.entity?.title?.substring(0, 15)}...` : '',
        link: `/projects/${notification?.entityId}?uploadInvoice=true`,
    }
}

export default function notificationBuilder(notification) {
    switch (notification.notificationType) {
        case NOTIFICATION_TYPES.JOB_APPLICATION_RECEIVED:
            return buildJobApplicationNotification(notification);
        case NOTIFICATION_TYPES.JOB_APPLICATION_ACCEPTED:
            return buildJobApplicationAcceptedNotification(notification);
        case NOTIFICATION_TYPES.JOB_STATUS_COMPLETED:
            return buildJobCompletedNotificationToAssignee(notification);
        case NOTIFICATION_TYPES.COMMENT_MENTION:
            return buildCommentMentionNotification(notification);
        case NOTIFICATION_TYPES.JOB_SUBMISSION_RECEIVED:
            return buildSubmissionReceived(notification);
        case NOTIFICATION_TYPES.JOB_SUBMISSION_ACCEPTED:
            return buildSubmissionStatusChange(notification, 'accepted');
        case NOTIFICATION_TYPES.JOB_SUBMISSION_REJECTED:
            return buildSubmissionStatusChange(notification, 'rejected');
        case NOTIFICATION_TYPES.JOB_INVOICE_STATUS_REQUESTED:
            return buildJobInvoiceRequested(notification);
        default:
            return null
    }

};