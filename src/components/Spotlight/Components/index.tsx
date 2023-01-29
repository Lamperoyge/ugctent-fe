import ProfilePicture from 'components/ProfilePicture';
import Link from 'next/link';

export const Job = ({ item, onClick }) => (
  <Link
    className='px-4 py-2 block'
    href={`/projects/${item?._id}`}
    onClick={onClick}
  >
    <div className='flex justify-left items-center gap-4'>
      <div className='flex flex-col gap-2' style={{ maxWidth: '70%' }}>
        <span className='text-md font-semibold text-gray-700'>
          {item.title}
        </span>
        <p className='truncate text-gray-400 font-small text-sm'>
          {item?.description}
        </p>
        <p className='truncate text-green-400 font-small text-xs'>
          RON {item?.price}
        </p>
      </div>
    </div>
  </Link>
);

export const Creator = ({ item, onClick }) => (
  <Link
    className='px-4 py-2 block'
    href={`/profile/${item?._id}`}
    onClick={onClick}
  >
    <div className='flex justify-left items-center gap-4'>
      <ProfilePicture size='h-10 w-10' src={item?.profilePicture} />
      <div className='flex flex-col gap-2' style={{ maxWidth: '70%' }}>
        <span className='text-sm font-semibold text-gray-700'>
          {item?.firstName} {item?.lastName}
        </span>
        <p className='truncate text-gray-400 font-small text-sm'>{item?.bio}</p>
      </div>
    </div>
  </Link>
);

export const Company = ({ item, onClick }) => (
  <Link
    onClick={onClick}
    className='px-4 py-2 text-decoration-none block'
    href={`/profile/${item?._id}`}
  >
    <div className='flex justify-left items-center gap-4'>
      <ProfilePicture size='h-10 w-10' src={item?.profilePicture} />
      <div className='flex flex-col gap-2' style={{ maxWidth: '70%' }}>
        <span className='text-sm font-semibold text-gray-700'>
          {item?.firstName} {item?.lastName} -{' '}
          <span className='text-xs font-medium text-gray-500'>
            {item?.companyName}
          </span>
        </span>
        <p className='truncate text-gray-400 font-small text-sm'>{item?.bio}</p>
      </div>
    </div>
  </Link>
);

const LABELS = {
  jobs: Job,
  creators: Creator,
  companies: Company,
};

const ComponentSwitch = (props) => {
  const { itemKey, item, onClick } = props;
  if (LABELS[itemKey]) {
    const Component = LABELS[itemKey];
    return (
      <div>
        <Component item={item} onClick={onClick}/>
      </div>
    );
  }
  return null;
};

export default ComponentSwitch;
