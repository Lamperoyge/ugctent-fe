import { useMutation } from '@apollo/client';
import { REQUEST_INVOICE } from 'graphql/mutations';
import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { JOB_INVOICE_STATUS, JOB_STATUS } from 'utils/constants';
import { LoadingOverlay, Modal } from '@mantine/core';
import { useState } from 'react';
import { classNames } from 'utils/helpers';
import { PlusIcon } from '@heroicons/react/outline';
import { Attachments } from 'components/CreateProject/helpers';

const RequestInvoice = ({ job }) => {
  const [requestInvoice] = useMutation(REQUEST_INVOICE, {
    refetchQueries: ['getJobById'],
  });
  return (
    <button
      type='button'
      onClick={() => {
        requestInvoice({
          variables: {
            jobId: job._id,
          },
        });
        // setNewProjectModalOpen(true);
        // setSidebarOpen(false);
      }}
      className='items-center w-full justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
    >
      Request Invoice
    </button>
  );
};

const CreatorInvoiceRequested = () => {
  return (
    <button
      type='button'
      disabled
      className='pointer-events-noneinline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
    >
      <span>Invoice requested</span>
    </button>
  );
};

const KEYS = {
  SRL: 'srl',
  PF: 'pf',
};

const TAB_ITEMS = [
  { name: 'PFA / SRL', key: KEYS.SRL },
  { name: 'Persoana fizica', key: KEYS.PF },
];

function Tabs({ tabs, onChange }) {
  return (
    <div>
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id='tabs'
          name='tabs'
          className='block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <nav
          className='relative z-0 rounded-lg shadow flex divide-x divide-gray-200'
          aria-label='Tabs'
        >
          {tabs.map((tab, tabIdx) => (
            <button
              key={tab.name}
              onClick={() => onChange(tab.key)}
              className={classNames(
                tab.current
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden='true'
                className={classNames(
                  tab.current ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

const HandleCompanyUpload = () => {
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});
  const limit = 2097152;
  const handleAttachments = (e) => {
    const files: any = Array.from(e.target.files)
      .map((file: any) => (file?.size <= limit ? file : null))
      .filter((i) => i);
    files.length !== e.target.files.length
      ? setErrors({ ...errors, attachments: 'Max upload size is 2MB' })
      : setAttachments(files);
  };

  const removeAttachment = (attach) => {
    const files = attachments.filter((v) => v.name !== attach);
    return setAttachments(files);
  };

  return (
    <Attachments
      accept='image/jpeg,image/png,application/pdf,image/jpg'
      acceptTitle='JPEG, JPG, PNG, PDF'
      handleAttachments={handleAttachments}
      errors={errors}
      attachments={attachments}
      removeAttachment={removeAttachment}
    />
  );
};

const HandlePersonUpload = () => {
  return <div>person upload</div>;
};

const UploadInvoice = ({ job }) => {
  const [activeTab, setActiveTab] = useState(KEYS.SRL);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  const tabs = TAB_ITEMS.map((tab) => ({
    ...tab,
    current: tab.key === activeTab,
  }));
  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        title='Add invoice'
      >
        <h2 className='py-4 font-bold'>Add invoice: {job.title}</h2>
        <span className='py-4 text-xs'>Description: {job.description}</span>
        <div className='flex justify-center items-center'>
          <div className='flex flex-col w-full space-y-6 py-4'>
            <Tabs tabs={tabs} onChange={(key) => setActiveTab(key)} />
            {activeTab === KEYS.SRL && <HandleCompanyUpload />}
            {activeTab === KEYS.PF && <HandlePersonUpload />}
          </div>
        </div>
      </Modal>
      <button
        type='button'
        onClick={toggleModal}
        className='items-center w-full justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
      >
        Add invoice
      </button>
    </>
  );
};

const ManageInvoice = ({ job }) => {
  const { user } = useAuth();
  const router = useRouter();

  const { uploadInvoice } = router?.query;

  if (uploadInvoice && user?._id === job.assigneeId) {
    return <UploadInvoice job={job} />;
  }

  if (job.status !== JOB_STATUS.COMPLETED) return null;
  if (job.invoiceStatus === JOB_INVOICE_STATUS.NOT_REQUESTED) {
    return <RequestInvoice job={job} />;
  }
  if (job.invoiceStatus === JOB_INVOICE_STATUS.REQUESTED) {
    return <CreatorInvoiceRequested />;
  }
  return null;
};

export default ManageInvoice;
