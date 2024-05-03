import React from "react";
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

const basePayOption=[
  { value: 0, label: 0 },
  { value: 10, label: 10 },
  { value: 20, label: 20 },
  { value: 30, label: 30 },
  { value: 50, label: 50 },
  { value: 75, label: 75 },
  { value: 100, label: 100 },
]
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
      <SingleSelectFilter
        name={"Minimum Base Pay Salary"}
        options={basePayOption}
        onChange={(selectedOptions) =>
          handleFilterChange("basePay", selectedOptions)
        }
      />
    </div>
  );
};

export default Filters;
