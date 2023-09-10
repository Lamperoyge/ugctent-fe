import { PlayIcon } from '@heroicons/react/outline';
import ImagePreview from 'components/ImagePreview';
import { useState } from 'react';

const IntroductionVideo = ({ setFieldValue, selectedFile, error = null }) => {
  const MAX_VIDEO_SIZE = 22 * 1024 * 1024; // 500MB
  const MAX_VIDEO_DURATION = 3 * 60 * 1000; // 3 minutes


  const handleVideoSelect = (e) => {
    const videoFile = e.target.files[0];
    // Validate video size
    if (videoFile.size > MAX_VIDEO_SIZE) {
      alert('Video file size should be less than 500MB.');
      return;
    }

    setFieldValue('introductionAsset', videoFile);

  };

  return (
    <>
      <div className='mt-1 flex items-center space-x-5'>
        <span className='inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
          {selectedFile ? (
            <ImagePreview
              file={selectedFile}
              className='w-auto max-h-24'
            />
          ) : (
            <PlayIcon className='text-gray-400' />
          )}
        </span>
        <label className='bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'>
          Select a video
          <input
            accept='video/*'
            onChange={handleVideoSelect}
            className='hidden'
            type='file'
          />
        </label>
      </div>
      {selectedFile ? (
        <span className='text-sm text-gray-900 font-light'>
          {selectedFile?.name}
        </span>
      ) : null}
      {error ? (
        <span className='text-sm text-red-400 font-light'>{error}</span>
      ) : null}
    </>
  );
};

export default IntroductionVideo;
