const Skills = ({job}) => (
    <>
        <h2 className='text-sm font-medium text-gray-500'>
            Skills
        </h2>
        <ul className='flex mt-2 leading-8 flex-wrap gap-2'>
            {job.skills?.map((skill) => (
                <li
                    className='border rounded-full py-1 px-3 text-xs mr-2 font-semibold text-white bg-primaryOrange items-center'
                    key={skill._id}
                >
                    <span className='block truncate'>{skill.label}</span>
                </li>
            ))}
        </ul>
    </>
)

export default Skills;