import React from "react";
import Multiselect from "./Multiselect";
import MultiSelectFilter from "./Multiselect";
import SingleSelectFilter from "./Select";

const rolesOptions = [
  {
    label: "Engineering",
    options: [
      { value: "Backend", label: "Backend" },
      { value: "Frontend", label: "Frontend" },
      { value: "Tech Lead", label: "Tech Lead" },
    ],
  },
  {
    label: "Design",
    options: [
      { value: "Designer", label: "Designer" },
      { value: "Product Designer", label: "Product Designer" },
      { value: "Graphic Designer", label: "Graphic Designer" },
    ],
  },
];

const locationOptions = [
  { value: "Remote", label: "Remote" },
  { value: "In-office", label: "In-office" },
];

const Filters = ({ onFilterChange, filters }) => {
  const handleFilterChange = (category, selectedOptions) => {
    onFilterChange(category, selectedOptions);
  };
  return (
    <div style={{ display: "flex", gap:'10px' }}>
      <MultiSelectFilter
        name={"Roles"}
        options={rolesOptions}
        onChange={(selectedOptions) =>
          handleFilterChange("roles", selectedOptions)
        }
      />
      <SingleSelectFilter
        name={"Remote"}
        options={locationOptions}
        onChange={(selectedOptions) =>
          handleFilterChange("isRemote", selectedOptions)
        }
      />
    </div>
  );
};

export default Filters;
