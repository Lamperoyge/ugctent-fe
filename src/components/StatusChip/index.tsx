import { JOB_STATUS_LABELS_AND_COLORS } from 'utils/constants';

export default function StatusChip({ status }) {
  const jobStatusLabelData = JOB_STATUS_LABELS_AND_COLORS[status];

  return (
    <p
      className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${jobStatusLabelData?.chipColor} ${jobStatusLabelData?.textColor}`}
    >
      {jobStatusLabelData?.label}
    </p>
  );
}
