const Assignee = ({ job }) => (
  <>
    <h2 className="text-sm font-medium text-gray-500">Assignee</h2>
    <ul className="mt-3 space-y-3">
      <li className="flex justify-start">
        <a href="#" className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img
              className="h-5 w-5 rounded-full"
              src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
              alt=""
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
