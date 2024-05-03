import React, { useState } from "react";
import Filters from "../components/Filters";
import JobsList from "../components/JobsList";

const SearchJobs = () => {
  const initialFilters = {
    roles: [],
    location: null,
    // Add more filter categories as needed
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (category, selectedOptions) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: getFilterValue(selectedOptions),
    }));
  };

  const getFilterValue = (selectedOptions) => {
    if (!selectedOptions) {
      return null;
    }

    if (Array.isArray(selectedOptions)) {
      return selectedOptions.map((option) => option.value);
    }

    return selectedOptions.value;
  };

  return (
    <div style={{justifyContent:'center', display:'flex', flexDirection:'column'}}>
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <JobsList filters={filters} />
    </div>
  );
};

export default SearchJobs;
