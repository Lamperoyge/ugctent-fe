import CreateProjectModal from 'components/CreateProject';
const EditJob = ({ job, onClose }) => {
  return <CreateProjectModal existingJob={job} open onClose={onClose} />;
};

export default EditJob;
