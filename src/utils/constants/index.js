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

export const EXCLUDED_PATHS = ['/login', '/signup'];

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
};
