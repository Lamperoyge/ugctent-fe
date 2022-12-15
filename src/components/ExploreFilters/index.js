import { SearchIcon } from '@heroicons/react/solid';
import { useGetSkills, useGetInterests } from 'hooks';
import MultiSelect from 'components/Shared/Form/MultiSelect';
import { LIMIT } from 'utils/constants';
import { useCallback, useState } from 'react';
import Select from 'components/Shared/Form/Select';

const Search = ({ onChange, label = 'Search', value }) => (
  <div
    className='basis-full flex flex-col items-start md:ml-0'
    action='#'
    method='GET'
  >
    <label className='block text-sm font-medium text-gray-700 mb-1'>
      {label}
    </label>
    <div className='relative w-full text-gray-400 focus-within:text-secondary border rounded-md px-2'>
      <div className='pointer-events-none absolute inset-y-0 left-1 flex items-center'>
        <SearchIcon className='h-5 w-5' aria-hidden='true' />
      </div>
      <input
        id='search-field'
        onChange={onChange}
        className='block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
        placeholder='Search'
        type='search'
        name='search'
      />
    </div>
  </div>
);

const Skills = ({ onChange, value }) => {
  const { skills } = useGetSkills();
  return (
    <div className='flex flex-col sm:flex-row gap-5 min-w-30 basis-fit-content flex-1'>
      <MultiSelect
        onChange={onChange}
        label='Skills'
        selected={value}
        name='skills'
        options={skills}
      />
    </div>
  );
};

const Interests = ({ onChange, value }) => {
  const { interests } = useGetInterests();
  return (
    <div className='flex flex-col sm:flex-row gap-5 min-w-30 basis-fit-content flex-1'>
      <MultiSelect
        onChange={onChange}
        label='Interests'
        selected={value}
        name='interests'
        options={interests}
      />
    </div>
  );
};

const options = [
  {
    label: 'Select minimum rating',
    value: null,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '1',
    value: 1,
  },
  
];

const MinimumRating = ({ value, onChange }) => {
  const selectValue = value || options[0];
  return (
    <div className='flex flex-col sm:flex-row gap-5 min-w-30 basis-fit-content flex-1'>
      <Select
        label='Minimum Rating'
        name='minimumRating'
        inputHeight="h-12"
        options={options}
        value={selectValue}
        onChange={onChange}
        wrapperStyle="w-full"
      />
    </div>
  );
};

const ExploreTalentsFilters = ({ refetch }) => {
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [minRating, setMinRating] = useState(null);

  const debounceRefetch = () => {
    let timer;
    return (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setSearchValue(e.target.value);
        refetch({
          search: e.target.value,
          limit: LIMIT,
          offset: 0,
          skillIds: skills?.map((i) => i._id),
          interestsIds: interests?.map((i) => i._id),
        });
      }, 1000);
    };
  };

  const handleSearch = useCallback(debounceRefetch(), [
    skills,
    interests,
    setSearchValue,
  ]);

  const handleChange = (type) => (v) => {
    if (type === 'skills') {
      setSkills(v);
      refetch({
        limit: LIMIT,
        offset: 0,
        skillIds: v?.map((i) => i._id),
        interestsIds: interests?.map((i) => i._id),
      });
    }
    if (type === 'interests') {
      setInterests(v);
      refetch({
        limit: LIMIT,
        offset: 0,
        skillIds: skills?.map((i) => i._id),
        interestIds: v?.map((i) => i._id),
      });
    }
  };
  
  const handleMinRating = (rating) => {
    setMinRating(rating);
    refetch({
      limit: LIMIT,
      offset: 0,
      skillIds: skills?.map((i) => i._id),
      interestIds: interests?.map((i) => i._id),
      minRating: rating?.value,
      search: searchValue,
    })
  }
  return (
    <div className='flex gap-4 flex-wrap items-center'>
      <Search onChange={handleSearch} />
      <div className='flex w-full gap-4'>
        <Skills value={skills} onChange={handleChange('skills')} />
        <Interests onChange={handleChange('interests')} value={interests} />
        <MinimumRating
          onChange={(value) => handleMinRating(value)}
          value={minRating}
        />
      </div>
    </div>
  );
};

export default ExploreTalentsFilters;
