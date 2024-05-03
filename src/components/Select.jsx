import React from 'react';
import Select from 'react-select';

const SingleSelectFilter = ({ name, options, value, onChange }) => {
  const handleChange = (selectedOptions) => {
    onChange(selectedOptions);
  };

  return (
    <Select
      name={name}
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      value={value}
      onChange={handleChange}
      placeholder={name}
    />
  );
};

export default SingleSelectFilter;