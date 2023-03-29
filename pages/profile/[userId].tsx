import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'hooks';
import { useFormik } from 'formik';
import { GET_USER_BY_ID } from 'graphql/queries';
import { CREATE_USER_INFO } from 'graphql/mutations';
import * as yup from 'yup';
import { PencilIcon, SaveIcon, XCircleIcon } from '@heroicons/react/solid';

import { CreatorProfile, BusinessProfile } from 'components/Profile';
import { USER_TYPES } from 'utils/constants';
import PageSpinner from 'components/PageSpinner';

const PROFILE_TO_USER = {
  [USER_TYPES.CREATOR]: CreatorProfile,
  [USER_TYPES.ORG]: BusinessProfile,
};

const schema = yup.object({
  companyName: yup.string(),
  bio: yup.string(),
  categoryIds: yup.array().of(
    yup.object({
      _id: yup.string().nullable(),
      label: yup.string(),
      __typename: yup.string(),
    })
  ),
  website: yup.string(),
  socialLinks: yup.object({
    instagram: yup.string(),
    tiktok: yup.string(),
    youtube: yup.string(),
    facebook: yup.string(),
  }),
  taxId: yup.string(),
  firstName: yup.string(),
  lastName: yup.string(),
  city: yup.string(),
  country: yup.string(),
  profilePicture: yup.mixed(),
});

const UserProfilePage = ({}) => {
  const auth: any = useAuth();
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const userId = router.query.userId;

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: userId,
    },
    skip: !userId || !auth.user,
  });

  const [
    createUserInfo,
    { data: updateUserInfoData, error: updateError, loading: loadingError },
  ] = useMutation(CREATE_USER_INFO, {
    onCompleted: () => {
      console.log('compelted');
      setIsEditMode(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      bio: '',
      website: '',
      email: '',
      socialLinks: {
        instagram: '',
        facebook: '',
        tiktok: '',
        youtube: '',
      },
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      createUserInfo({
        variables: {
          input: {
            ...data.getUserById?.userInfo,
            ...values,
          },
        },
      });
    },
  });

  useEffect(() => {
    if (!(loading || error)) {
      const { bio, socialLinks, website, email } =
        data?.getUserById?.userInfo || {};
      formik.setValues({
        bio,
        socialLinks,
        website,
        email,
      });
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  const Component = PROFILE_TO_USER[data?.getUserById?.userType];

  if(!Component) return <PageSpinner />
  return (
    <form className='h-full w-full gap-4'>
      <div className='flex justify-end w-full px-16'>
        {/* {!isEditMode && (
          <button
            onClick={() => setIsEditMode(true)}
            type='button'
            className='inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
          >
            <PencilIcon className='h-5 w-5 mr-2'></PencilIcon> Edit
          </button>
        )} */}

        {isEditMode && (
          <div className='inline-flex'>
            <button
              type='button'
              onClick={(e) => {
                formik.handleSubmit();
                e.preventDefault();
              }}
              className='inline-flex justify-center py-2 px-4 mr-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
              <SaveIcon className='h-5 w-5 mr-2' /> Save
            </button>

            <button
              onClick={() => setIsEditMode(false)}
              type='button'
              className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
              <XCircleIcon className='h-5 w-5 mr-2'></XCircleIcon> Cancel
            </button>
          </div>
        )}
      </div>
      <Component
        // isEditMode={isEditMode}
        // values={formik.values}
        // handleChange={formik.handleChange}
        data={data.getUserById}
      />
    </form>
  );
};

export default UserProfilePage;
