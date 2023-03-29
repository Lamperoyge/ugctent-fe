import { useState } from 'react';

import {
  StarIcon,
} from '@heroicons/react/solid';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

import PanelContainer from 'components/PanelContainer';
import {
  PROFILE_TABS,
  PROFILE_SOCIAL_TYPES,
  JOB_STATUS,
} from '../../../utils/constants';
import ProfilePicture from 'components/ProfilePicture';
import { GET_CREATED_JOBS, GET_TOTAL_COMPLETED_JOBS, GET_TOTAL_CREATED_JOBS } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_USER_FEEDBACK } from 'graphql/queries/rating';
import ViewAttachments from 'components/ViewAttachments';

const CreatorProfilePage = ({ data }) => {
  const {
    data: businessJobs,
    error: businessJobsError,
    loading: businessLoading,
  } = useQuery(GET_CREATED_JOBS, {
    variables: {
      input: {
        userId: data?.userInfo?.userId,
        limit: 5,
        status: JOB_STATUS.CREATED,
      },
    },
    skip: !data?.userInfo?.userId,
  });

  const {data: totalCompletedJobs} = useQuery(GET_TOTAL_COMPLETED_JOBS, {
    variables: {
      userId: data?.userInfo?.userId,
    },
    skip: !data?.userInfo?.userId,
  })

  const { data: userFeedback } = useQuery(GET_USER_FEEDBACK, {
    fetchPolicy: 'network-only',
    variables: {
      userId: data?.userInfo?.userId,
      limit: 5,
      offset: 0,
    },
    skip: !data?.userInfo?.userId,
  });

  console.log(data, 'DATA')

  const {
    profilePicture = '',
    bio = '',
    firstName = '',
    lastName = '',
    city = '',
    country = '',
    website = '',
    socialLinks = [],
  } = data?.userInfo || {};

  const [visibleTab, setVisibleTab] = useState(PROFILE_TABS.ABOUT);

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case PROFILE_SOCIAL_TYPES.FACEBOOK:
        return <FaFacebook className='text-slate-600 w-7 h-7'></FaFacebook>;
      case PROFILE_SOCIAL_TYPES.INSTAGRAM:
        return <FaInstagram className='text-slate-600 w-7 h-7'></FaInstagram>;
      case PROFILE_SOCIAL_TYPES.TIKTOK:
        return <FaTiktok className='text-slate-600 w-7 h-7'></FaTiktok>;
      case PROFILE_SOCIAL_TYPES.YOUTUBE:
        return <FaYoutube className='text-slate-600 w-7 h-7'></FaYoutube>;
      default:
        return;
    }
  };

  return (
    <div className='flex flex-wrap gap-8'>
      <div className='flex flex-col flex-grow basis-full sm:basis-5/12 max-w-full sm:max-w-1/2 items-start'>
        <PanelContainer extraClassName='flex flex-col flex-grow w-full  justify-around items-start'>
          <div className='flex justify-between gap-4'>
            <ProfilePicture src={profilePicture} />
            <div>
              <h1 className='font-sans font-bold text-xl'>
                {firstName} {lastName}
              </h1>
              <h2 className='text-gray-400'>Business</h2>
            </div>
          </div>
          <p className='italic text-gray-500'>{bio}</p>
        </PanelContainer>
      </div>
      <PanelContainer extraClassName='flex-grow max-w-full basis-full sm:basis-5/12 sm:max-w-1/2 flex flex-col justify-around items-start gap-8'>
        <div className='flex flex-wrap items-center gap-10'>
          <div className='flex flex-col'>
            <span className='font-bold'>{totalCompletedJobs?.getTotalCompletedJobs}</span>
            <span className='text-gray-600 text-sm'>Total jobs</span>
          </div>
          <div className='flex flex-col'>
            <div className='font-bold flex gap-2 items-center'>
              {data?.userInfo?.rating} <StarIcon className='h-5' />
            </div>
            <span className='text-gray-600 text-sm'>Overall rating</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>
              {city ? city + ', ': ''} {country}
            </span>
            <span className='text-gray-600 text-sm'>City, Country</span>
          </div>
        </div>
        <div className='flex items-center w-full'>
          <div className='flex w-full'>
            <span className='text-gray-800 text-md font-normal basis-28 block'>
              Social links
            </span>
            <div className='flex flex-wrap gap-4 items-start justify-start flex-grow'>
              {Object.keys(socialLinks).map(
                (platform, idx) =>
                  socialLinks[platform] && (
                    <a target='_blank' href={socialLinks[platform]}>
                      {getPlatformIcon(platform)}
                    </a>
                  )
              )}
            </div>
          </div>
        </div>
        <div className='flex items-center w-full'>
         {website ?  <div className='flex w-full'>
            <span className='text-gray-800 text-md font-normal basis-28 block'>
              Website
            </span>
            <a
              href={website}
              target='__blank'
              className='text-secondary hover:text-primary'
            >
              {website}
            </a>
          </div> : null}
        </div>
      </PanelContainer>
      <PanelContainer extraClassName='flex-grow max-w-full basis-full sm:basis-5/12 sm:max-w-1/2 flex flex-col justify-around items-start gap-8 w-1/2'>
        <span className="font-semibold text-md">Portfolio</span>
        <div className='flex gap-4 w-full flex-col'>
          {data?.userInfo?.works?.map((work, idx) => (
              <div
              key={idx}
              className='w-full cursor-pointer justify-start items-start border-gray-300 border p-2 rounded text-gray-900 hover:bg-gray-100 hover:text-primary'
            >
              <span className='font-semibold text-sm'>{work?.clientName}</span>
              <p className="text-gray-600 text-xs line-clamp-2">
                {work?.description}
              </p>
              <div className="flex py-4 gap-4 flex-wrap">
                {work?.attachments?.map((src, idx) => (
                  <img src={src} className="w-auto max-h-8 rounded overflow-hidden"/>
                ))}
                </div>
            </div>
        ))}
        </div>
      </PanelContainer>
      <PanelContainer extraClassName='flex-grow max-w-full basis-full sm:basis-5/12 sm:max-w-1/2 flex flex-col justify-around items-start gap-8'>
      <span className="font-semibold text-md">Testimonials</span>

        <div className='flex gap-4 w-full flex-col'>
          {userFeedback?.getFeedbackForUser?.map((feedback, idx) =>
            feedback?.note ? (
              <div
                key={feedback._id}
                className='w-full justify-start items-start flex-col border-gray-300 border p-2 rounded text-gray-600'
              >
                <span className='font-semibold text-sm'>{feedback?.note}</span>
                <div className="flex items-center gap-2">
                <StarIcon className="h-3"/>
                  <span className="text-gray-400 text-sm">
                  {feedback?.rate} / 5
                  </span>
                  </div>
              </div>
            ) : null
          )}
        </div>
      </PanelContainer>
    </div>
  );
};

export default CreatorProfilePage;
