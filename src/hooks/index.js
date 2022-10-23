import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  GET_CATEGORIES,
  GET_SKILLS,
  GET_INTERESTS,
  GET_JOB_APPLICATIONS,
  GET_JOB_APPLICATION_BY_ID,
  GET_PAYMENT_INTENT,
} from 'graphql/queries';
import {
  CREATE_JOB_APPLICATION,
  APPROVE_JOB_APPLICATION,
  REJECT_JOB_APPLICATION,
  CREATE_JOB_SUBMISSION
} from 'graphql/mutations';
import apolloClient from 'services/apollo-client';

export const useAuth = () => useContext(AuthContext);

export const useGetCategories = () => {
  const { data, error, loading } = useQuery(GET_CATEGORIES, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  return {
    categories: data?.getCategories,
    categoriesError: error,
    categoriesLoading: loading,
  };
};

export const useGetSkills = () => {
  const { data, error, loading } = useQuery(GET_SKILLS);
  return {
    skills: data?.getSkills,
    skillsError: error,
    skillsLoading: loading,
  };
};

export const useGetInterests = () => {
  const { data, error, loading } = useQuery(GET_INTERESTS);
  return {
    interests: data?.getInterests,
    interestsError: error,
    interestsLoading: loading,
  };
};

export const useImagePreview = (file) => {
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  return { preview };
};

export const useJobApplications = () => {
  const [
    getJobApplicationById,
    {
      data: jobApplication,
      loading: jobApplicationLoading,
      error: jobApplicationError,
    },
  ] = useLazyQuery(GET_JOB_APPLICATION_BY_ID, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  const [
    getJobApplications,
    {
      data: jobApplications,
      error: jobApplicationsError,
      loading: jobApplicationsLoading,
      fetchMore: fetchMoreJobApplications,
      refetch: refetchJobApplications,
    },
  ] = useLazyQuery(GET_JOB_APPLICATIONS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const [createJobApplication] = useMutation(CREATE_JOB_APPLICATION, {
    refetchQueries: ['getJobById'],
  });


  const [approveJobApplication] = useMutation(APPROVE_JOB_APPLICATION, {
refetchQueries: [
  'getJobApplicationById',
  'getJobById',
],
});
  const getPaymentIntent = async (jobApplicationId) => {

    const {data} = await apolloClient.query({
      query: GET_PAYMENT_INTENT,
      cachePolicy: 'no-cache',
      variables: {
        jobApplicationId,
      }
    })
    return data?.getPaymentIntent
  }
  const [rejectJobApplication] = useMutation(REJECT_JOB_APPLICATION, {
    refetchQueries: [
      'getJobApplicationById',
      'getJobById',
    ],
  });

  return {
    getJobApplicationById,
    jobApplication,
    jobApplicationLoading,
    jobApplicationError,
    getJobApplications,
    jobApplications,
    jobApplicationsError,
    jobApplicationsLoading,
    createJobApplication,
    approveJobApplication,
    rejectJobApplication,
    fetchMoreJobApplications,
    refetchJobApplications,
    getPaymentIntent
  };
};

export const useJobSubmissions = () => {
  const [createJobSubmission] = useMutation(CREATE_JOB_SUBMISSION, {
    refetchQueries: ['getJobById'],
  });
  return {
    createJobSubmission,
  };
}
