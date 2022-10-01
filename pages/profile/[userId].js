import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useAuth } from 'hooks';
import { GET_USER_BY_ID } from 'graphql/queries';
import { CreatorProfile, BusinessProfile } from 'components/Profile';
import { USER_TYPES } from 'utils/constants';

const PROFILE_TO_USER = {
  [USER_TYPES.CREATOR]: CreatorProfile,
  [USER_TYPES.ORG]: BusinessProfile,
};

const UserProfilePage = ({}) => {
  const auth = useAuth();
  const router = useRouter();
  const userId = router.query.userId;

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: userId,
    },
    skip: !userId || !auth.user,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  const Component = PROFILE_TO_USER[data.getUserById.userType];
  return <Component data={data.getUserById} />;
};

export default UserProfilePage;
