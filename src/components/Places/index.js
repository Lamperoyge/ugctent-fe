import React, { useState, useEffect, useRef } from 'react';

let autoComplete;

async function handlePlaceSelect(handleChange) {
  const addressObject = autoComplete.getPlace();
  handleChange(addressObject);
}

function handleScriptLoad(autoCompleteRef, country, handleChange) {
  let sessionToken = new google.maps.places.AutocompleteSessionToken();

  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {
      types: ['(cities)'],
      sessionToken,
      componentRestrictions: {
        country,
      },
    }
  );
  autoComplete.setFields(['address_components', 'formatted_address']);
  autoComplete.addListener('place_changed', () =>
    handlePlaceSelect(handleChange)
  );
}

function SearchLocationInput({
  htmlFor,
  name,
  handleChange,
  label,
  disabled,
  country,
}) {
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    if (country) {
      handleScriptLoad(autoCompleteRef, country, handleChange);
    }
  }, [country]);

  return (
    <>
      <label
        htmlFor={htmlFor}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <input
        type='text'
        name={name}
        ref={autoCompleteRef}
        country={country}
        disabled={disabled}
        id={name}
        autoComplete={'city'}
        className='mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
      />
    </>
  );
}

export default SearchLocationInput;
