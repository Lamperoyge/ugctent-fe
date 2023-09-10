import * as yup from 'yup';


export const initialValues = {
  title: '',
  price: '',
  categoryId: [
    {
      label: 'Select a value',
      _id: null,
    },
  ],
  skillIds: [],
  description: '',
  attachments: [],
};

export const limit = 2097152;

export const schema = yup.object({
  title: yup.string().required('You need to specify a title').min(3),
  price: yup.number().required('You need to enter a price'),

  categoryId: yup
    .array()
    .of(
      yup.object({
        _id: yup.string().required('Please select a value'),
        label: yup.string().required('Please select a value'),
        __typename: yup.string().required('Please select a value'),
      })
    )
    .required(),
  skillIds: yup
    .array()
    .of(
      yup.object({
        _id: yup.string(),
        label: yup.string(),
        __typename: yup.string(),
      })
    )
    .required(),
  attachments: yup.array().of(yup.mixed()).max(3).nullable(),
  description: yup
    .string()
    .required('You need to enter project description')
    .min(100),
    introductionAsset: yup.mixed().nullable()
});
