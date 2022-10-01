import validator from 'validator';
import { XIcon, PlusIcon } from '@heroicons/react/outline';
import { useState } from 'react';

const LINK_KEYS = {
  URL: 'url',
  DISPLAY_NAME: 'displayName',
};

export const EMPTY_LINK_FIELD = {
  [LINK_KEYS.URL]: '',
  [LINK_KEYS.DISPLAY_NAME]: '',
};

function LinksComponent(props) {
  const { value: fields, onChange } = props;
  const [errors, setErrors] = useState([]);

  const addField = (idx) => onChange([...fields, EMPTY_LINK_FIELD]);

  const removeField = (idx) => {
    const newFields = fields.filter((field, i) => i !== idx);
    onChange(newFields);
  };

  const handleInputChange = (value, idx, type) => {
    if (props.value && props.value[idx]) {
      const newFields = props.value.map((item, index) => {
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
    <div>
      {fields?.map((field, idx) => (
        <div key={idx}>
          <input
            onChange={(e) =>
              handleInputChange(e.target.value, idx, LINK_KEYS.DISPLAY_NAME)
            }
          />
          <span />
          <input
            onBlur={(e) => validateUrl(e, idx)}
            onChange={(e) =>
              handleInputChange(e.target.value, idx, LINK_KEYS.URL)
            }
          />
          <button
            className='rounded cursor-pointer h-12 w-12 flex items-center justify-center'
            type='button'
            onClick={(e) => handleField(e, idx)}
          >
            {idx !== fields.length - 1 ? <XIcon /> : <PlusIcon />}
          </button>
        </div>
      ))}
    </div>
    // <div className='flex flex-wrap items-center gap-4'>
    //   {fields?.map((field, idx) => (
    //     <div className='flex space-between items-center gap-2 w-1/3' key={idx}>
    //       <div style={{ width: '20%' }}>
    //         <input
    //           placeholder='Title of link'
    //           className='h-12 rounded border-2 p-4'
    //           value={field[LINK_KEYS.DISPLAY_NAME]}
    //           onChange={(e) =>
    //             handleInputChange(e.target.value, idx, LINK_KEYS.DISPLAY_NAME)
    //           }
    //         />
    //         <span />
    //       </div>
    //       <div style={{ flex: 1 }}>
    //         <input
    //           placeholder='URL link'
    //           className='h-12 rounded border-2 p-4'
    //           value={field[LINK_KEYS.URL]}
    // onBlur={(e) => validateUrl(e, idx)}
    // onChange={(e) =>
    //   handleInputChange(e.target.value, idx, LINK_KEYS.URL)
    // }
    // error={!!errors[idx]}
    //           type='url'
    //         />
    //       </div>
    // <button
    //   className='rounded cursor-pointer h-12 w-12 flex items-center justify-center'
    //   type='button'
    //   onClick={(e) => handleField(e, idx)}
    // >
    //   {idx !== fields.length - 1 ? <XIcon /> : <PlusIcon />}
    // </button>
    //     </div>
    //   ))}
    // </div>
  );
}

export default LinksComponent;
