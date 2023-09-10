import { useMemo, useState } from 'react';

import { StarIcon } from '@heroicons/react/solid';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { Divider, Modal } from '@mantine/core';

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
import PanelComponent, { Header } from 'components/Panel';

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

  console.log(userFeedback, 'DATA');

  const {
    profilePicture = '',
    bio = '',
    firstName = '',
    lastName = '',
    city = '',
    country = '',
    website = '',
    socialLinks = {},
    skills,
    taxId,
    introductionAsset,
  } = data?.userInfo || {};

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

  const socials = useMemo(() => {
    const { facebook, instagram, tiktok, youtube } = socialLinks;
    return {
      facebook,
      instagram,
      tiktok,
      youtube,
    };
  }, [socialLinks]);
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
      <div className='flex flex-wrap gap-4'>
        <div className='w-full sm:w-2/3'>
          <PanelComponent
            renderBody={() => (
              <div className='px-4 py-5 sm:px-6 w-full flex flex-col gap-4'>
                <div className='flex gap-4'>
                  <ProfilePicture src={profilePicture} />
                  <div className='flex flex-col gap-1'>
                    <h1 className='font-sans font-bold text-xl'>
                      {firstName} {lastName}
                    </h1>
                    <h3 className='font-semibold text-sm text-gray-600'>
                      {city ? city + ', ' : ''} {country}
                    </h3>
                    <h3 className='font-semibold text-sm text-gray-600'>
                      TAX ID: {taxId || 'N/A'}
                    </h3>
                  </div>
                </div>
                <Divider />
                <div className='flex items-center justify-between'>
                  {/* bio */}
                  <h3 className='font-semibold text-sm text-gray-600'>About</h3>
                  <p className='italic text-gray-500'>{bio}</p>
                </div>
                <div className='flex items-center justify-between'>
                  {/* skills */}
                  <h3 className='font-semibold text-sm text-gray-600'>
                    Skills
                  </h3>

                  <ul className='flex leading-8 my-4 flex-wrap gap-2 justify-start items-center'>
                    {skills?.map((skill) => (
                      <li
                        className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800'
                        key={skill._id}
                      >
                        <span className='block truncate'>{skill.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='flex items-center justify-between'>
                  {/* skills */}
                  <h3 className='font-semibold text-sm text-gray-600'>
                    Social networks
                  </h3>
                  <div className='flex flex-col gap-4'>
                    {Object.keys(socials)?.map((skill) => (
                      <>
                        {socials[skill] ? (
                          <a
                            href={`${getPlatformLink(skill)}${
                              socialLinks[skill]
                            }`}
                            target='_blank'
                            className='flex items-center gap-2'
                          >
                            {getPlatformIcon(skill)}
                            <span className='block truncate'>
                              {socialLinks[skill]}
                            </span>
                          </a>
                        ) : null}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
        <div className='w-full sm:w-1/4'>
          <PanelComponent
            renderBody={() => (
              <div className='flex flex-col items-center'>
                <div className='rounded-full w-60 h-60 object-fit object-cover border border-solid border-gray-200 overflow-hidden'>
                  <video controls autoPlay muted>
                    <source src={introductionAsset} />
                  </video>
                </div>
                <span className='mt-4 text-sm text-gray-400'>
                  Double click to enlarge
                </span>
              </div>
            )}
          />
        </div>
        <div className='w-full sm:w-2/3'>
          <PanelComponent
            renderBody={() => (
              <div className='flex flex-col gap-4'>
                <span className='text-md text-black font-bold'>Portfolio</span>
                {data?.userInfo?.works?.length ? (
                  <div className='flex flex-col gap-4'>
                    {data?.userInfo?.works?.map((item, idx) => {
                      return (
                        <div
                          className='bg-ugcblue text-white font-bold flex flex-col px-12 gap-4 py-6 rounded-xl'
                          style={{
                            cursor: 'pointer',
                            backgroundImage: `url(${
                              item?.attachments?.[0]?.url || '/white-orange.svg'
                            })`,
                            backgroundPosition: 'center',
                            backgroundBlendMode: 'darken',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                          }}
                          onClick={() => setPortfolioItem(item)}
                        >
                          <span>{item?.title}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <span className='text-sm text-gray-400'>
                    No portfolio items
                  </span>
                )}
              </div>
            )}
          />
        </div>
        <div className='w-full sm:w-1/4'>
          <PanelComponent
            renderBody={() => (
              <div className='flex flex-col gap-4 w-full'>
                <span className='text-md text-black font-bold'>Feedback</span>

                {userFeedback?.getFeedbackForUser?.length ? (
                  <div className='flex flex-col gap-4 w-full'>
                    {userFeedback?.getFeedbackForUser?.map((item, idx) => {
                      return (
                        <div className='w-full'>
                          <div
                            className='flex flex-col gap-4 w-full'
                            key={item?._id || idx}
                          >
                            <div className='flex items-center gap-2'>
                              <StarIcon className='w-5 h-5 text-yellow-400' />
                              <span className='text-sm text-gray-400'>
                                {item?.rate}
                              </span>
                            </div>
                            <span className='text-sm text-gray-400 break-words'>
                              {item.note}
                            </span>
                            <span className='text-sm text-gray-400'></span>
                          </div>
                          {idx !==
                          userFeedback?.getFeedbackForUser?.length - 1 ? (
                            <Divider />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <span className='text-sm text-gray-400'>No feedback yet</span>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default CreatorProfilePage;
