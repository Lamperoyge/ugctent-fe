import ProfilePicture from 'components/ProfilePicture';
import Link from 'next/link';
const Assignee = ({ job }) => (
  <>
      <li className="flex justify-center bg-gray-200 rounded-xl items-center pr-2">
        <Link href={`/profile/${job?.assigneeId}`} className="flex items-center space-x-3 justify-center">
          <div className="flex-shrink-0 flex items-center">
            <ProfilePicture 
              src={job?.creator?.profilePicture}
              size="h-6 w-6"
            />
          </div>
          <div className="text-sm font-bold text-gray-600">
            {job?.assignee
              ? `${job?.assignee?.firstName} ${job?.assignee?.lastName}`
              : "Not assigned"}
          </div>
        </Link>
      </li>
  </>
);

export default Assignee;
