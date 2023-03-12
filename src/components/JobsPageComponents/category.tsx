const Category = ({ job }) => (
        <li className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800">
          <span className="block truncate">{job.category?.label}</span>
        </li>
);

export default Category;
