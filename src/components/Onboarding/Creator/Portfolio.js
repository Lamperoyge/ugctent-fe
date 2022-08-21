import { useState } from 'react';
import EmptyStateAction from 'components/EmptyState';
import AddWork from 'components/AddWorkModal';

export default function Portfolio() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <AddWork open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EmptyStateAction
        title='Your works'
        subtitle='Start by adding a project'
        btnTitle='New project'
        action={() => setIsModalOpen(true)}
      />
    </>
  );
}
