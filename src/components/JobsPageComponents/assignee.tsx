import ProfilePicture from 'components/ProfilePicture';
const Assignee = ({ job }) => (
  <>
    <h2 className="text-sm font-medium text-gray-500">Assignee</h2>
    <ul className="mt-3 space-y-3">
      <li className="flex justify-start">
        <a href="#" className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <ProfilePicture 
              src={job?.creator?.profilePicture}
              size="h-6 w-6"
            />
          </div>
          <div className="text-sm font-medium text-gray-900">
            {job?.assignee
              ? `${job?.assignee?.firstName} ${job?.assignee?.lastName}`
              : "Not assigned"}
          </div>
        </a>
      </li>
    </ul>
  </>
);

export default Assignee;
