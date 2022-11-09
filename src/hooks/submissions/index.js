import { GET_SUBMISSIONS_FOR_JOB, GET_SUBMISSION_BY_ID } from 'graphql/queries';
import { useLazyQuery } from '@apollo/client';

export const useSubmission = () => {
  const [getSubmissionById, { data, error, loading }] = useLazyQuery(GET_SUBMISSION_BY_ID, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
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
  };
};
