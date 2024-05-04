import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { requestOptions } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { addJobs } from "../store/jobsSlice";
import { Box, CircularProgress } from "@mui/material";

const JobsList = ({ filters }) => {
  const dispatch = useDispatch();
  const jobList = useSelector((state) => state.jobs);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    getJobsList();
  }, [offset]);

  useEffect(()=>{
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  })
  const getJobsList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          ...requestOptions,
          body: JSON.stringify({ limit: 10, offset: offset }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      dispatch(addJobs(result.jdList));
      const newData = applyFilters(result.jdList, filters);
      setFilteredJobs([...filteredJobs,...newData]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = async () => {
      try{
          if (!isLoading && window.innerHeight + document.documentElement.scrollTop >=document.documentElement.offsetHeight - 20) {
              setOffset(prevOffset => prevOffset + 10);
          }
      }
      catch(error){
          console.log(error);
      }
  };

  useEffect(() => {
    const filteredData = applyFilters(jobList, filters);
    setFilteredJobs(filteredData);
  }, [filters]);

  const applyFilters = (data, filters) => {
    let filteredData = data;
    if (filters.roles.length > 0) {
        filteredData = filteredData.filter(job => {
            const lowerCaseRole = job.jobRole.toLowerCase();
            return filters.roles.some(role => lowerCaseRole.includes(role.toLowerCase()));
        });
    }
    if (filters.isRemote && filters.isRemote.toLowerCase() === 'remote') {
        filteredData = filteredData.filter(job => job.location.toLowerCase().includes('remote'));
    } else{
        filteredData = filteredData.filter(job => !job.location.toLowerCase().includes('remote'));
    }

    if(filters.basePay){
        filteredData= filteredData.filter(job => job.minJdSalary>=filters.basePay || job.maxJdSalary>=filters.basePay+5)
    }
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
      {isLoading && <Box sx={{ display: 'flex' , justifyContent:'center',width: '100%'}}>
      <CircularProgress />
    </Box>}
    </div>
  );
};

export default JobsList;
