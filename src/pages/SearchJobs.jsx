import React from 'react'
import Filters from '../components/Filters'
import JobsList from '../components/JobsList'

const SearchJobs = () => {
  return (
    <div>
        <Filters/>
        <JobsList/>
    </div>
  )
}

export default SearchJobs