import { useState } from 'react';
import { Modal } from '@mantine/core';
import ImagePreview from 'components/ImagePreview';
import { isVideo } from 'utils/helpers';

const ImageOrVideoAttachment = ({ src, full = false }) => {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        controls
        className={`${full ? '' : 'w-auto max-h-48 rounded overflow-hidden'}`}
      />
    );
  }
  return (
    <img
      className={`${full ? '' : 'w-auto max-h-24 rounded overflow-hidden'}`}
      src={src}
    />
  );
};

export default function ViewAttachments({
  attachments,
  withRemoveButton = false,
  fromMemory = false,
  removeAttachment = () => {},
}: any) {
  console.log(attachments, 'attachments');
  const [img, setImg] = useState(null);

  return (
    <>
      <Modal opened={!!img} onClose={() => setImg(null)}>
        <ImageOrVideoAttachment src={img} full/>
      </Modal>

      {attachments?.map((attach: any, idx) => (
        <div key={idx}>
          {fromMemory && typeof attach !== 'string' ? (
            <ImagePreview
              className='w-auto max-h-24 rounded overflow-hidden'
              file={attach}
            />
          ) : (
            <button
              className='border-0'
              onClick={() => setImg(attach)}
              type='button'
            >
              <>
                {attach?.includes('.pdf') ? (
                  <iframe
                    className={'w-auto max-h-24 rounded overflow-hidden'}
                    src={attach}
                  />
                ) : (
                  // <img
                  //   className='w-auto max-h-24 rounded overflow-hidden'
                  //   src={attach}
                  // />
                  <ImageOrVideoAttachment src={attach} />
                )}
              </>
            </button>
          )}
          {attach?.name && (
            <span className='inline-flex rounded-full items-center my-2 py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-primary'>
              {attach.name}
              {withRemoveButton && (
                <button
                  type='button'
                  onClick={() => removeAttachment(attach.name)}
                  className='flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-primary focus:outline-none focus:bg-primary focus:text-white'
                >
                  <span className='sr-only'>Remove large option</span>
                  <svg
                    className='h-2 w-2'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 8 8'
                  >
                    <path
                      strokeLinecap='round'
                      strokeWidth='1.5'
                      d='M1 1l6 6m0-6L1 7'
                    />
                  </svg>
                </button>
              )}
            </span>
          )}
        </div>
      ))}
    </>
  );
}
