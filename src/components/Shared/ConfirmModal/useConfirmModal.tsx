import { Modal, Button, Text, Group } from '@mantine/core';
import React, { useState } from 'react';

const useConfirmModal = () => {
  const [config, setConfig] = useState(null);
  const openConfirmModal = ({
    title,
    children,
    onConfirm,
    onCancel,
    labels = {
      confirm: 'Confirm',
      cancel: 'Cancel',
    },
    confirmProps = {},
    closeOnCancel = true,
    closeOnConfirm = true,
  }: {
    title: string;
    children: React.ReactElement<any>;
    onConfirm: () => void;
    onCancel?: () => void;
    labels: {
      confirm: string;
      cancel: string;
    };
    confirmProps: any;

    closeOnCancel?: boolean;
    closeOnConfirm?: boolean;
  }) =>
    setConfig({
      title,
      children,
      onConfirm,
      onCancel,
      labels,
      confirmProps,
      closeOnCancel,
      closeOnConfirm,
    });

  const ConfirmModal = () => {
    if (!config) return null;
    return (
      <Modal
        opened={!!config}
        padding='xl'
        title="Confirm"
        id='modal-confirm-wrapper'
        overlayOpacity={0.55}
        withinPortal={true}
        lockScroll={true}
        overlayBlur={3}
        overflow='inside'
        size={'xs'}
        onClose={() => setConfig(null)}
      >
        {config?.children}
        <Group mt='xl' grow position="right">
          <Button
            variant='outline'
            size="xs"
            onClick={() => {
              if (config?.closeOnCancel) setConfig(null);

              config?.onConfirm?.();
            }}
            {...config?.confirmProps}
          >
            {config?.labels?.confirm}
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              if (config?.closeOnCancel) setConfig(null);
              config?.onCancel?.();
            }}
            size='xs'
            radius='xl'
            color='gray'
            {...config?.cancelProps}
          >
            {config?.labels?.cancel}
          </Button>
        </Group>
      </Modal>
    );
  };
  return {
    openConfirmModal,
    ConfirmModal,
  };
};

export default useConfirmModal;
