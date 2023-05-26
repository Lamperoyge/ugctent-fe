const WorkSection = ({ works }) => (
  <div className="flex flex-col gap-5 overflow-auto">
    {works.map((work, idx) => (
      <div className="flex flex-col gap-1" key={idx}>
        <h2 className="text-2xl font-bold text-orange-500">{work.company}</h2>
        <h3 className="text-xl font-medium">{work.jobTitle}</h3>
        <div className="text-slate-500">
          <i className="">{work.startDate}</i> - <i>{work.endDate}</i>
        </div>
        <p className="">{work.jobDescription}</p>
      </div>
    ))}
  </div>
);

export default WorkSection;
