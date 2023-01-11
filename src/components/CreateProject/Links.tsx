import validator from 'validator';
import { XIcon, PlusIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { Input } from 'components/CreateProject/helpers';

const LINK_KEYS = {
  URL: 'url',
  DISPLAY_NAME: 'displayName',
};

export const EMPTY_LINK_FIELD = {
  [LINK_KEYS.URL]: '',
  [LINK_KEYS.DISPLAY_NAME]: '',
};

function LinksComponent(props) {
  const { values: fields, onChange } = props;
  const [errors, setErrors] = useState([]);

  const addField = (idx) => onChange([...fields, EMPTY_LINK_FIELD]);

  const removeField = (idx) => {
    const newFields = fields.filter((field, i) => i !== idx);
    onChange(newFields);
  };

  const handleInputChange = (value, idx, type) => {
    if (fields && fields[idx]) {
      const newFields = fields.map((item, index) => {
        if (index === idx) {
          return { ...item, [type]: value };
        }
        return item;
      });
      return onChange(newFields);
    }
    const newFields = [{ [type]: value }];
    return onChange(newFields);
  };

  const handleField = (e, idx) => {
    e.preventDefault();
    const action = idx !== fields?.length - 1 ? removeField : addField;
    action(idx);
  };

  const validateUrl = (e, idx) => {
    const { value } = e.target;
    const isValidUrl = validator.isURL(value);
    const errorExists = !!errors[idx];
    const newErrors = [...errors];

    if (!isValidUrl && !errorExists) {
      newErrors[idx] = 'Please enter valid URL';
      return setErrors(newErrors);
    }
    if (isValidUrl && errorExists) {
      const newErrors = [...errors];
      newErrors[idx] = null;
      return setErrors(newErrors);
    }
  };

  return (
    <div className='col-span-3'>
            <label
        className='py-3 block text-sm font-medium text-gray-700'
      >
        Links
      </label>

      {fields?.map((field, idx) => (
        <div key={idx} className='flex justify-between gap-2 items-center justify-center'>
          <div className='w-3/5 flex col-flex'>
            <Input
              name={LINK_KEYS.DISPLAY_NAME}
              label='Display name'
              variant='md'
              onChange={(e) =>
                handleInputChange(e.target.value, idx, LINK_KEYS.DISPLAY_NAME)
              }
              type="url"
              value={field[LINK_KEYS.DISPLAY_NAME]}
              placeholder='Submission 1'
            />
          </div>
          <span />
          <div className='w-full'>
            <Input
              onBlur={(e) => validateUrl(e, idx)}
              name={LINK_KEYS.URL}
              variant='md'
              type="url"
              label='URL'
              onChange={(e) =>
                handleInputChange(e.target.value, idx, LINK_KEYS.URL)
              }
              value={field[LINK_KEYS.URL]}
            />
          </div>
          <button
            className='rounded cursor-pointer mt-6 h-12 w-12 flex items-center justify-center'
            type='button'
            onClick={(e) => handleField(e, idx)}
          >
            {idx !== fields.length - 1 ? <XIcon className="text-gray-500"/> : <PlusIcon className='text-gray-500'/>}
          </button>
        </div>
      ))}
    </div>
  );
}

export default LinksComponent;
