import { GET_SUBMISSIONS_FOR_JOB, GET_SUBMISSION_BY_ID } from 'graphql/queries';
import {APPROVE_JOB_SUBMISSION, REJECT_JOB_SUBMISSION} from 'graphql/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useSubmission = () => {
  const [getSubmissionById, { data, error, loading }] = useLazyQuery(GET_SUBMISSION_BY_ID, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  const [approveJobSubmission] = useMutation(APPROVE_JOB_SUBMISSION, {
    refetchQueries: ['getSubmissionById', 'getSubmissionsForJob'],
  });

  const [rejectJobSubmission] = useMutation(REJECT_JOB_SUBMISSION, {
    refetchQueries: ['getSubmissionsForJob', 'getSubmissionById'],
  });
  // TODO - Add Approve / Reject / Req changes

  const getSubmission = (id) => {
    getSubmissionById({
      variables: {
        submissionId: id,
      },
    });
  };

  return {
    submission: data?.getSubmissionById,
    submissionError: error,
    submissionLoading: loading,
    getSubmission,
    approveJobSubmission,
    rejectJobSubmission
  };
};
