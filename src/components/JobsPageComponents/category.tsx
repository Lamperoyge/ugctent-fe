const Category = ({ job }) => (
  <>
    <h2 className="text-sm font-medium text-gray-500">Category</h2>
    <ul className="flex mt-2 leading-8 flex-wrap gap-2">
      <li>
        <li className="border rounded-full py-1 px-3 text-xs mr-2 font-semibold text-white bg-green-700 items-center">
          <span className="block truncate">{job.category?.label}</span>
        </li>
      </li>
    </ul>
  </>
);

export default Category;
