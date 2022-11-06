export default function Tabs({ label = 'Select a tab', tabs }) {
  return (
    <div>
      <label htmlFor='tabs' className='sr-only'>
        {label}
      </label>
      {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
      <select
        id='tabs'
        name='tabs'
        className='mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md'
        defaultValue={tabs[0].name}
      >
        {tabs.map((tab) => (
          <option key={tab.name}>{tab.name}</option>
        ))}
      </select>
    </div>
  );
}
