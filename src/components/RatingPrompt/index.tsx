import { useMutation } from '@apollo/client';
import { Modal, Button, Group, Textarea, Rating } from '@mantine/core';
import { CREATE_RATE } from 'graphql/mutations';
import { useRef } from 'react';

const RatingPrompt = ({ job, handleClose, opened }) => {
  const ref = useRef(2);

  const textAreaRef = useRef('');

  const [createRate] = useMutation(CREATE_RATE, {
    onCompleted: () => handleClose()
  });

  const handleRate = (newRate: number) => (ref.current = newRate);

  const handleSubmit = async () => {
    await createRate({
      variables: {
        rate: ref.current,
        jobId: job?._id,
        note: textAreaRef.current,
      },
    });
  };

  return (
    <Modal opened={opened} onClose={handleClose} title='Rate your experience'>
      <div className='flex flex-col gap-8'>
        <Rating
          defaultValue={ref.current}
          size='lg'
          color='indigo'
          onChange={handleRate}
        />
        <Textarea
          placeholder='Write a note'
          label='Note'
          autosize
          onChange={(e) => (textAreaRef.current = e.target.value)}
          minRows={4}
        />
      </div>
      <Group mt='xl' position='right'>
        <Button
          variant='outline'
          color='gray'
          onClick={handleClose}
          size='xs'
          radius='xl'
        >
          Cancel
        </Button>

        <Button
          variant='outline'
          color='green'
          size='xs'
          radius='xl'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Group>
    </Modal>
  );
};

export default RatingPrompt;
