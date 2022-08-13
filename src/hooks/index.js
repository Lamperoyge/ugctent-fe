import { useContext } from 'react';
import { AuthContext } from 'contexts';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from 'graphql/queries';
export const useAuth = () => useContext(AuthContext);

export const useGetCategories = () => {
  const { data, error, loading } = useQuery(GET_CATEGORIES);

  return {
    categories: data?.getCategories,
    categoriesError: error,
    categoriesLoading: loading,
  };
};
