export const USER_TYPES = {
  CREATOR: 'creator',
  ORG: 'org',
};

export const CONTENT_OFFER_TYPES = {
  MODEL: 'model',
  CONTENT: 'content',
};

export const JOB_STATUS = {
  CREATED: 'created',
  IN_PROGRESS: 'inProgress',
  IN_REVIEW: 'inReview',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
};

export const JOB_SUBMISSION_STATUS = {
  IN_REVIEW: 'inReview',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  REQUESTED_CHANGES: 'requestedChanges',
};

export const JOB_APPLICATION_STATUS = {
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  IN_REVIEW: 'inReview',
};

export const EXCLUDED_PATHS = ['/login', '/signup', '/verify-token/[token]', '/forgot-password', '/reset-password/[token]'];

export const JOB_STATUS_LABELS_AND_COLORS = {
  [JOB_STATUS.CREATED]: {
    label: 'Created',
    textColor: 'text-cyan-800',
    chipColor: 'bg-cyan-100',
  },
  [JOB_STATUS.IN_PROGRESS]: {
    label: 'In Progress',
    textColor: 'text-yellow-800',
    chipColor: 'bg-yellow-100',
  },
  [JOB_STATUS.IN_REVIEW]: {
    label: 'In Review',
    textColor: 'text-blue-800',
    chipColor: 'bg-blue-100',
  },
  [JOB_STATUS.COMPLETED]: {
    label: 'Completed',
    textColor: 'text-green-800',
    chipColor: 'bg-green-100',
  },
  [JOB_SUBMISSION_STATUS.ACCEPTED]: {
    label: 'Accepted',
    textColor: 'text-green-800',
    chipColor: 'bg-green-100',
  },
  [JOB_SUBMISSION_STATUS.REJECTED]: {
    label: 'Rejected',
    textColor: 'text-red-800',
    chipColor: 'bg-red-100',
  },
  [JOB_STATUS.ARCHIVED]: {
    label: 'Archived',
    textColor: 'text-slate-800',
    chipColor: 'bg-slate-100',
  },
};

export const LIMIT = 10;

export const COMMENT_ENTITY_TYPES = {
  JOB: 'job',
  JOB_APPLICATION: 'jobApplication',
  SUBMISSION: 'submission'
};


export const JOB_APPLICATION_STATUS_COLORS = {
  [JOB_APPLICATION_STATUS.IN_REVIEW]: 'yellow',
  [JOB_APPLICATION_STATUS.ACCEPTED]: 'green',
  [JOB_APPLICATION_STATUS.REJECTED]: 'red',
};

export const JOB_APPLICATION_STATUS_LABELS = {
  [JOB_APPLICATION_STATUS.IN_REVIEW]: 'In Review',
  [JOB_APPLICATION_STATUS.ACCEPTED]: 'Accepted',
  [JOB_APPLICATION_STATUS.REJECTED]: 'Rejected',
}


export const SUBMISSION_STATUS_COLORS = {
  [JOB_SUBMISSION_STATUS.IN_REVIEW]: 'yellow',
  [JOB_SUBMISSION_STATUS.ACCEPTED]: 'green',
  [JOB_SUBMISSION_STATUS.REJECTED]: 'red',
  [JOB_SUBMISSION_STATUS.REQUESTED_CHANGES]: 'orange',
};

export const SUBMISSION_STATUS_LABELS = {
  [JOB_SUBMISSION_STATUS.IN_REVIEW]: 'In Review',
  [JOB_SUBMISSION_STATUS.ACCEPTED]: 'Accepted',
  [JOB_SUBMISSION_STATUS.REJECTED]: 'Rejected',
  [JOB_SUBMISSION_STATUS.REQUESTED_CHANGES]: 'Requested Changes',
}

export const JOB_APPLICATION_PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PAID: 'paid',
  PROCESSING: 'processing',
  FAILED: 'failed'
};

export const PAYMENT_STATUS_LABELS = {
  [JOB_APPLICATION_PAYMENT_STATUS.UNPAID]: 'Unpaid',
  [JOB_APPLICATION_PAYMENT_STATUS.PAID]: 'Paid',
  [JOB_APPLICATION_PAYMENT_STATUS.PROCESSING]: 'Payment is processing',
  [JOB_APPLICATION_PAYMENT_STATUS.FAILED]: 'Payment failed',
};

export const JOB_APLPICATION_PRICE_SUGGEST_STATUS = {
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CREATED: 'created',
}

export const NOTIFICATION_ENTITY_TYPES = {
  JOB: 'job',
  JOB_APPLICATION: 'jobApplication',
  SUBMISSION: 'submission',
  COMMENT: 'comment'
}

export const NOTIFICATION_TYPES = {
  JOB_APPLICATION_RECEIVED: 'jobApplicationReceived',
  JOB_APPLICATION_ACCEPTED: 'jobApplicationAccepted',
  JOB_APPLICATION_REJECTED: 'jobApplicationRejected',
  JOB_STATUS_CHANGED: 'jobStatusChanged',
  JOB_SUBMISSION_RECEIVED: 'jobSubmissionReceived',
  JOB_SUBMISSION_ACCEPTED: 'jobSubmissionAccepted',
  JOB_SUBMISSION_REJECTED: 'jobSubmissionRejected',
  JOB_SUBMISSION_COMMENT_RECEIVED: 'jobSubmissionCommentReceived',
  JOB_STATUS_COMPLETED: 'jobStatusCompleted'
};

export const SUBMISSION_UPLOAD_LIMIT = 25000000