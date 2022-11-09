import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  InvalidApplication,
  LoadingState,
} from 'components/ApplicationView/Helpers';
import Link from 'next/link';
import ProfilePicture from 'components/ProfilePicture';
import Comments from 'components/Comments';
import { COMMENT_ENTITY_TYPES } from 'utils/constants';
import { useAuth } from 'hooks';
import { useSubmission } from 'hooks/submissions';
import { Drawer, Button, Group } from '@mantine/core';

const SubmissionView = ({ submissionId, isOpen, onClose }) => {

  const { submission, submissionError, submissionLoading, getSubmission } =
    useSubmission();

    console.log(submission)
  useEffect(() => {
    if (submissionId && isOpen) getSubmission(submissionId);
  }, [submissionId, isOpen]);

  if (submissionLoading) return <LoadingState />;

  return (
    <>
      <Drawer
        opened={isOpen}
        padding="xl"
        size="xl"
        onClose={onClose}
        title={"View submission"}
      ></Drawer>
    </>
  );
};

export default SubmissionView;
