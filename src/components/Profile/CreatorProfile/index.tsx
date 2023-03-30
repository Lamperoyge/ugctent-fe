import { useState } from 'react';

import { StarIcon } from '@heroicons/react/solid';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { Modal } from '@mantine/core';

import PanelContainer from 'components/PanelContainer';
import {
  PROFILE_TABS,
  PROFILE_SOCIAL_TYPES,
  JOB_STATUS,
} from '../../../utils/constants';
import ProfilePicture from 'components/ProfilePicture';
import {
  GET_CREATED_JOBS,
  GET_TOTAL_COMPLETED_JOBS,
  GET_TOTAL_CREATED_JOBS,
} from 'graphql/queries';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_USER_FEEDBACK } from 'graphql/queries/rating';
import ViewAttachments from 'components/ViewAttachments';

const CreatorProfilePage = ({ data }) => {
  const [portfolioItem, setPortfolioItem] = useState(null);

  const { data: totalCompletedJobs } = useQuery(GET_TOTAL_COMPLETED_JOBS, {
    variables: {
      userId: data?.userInfo?.userId,
    },
    skip: !data?.userInfo?.userId,
  });

  const { data: userFeedback } = useQuery(GET_USER_FEEDBACK, {
    fetchPolicy: 'network-only',
    variables: {
      userId: data?.userInfo?.userId,
      limit: 5,
      offset: 0,
    },
    skip: !data?.userInfo?.userId,
  });

  console.log(data, 'DATA');

  const {
    profilePicture = '',
    bio = '',
    firstName = '',
    lastName = '',
    city = '',
    country = '',
    website = '',
    socialLinks = [],
    skills,
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

  const getPlatformLink = (platform) => {
    switch (platform) {
      case PROFILE_SOCIAL_TYPES.FACEBOOK:
        return 'https://www.facebook.com/';

      case PROFILE_SOCIAL_TYPES.INSTAGRAM:
        return 'https://www.instagram.com/';
      case PROFILE_SOCIAL_TYPES.TIKTOK:
        return 'https://www.tiktok.com/';
      case PROFILE_SOCIAL_TYPES.YOUTUBE:
        return 'https://www.youtube.com/';
    }
  };

  return (
    <>
      <Modal
        opened={!!portfolioItem}
        onClose={() => setPortfolioItem(null)}
        padding='xl'
        overlayOpacity={0.55}
        lockScroll={true}
        overlayBlur={3}
        overflow='inside'
      >
        <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
          <div className='px-4 py-5 sm:px-6'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Portfolio
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>Work details</p>
          </div>
          <div className='border-t border-gray-200'>
            <dl>
              <div
                className={`bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className='text-sm font-medium text-gray-500'>Title</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {portfolioItem?.title}
                </dd>
              </div>

              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Client name
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {portfolioItem?.clientName}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Description
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {/* {submission?.title} */}
                  {portfolioItem?.description}
                </dd>
              </div>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Attachments
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {portfolioItem?.attachments?.length ? (
                    <ViewAttachments attachments={portfolioItem?.attachments} />
                  ) : (
                    'No attachments'
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Modal>
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
            {skills?.slice(0, 1).map((skill) => (
              <li
                className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800'
                key={skill._id}
              >
                <span className='block truncate'>{skill.label}</span>
              </li>
            ))}
          </PanelContainer>
        </div>
        <PanelContainer extraClassName='flex-grow max-w-full basis-full sm:basis-5/12 sm:max-w-1/2 flex flex-col justify-around items-start gap-8'>
          <div className='flex flex-wrap items-center gap-10'>
            <div className='flex flex-col'>
              <span className='font-bold'>
                {totalCompletedJobs?.getTotalCompletedJobs}
              </span>
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
                {city ? city + ', ' : ''} {country}
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
                      <a
                        target='_blank'
                        href={getPlatformLink(platform) + socialLinks[platform]}
                      >
                        {getPlatformIcon(platform)}
                      </a>
                    )
                )}
              </div>
            </div>
          </div>
          <div className='flex items-center w-full'>
            {website ? (
              <div className='flex w-full'>
                <span className='text-gray-800 text-md font-normal basis-28 block'>
                  Website
                </span>
                <a
                  href={
                    website.includes('https://')
                      ? website
                      : 'https://' + website
                  }
                  target='__blank'
                  className='text-secondary hover:text-primary'
                >
                  {website}
                </a>
              </div>
            ) : null}
          </div>
        </PanelContainer>
        <PanelContainer extraClassName='flex-grow max-w-full basis-full sm:basis-5/12 sm:max-w-1/2 flex flex-col justify-around items-start gap-8 w-1/2'>
          <span className='font-semibold text-md'>Portfolio</span>
          <div className='flex gap-4 w-full flex-col'>
            {data?.userInfo?.works?.map((work, idx) => (
              <div
                key={idx}
                onClick={() => setPortfolioItem(work)}
                className='w-full cursor-pointer justify-start items-start border-gray-300 border p-2 rounded text-gray-900 hover:bg-gray-100 hover:text-primary'
              >
                <span className='font-semibold text-sm'>
                  {work?.clientName}
                </span>
                <p className='text-gray-600 text-xs line-clamp-2'>
                  {work?.description}
                </p>
                <div className='flex py-4 gap-4 flex-wrap'>
                  {work?.attachments?.map((src, idx) => (
                    <img
                      src={src}
                      className='w-auto max-h-8 rounded overflow-hidden'
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PanelContainer>
        <PanelContainer extraClassName='flex-grow max-w-full basis-full sm:basis-5/12 sm:max-w-1/2 flex flex-col justify-around items-start gap-8'>
          <span className='font-semibold text-md'>Testimonials</span>

          <div className='flex gap-4 w-full flex-col'>
            {!userFeedback?.getFeedbackForUser?.length ? 'No feedback yet' : ''}
            {userFeedback?.getFeedbackForUser?.map((feedback, idx) =>
              feedback?.note ? (
                <div
                  key={feedback._id}
                  className='w-full justify-start items-start flex-col border-gray-300 border p-2 rounded text-gray-600'
                >
                  <span className='font-semibold text-sm'>
                    {feedback?.note}
                  </span>
                  <div className='flex items-center gap-2'>
                    <StarIcon className='h-3' />
                    <span className='text-gray-400 text-sm'>
                      {feedback?.rate} / 5
                    </span>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </PanelContainer>
      </div>
    </>
  );
};

export default CreatorProfilePage;
