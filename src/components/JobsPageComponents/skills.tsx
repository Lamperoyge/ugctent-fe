const Skills = ({job}) => (
    <>
    <span className="text-sm text-gray-500">Skills</span>
        <ul className='flex leading-8 my-4 flex-wrap gap-2 justify-start items-center'>
            {job.skills?.map((skill) => (
                <li
                    className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800'
                    key={skill._id}
                >
                    <span className='block truncate'>{skill.label}</span>
                </li>
            ))}
        </ul>
    </>
)

export default Skills;