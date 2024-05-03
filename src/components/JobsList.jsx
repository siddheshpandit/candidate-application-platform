import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { requestOptions } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { addJobs } from "../store/jobsSlice";

const JobsList = ({ filters }) => {
  const dispatch = useDispatch();
  const jobList = useSelector((state) => state.jobs);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
//   const [jobList, setJobList] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    getJobsList();
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  // useEffect(()=>{
  //     window.addEventListener('scroll', handleScroll);
  //     return () => {
  //         window.removeEventListener('scroll', handleScroll);
  //     };
  // })
  const getJobsList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          ...requestOptions,
          body: JSON.stringify({ limit: 10, offset: 0 }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      dispatch(addJobs(result.jdList));
    setFilteredJobs(result.jdList);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleScroll = async () => {
  //     try{
  //         if (!isLoading && window.innerHeight + document.documentElement.scrollTop >=document.documentElement.offsetHeight - 20) {
  //             // Fetch more data
  //             setOffset(prevOffset => prevOffset + 10);
  //         }
  //     }
  //     catch(error){
  //         console.log(error);
  //     }
  // };

  useEffect(() => {
    // Apply filters whenever filters change
    const filteredData = applyFilters(jobList, filters);
    setFilteredJobs(filteredData);
  }, [filters]);

  const applyFilters = () => {
    let filteredData = jobList;
    // For Roles 
    if (filters.roles.length > 0) {
        filteredData = jobList.filter(job => {
            const lowerCaseRole = job.jobRole.toLowerCase();
            return filters.roles.some(role => lowerCaseRole.includes(role.toLowerCase()));
        });
    }
    if (filters.isRemote && filters.isRemote.toLowerCase() === 'remote') {
        filteredData = filteredData.filter(job => job.location.toLowerCase().includes('remote'));
    } else{
        filteredData = filteredData.filter(job => !job.location.toLowerCase().includes('remote'));
    }
    console.log(filteredData);
    return filteredData;
};

  return (
    <div
      className="jobList"
      style={{
        display: "flex",
        justifyContent: "left",
        gap: "40px",
        flexWrap: "wrap",
        marginTop:'20px'
      }}
    >
      {error && <div>Error fetching data. Please try again later.</div>}
      {filteredJobs?.map((job) => (
        <JobCard
          key={job.jdUid}
          jobData={job}
          style={{ flex: "0 0 calc(33.333% - 20px)" }}
        />
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default JobsList;
