const CreateSubmissionButton = ({ onClick }) => {
    return (
      <button
        type='button'
        className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-bold rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
        onClick={onClick}
      >
        New submission
      </button>
    );
  };
  
  export default CreateSubmissionButton