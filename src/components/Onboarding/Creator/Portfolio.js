import { useState } from 'react';
import EmptyStateAction from 'components/EmptyState';
import AddWork from 'components/AddWorkModal';
import ImagePreview from 'components/ImagePreview';

export default function Portfolio({values, setFieldValue}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editWork, setEditWork] = useState(null);

  const addWork = (work) => {
    setFieldValue('works', [...values.works, work]);
    setIsModalOpen(false);
  };

  // const handleDelete = (id) => setWorks(works.filter((i, idx) => idx !== id));

  const handleDelete = (id) => setFieldValue('works', values.works.filter((i, idx) => idx !== id))
  
  const workToEdit = (id) => {
    setIsModalOpen(true)
    setEditWork({...values.works.find((i, idx) => idx === id), id})
  };

  // refactor me
  const handleEdit = (newValues) => {
    const {id} = editWork
    setFieldValue('works', values.works.map((work, idx) => {
      if(idx === id) {
        return newValues
      }
      return work
    }))
    setIsModalOpen(false)
  }

  return (
    <div className='flex flex-col py-4 gap-6'>
      {!!values.works?.length && (
        <ul
          role='list'
          className='space-y-3 flex gap-4 justify-center items-center'
        >
          {values.works?.map((work, idx) => (
            <li
              key={idx}
              className='bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md block justify-between min-w-1/2'
            >
              {/* Your content */}
              <div>
                <div className='flex flex-col'>
                  <span className='text-2xl font-bold'>{work.title}</span>
                  <span>{work.clientName}</span>
                  <div className='block'>
                    <span className='text-slate-500 truncate ... block max-w-1/2'>
                      {work.description + work.description}
                    </span>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button onClick={() => workToEdit(idx)} className='border-0 text-md text-secondary hover:text-primary cursor-pointer' type="button">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(idx)} className='border-0 text-red-400 hover:text-red-600 cursor-pointer' type="button">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div>
        {isModalOpen ? (
          <AddWork
            open={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
              setEditWork(null)
            }}
            addWork={addWork}
            editWork={editWork}
            handleEdit={handleEdit}
          />
        ) : null}
      </div>
      <EmptyStateAction
        title='Your works'
        subtitle='Start by adding a project'
        btnTitle='New project'
        action={() => setIsModalOpen(true)}
      />
    </div>
  );
}
