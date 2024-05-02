import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import { requestOptions } from '../services/api'
import { useDispatch,useSelector } from 'react-redux'
import { addJobs } from '../store/jobsSlice'

const JobsList = () => {
    const dispatch=useDispatch();
    const jobList=useSelector((state)=>state.jobs)
    useEffect(() => {
        getJobsList();
    }, [])
    
    const getJobsList=async ()=>{
        try {
            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON",requestOptions)
            const result = await response.json();
            dispatch(addJobs(result.jdList));
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='jobList' style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {jobList?.map((job) => (
                <JobCard key={job.jdUid} jobData={job} style={{ flex: '0 0 calc(33.333% - 20px)' }} />
            ))}
    </div>
  )
}

export default JobsList