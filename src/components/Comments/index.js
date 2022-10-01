import { useMutation, useQuery } from '@apollo/client'
import {GET_COMMENTS} from 'graphql/queries'
import {CREATE_COMMENT} from 'graphql/mutations'
import ProfilePicture from 'components/ProfilePicture'
export default function Comments({entityId, entityType}) {

    const [createComment] = useMutation(CREATE_COMMENT, {
        refetchQueries: [{query: GET_COMMENTS, variables: {entityId, entityType}}]
    })

    const {data, loading, error} = useQuery(GET_COMMENTS, {
        variables: {
            entityId,
            entityType
        }
    })

    const handleCreate = (e) => {
        e.preventDefault()
        const content = e.target.elements.comment.value
        createComment({
            variables: {
                entityId,
                entityType,
                content
            }
        })
        e.target.elements.comment.value = ''
    };

    return (
        <section aria-labelledby='notes-title'>
        <div className='bg-white shadow sm:rounded-lg sm:overflow-hidden'>
          <div className='divide-y divide-gray-200'>
            <div className='px-4 py-5 sm:px-6'>
              <h2
                id='notes-title'
                className='text-lg font-medium text-gray-900'
              >
                Discussion
              </h2>
            </div>
            <div className='px-4 py-6 sm:px-6 max-h-96 overflow-auto flex flex-col-reverse'>
              <ul role='list' >    
                {!loading && !error && !data?.getCommentsByEntityId?.length && <div>
                    No messages yet
                </div>}
                <div className='space-y-8'>
                {data?.getCommentsByEntityId?.map((comment) => (
                  <li key={comment._id}>
                    <div className='flex space-x-3'>
                      <div className='flex-shrink-0'>
                      <ProfilePicture src={comment.creator.profilePicture} size={'h-10 w-10'}/>
                      </div>
                      <div>
                        <div className='text-sm'>
                          <a
                            href='#'
                            className='font-medium text-gray-900'
                          >
                            {comment.creator.firstName}  {comment.creator.lastName}
                          </a>
                        </div>
                        <div className='mt-1 text-sm text-gray-700'>
                          <p>{comment.content}</p>
                        </div>
                        <div className='mt-2 text-xs space-x-2'>
                          <span className='text-gray-400 font-sm'>
                            {new Date(parseInt(comment.createdAt, 10)).toLocaleDateString()}
                          </span>{' '}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                </div>
              </ul>
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
              <div className='min-w-0 flex-1'>
                <form action='#' onSubmit={handleCreate}> 
                  <div>
                    <label htmlFor='comment' className='sr-only'>
                      About
                    </label>
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
            </div>
          </div>
        </div>
      </section>
    )
}