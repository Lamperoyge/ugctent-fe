import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useAuth } from "hooks";
import { GET_USER_BY_ID } from "graphql/queries";

import { useFormik } from "formik";
import * as yup from "yup";

import { CreatorProfile, BusinessProfile } from "components/Profile";
import { USER_TYPES } from "utils/constants";

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

  const schema = yup.object({
    bio: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      bio: "",
      website: "",
      email: "",
      socialLinks: {
        instagram: "",
        facebook: "",
        tiktok: "",
        youtube: "",
      },
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (!(loading || error)) {
      const { bio, socialLinks, website, email } = data.getUserById?.userInfo;
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

  const Component = PROFILE_TO_USER[data.getUserById.userType];
  return (
    <form className="h-full w-full">
      <Component
        values={formik.values}
        handleChange={formik.handleChange}
        setFieldValue={formik.setFieldValue}
        data={data.getUserById}
      />
      ;
    </form>
  );
};

export default UserProfilePage;
