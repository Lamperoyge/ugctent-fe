import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_COMMENTS } from 'graphql/queries';
import { useAuth } from 'hooks';
import {
  CREATE_COMMENT,
  CREATE_PRICE_SUGGESTION,
  ACCEPT_PRICE_SUGGESTION,
  REJECT_PRICE_SUGGESTION,
} from 'graphql/mutations';
import { useEffect, useState } from 'react';
import ProfilePicture from 'components/ProfilePicture';
import Link from 'next/link';
import {
  COMMENT_ENTITY_TYPES,
  JOB_APLPICATION_PRICE_SUGGEST_STATUS,
  LIMIT,
} from 'utils/constants';
import { Input } from 'components/CreateProject/helpers';
import InfiniteScroll from 'components/InfiniteScroll';
import ContentComponent from './Content';

export default function Comments({ entityId, entityType, disabled = false }) {
  const [isSuggestionModalOpen, setIsSuggestionsModalOpen] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { user } = useAuth();
  const [suggestionModalData, setSuggestionModalData] = useState('200');
  const [createPriceSuggestions] = useMutation(CREATE_PRICE_SUGGESTION, {
    refetchQueries: [
      { query: GET_COMMENTS, variables: { entityId, entityType } },
    ],
  });
  const [acceptPriceSuggestion] = useMutation(ACCEPT_PRICE_SUGGESTION, {
    refetchQueries: [
      { query: GET_COMMENTS, variables: { entityId, entityType } },
      'getJobApplicationById',
    ],
  });

  const [rejectPriceSuggestion] = useMutation(REJECT_PRICE_SUGGESTION, {
    refetchQueries: [
      { query: GET_COMMENTS, variables: { entityId, entityType } },
    ],
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      { query: GET_COMMENTS, variables: { entityId, entityType } },
    ],
  });

  const handlePriceSuggestionCreate = async () => {
    await createPriceSuggestions({
      variables: {
        price: parseFloat(suggestionModalData),
        jobApplicationId: entityId,
      },
    });
    setSuggestionModalData('200');
    setIsSuggestionsModalOpen(false);
  };

  const [getComments, { data, loading, error, previousData, fetchMore }] =
    useLazyQuery(GET_COMMENTS, {
      variables: {
        entityId,
        entityType,
        limit: LIMIT,
        offset: 0,
      },
    });

    console.log(data, 'data')
  useEffect(() => {
    getComments().then(({ data }) => {
      if (!previousData && data?.getCommentsByEntityId?.length === LIMIT)
        setHasMore(true);
    });
  }, []);

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        offset: data?.getCommentsByEntityId?.length,
      },
    }).then(({ data }) => {
      setHasMore(data?.getCommentsByEntityId?.length >= LIMIT);
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const content = e.target.elements.comment.value;
    createComment({
      variables: {
        entityId,
        entityType,
        content,
      },
    });
    e.target.elements.comment.value = '';
  };

  const toggleSuggestionModal = () =>
    setIsSuggestionsModalOpen((prevState) => !prevState);

  const handleApprove = (id) => {
    acceptPriceSuggestion({
      variables: {
        priceSuggestionId: id,
      },
    });
  };

  const handleDecline = (id) =>
    rejectPriceSuggestion({
      variables: {
        priceSuggestionId: id,
      },
    });

  return (
    <section aria-labelledby='notes-title'>
      <div className='bg-white shadow sm:rounded-lg sm:overflow-hidden'>
        <div className='divide-y divide-gray-200'>
          <div className='px-4 py-5 sm:px-6'>
            <h2 id='notes-title' className='text-lg font-medium text-gray-900'>
              Discussion
            </h2>
          </div>
          <div className='px-4 py-6 sm:px-6 max-h-96 overflow-auto flex flex-col-reverse'>
            {!loading && !error && !data?.getCommentsByEntityId?.length && (
              <div>No messages yet</div>
            )}
            <div>
              <div className='space-y-8'>
                <InfiniteScroll
                  onLoadMore={handleFetchMore}
                  hasMore={hasMore}
                  reverseScroll
                >
                  <ul className='gap-8 flex-col-reverse flex'>
                    {data?.getCommentsByEntityId?.map((comment) => (
                      <li key={comment._id}>
                        <div className='flex space-x-3'>
                          <div className='flex-shrink-0'>
                            <ProfilePicture
                              src={comment.creator.profilePicture}
                              size={'h-10 w-10'}
                            />
                          </div>
                          <div>
                            <div className='text-sm'>
                              <Link
                                href={`/profile/${comment.creator._id}`}
                                className='font-medium text-gray-900'
                              >
                                {comment.creator.firstName}{' '}
                                {comment.creator.lastName}
                              </Link>
                            </div>
                            <div className='mt-1 text-sm text-gray-700'>
                              <ContentComponent content={comment.content} />
                            </div>
                            <div className='mt-2 text-xs space-x-2'>
                              <span className='text-gray-400 font-sm'>
                                {new Date(
                                  parseInt(comment.createdAt, 10)
                                ).toLocaleDateString()}{' '}
                                at{' '}
                                {new Date(
                                  parseInt(comment.createdAt, 10)
                                ).toLocaleTimeString()}
                              </span>{' '}
                            </div>
                            {comment?.priceSuggestion?.status ===
                            JOB_APLPICATION_PRICE_SUGGEST_STATUS.CREATED ? (
                              <div className='flex gap-4 py-4 w-1/3'>
                                {comment?.priceSuggestion?.createdBy !==
                                user?._id ? (
                                  <button
                                    onClick={() =>
                                      handleApprove(
                                        comment?.priceSuggestion?._id
                                      )
                                    }
                                    className={`cursor-pointer inline-flex border items-center px-3 py-0.5 rounded-full text-sm font-bold bg-green-100 text-green-800 hover:bg-green-200`}
                                  >
                                    Accept
                                  </button>
                                ) : null}
                                <button
                                  type='button'
                                  onClick={() =>
                                    handleDecline(comment?.priceSuggestion?._id)
                                  }
                                  className={`cursor-pointer inline-flex border items-center px-3 py-0.5 rounded-full text-sm font-bold bg-red-100 text-red-800 hover:bg-red-200`}
                                >
                                  {comment?.priceSuggestion?.createdBy ===
                                  user?._id
                                    ? 'Revoke'
                                    : 'Decline'}
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </InfiniteScroll>
                {entityType === COMMENT_ENTITY_TYPES.JOB_APPLICATION &&
                !disabled &&
                !isSuggestionModalOpen ? (
                  <button
                    onClick={toggleSuggestionModal}
                    type='button'
                    className='inline-flex items-center w-full justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                  >
                    Suggest new price
                  </button>
                ) : null}
                {isSuggestionModalOpen && (
                  <div className='flex items-center flex-col gap-8 px-8 py-4 w-full'>
                    <div className='w-full'>
                      <Input
                        value={suggestionModalData}
                        label='Suggest new price'
                        type='number'
                        placeholder='200'
                        name='price-suggest'
                        withCurrency
                        onChange={(e) => setSuggestionModalData(e.target.value)}
                      />
                    </div>
                    <div className='flex gap-4 w-full'>
                      <button
                        type='button'
                        onClick={handlePriceSuggestionCreate}
                        className='inline-flex items-center w-full justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                      >
                        Submit
                      </button>
                      <button
                        onClick={toggleSuggestionModal}
                        className='inline-flex items-center w-full justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-red-300 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 px-4 py-6 sm:px-6'>
          <div className='flex space-x-3'>
            <div className='flex-shrink-0'>
              {/* <img
                  className='h-10 w-10 rounded-full'
                  src={user.imageUrl}
                  alt=''
                /> */}
            </div>

            {disabled ? null : (
              <div className='min-w-0 flex-1'>
                <form action='#' onSubmit={handleCreate}>
                  <div>
                    <textarea
                      id='comment'
                      name='comment'
                      rows={3}
                      className='shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md'
                      placeholder='Add a note'
                      defaultValue={''}
                    />
                  </div>
                  <div className='mt-3 flex items-center justify-between'>
                    <button
                      type='submit'
                      className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
                    >
                      Comment
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
