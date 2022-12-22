import { TextArea, Input, Attachments } from 'components/CreateProject/helpers';
import Links from 'components/CreateProject/Links';
import { SUBMISSION_UPLOAD_LIMIT } from 'utils/constants';

const ITEM_COMPONENT = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  LINKS: 'links',
  ATTACHMENTS: 'attachments',
};

export const config = [
  {
    name: 'title',
    placeholder: 'Enter submission title',
    label: 'Title',
    type: 'text',
    component: 'input',
  },
  {
    name: 'description',
    component: 'textarea',
    rows: 6,
    placeholder: 'Submission description',
    label: 'Description',
    description: 'Please describe your work',
  },
  {
    name: 'links',
    component: 'links',
    placeholder: 'Submission links',
    label: 'Links',
    description: 'Please provide links to your work',
  },
  {
    name: 'attachments',
    component: ITEM_COMPONENT.ATTACHMENTS,
    placeholder: 'Attachments',
    label: 'Attachments',
    description: 'Please upload any related attachments',
  },
];

export const renderSubmissionsComponent = (item, formik, idx) => {
  switch (item.component) {
    case ITEM_COMPONENT.INPUT:
      return renderItemComponent(item, formik, idx);
    case ITEM_COMPONENT.TEXTAREA:
      return renderTextAreaComponent(item, formik, idx);
    case ITEM_COMPONENT.LINKS:
      return renderLinkComponent(formik, idx);
    case ITEM_COMPONENT.ATTACHMENTS:
      return renderAttachmentComponent(formik, idx);
    default:
      return;
  }
};

export const renderItemComponent = (item, formik, idx) => (
  <Input
    {...item}
    key={idx}
    placeholder={item.placeholder}
    value={formik?.values[item.name]}
    name={item.name}
    onBlur={formik?.handleBlur}
    label={item.label}
    error={formik?.touched[item.name] && formik?.errors[item.name]}
    variant='xs'
    onChange={formik?.handleChange}
  />
);

const renderTextAreaComponent = (item, formik, idx) => (
  <TextArea
    {...item}
    key={idx}
    placeholder={item.placeholder}
    value={formik.values[item.name]}
    onBlur={formik.handleBlur}
    name={item.name}
    error={formik.touched[item.name] && formik.errors[item.name]}
    label={item.label}
    onChange={formik.handleChange}
  />
);

const renderLinkComponent = (formik, idx) => (
  <Links
    key={idx}
    onChange={(links) => formik.setFieldValue('links', links)}
    values={formik.values.links}
  />
);

export const renderAttachmentComponent = (formik, idx) => {
  const handleAttachments = (e) => {
    const files = Array.from(e.target.files)
      .map((file) => (file.size <= SUBMISSION_UPLOAD_LIMIT ? file : null))
      .filter((i) => i);
    files.length !== e.target.files.length
      ? formik.setFieldError('attachments', 'Max upload size is 25MB')
      : formik.setFieldValue('attachments', files);
  };

  const removeAttachment = (attach) => {
    const files = formik.values.attachments.filter((v) => v.name !== attach);
    return formik.setFieldValue('attachments', files);
  };

  return (
    <Attachments
      key={idx}
      limit={SUBMISSION_UPLOAD_LIMIT}
      handleAttachments={handleAttachments}
      errors={formik.errors}
      attachments={formik.values.attachments}
      removeAttachment={removeAttachment}
    />
  );
};
