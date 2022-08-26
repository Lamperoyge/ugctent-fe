import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_SKILLS, GET_INTERESTS } from 'graphql/queries';
export const useAuth = () => useContext(AuthContext);

export const useGetCategories = () => {
  const { data, error, loading } = useQuery(GET_CATEGORIES);

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
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);
  return { preview };
};
