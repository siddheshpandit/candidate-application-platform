import React from "react";
import Select from "react-select";

const MultiSelectFilter = ({ name, options, value, onChange }) => {
  const handleChange = (selectedOptions) => {
    onChange(selectedOptions);
  };

  return (
    <div>
      <Select
        isMulti
        name={name}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        value={value}
        onChange={handleChange}
        placeholder={name}
      />
    </div>
  );
};

export default MultiSelectFilter;
