import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { requestOptions } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addJobs } from '../store/jobsSlice';

const JobsList = () => {
    const dispatch = useDispatch();
    // const jobList = useSelector((state) => state.jobs);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [jobList, setJobList] = useState([]);
    useEffect(() => {
        getJobsList(); 
    }, [offset]); // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    })
    const getJobsList = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                ...requestOptions,
                body: JSON.stringify({ limit: 10, offset })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            // dispatch(addJobs(result.jdList));
            const data=result.jdList;
            console.log(data);
            setJobList((prev)=>[...prev,...data]);
        } catch (error) {
            setError(error);
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleScroll = async () => {
        try{
            if (!isLoading && window.innerHeight + document.documentElement.scrollTop >=document.documentElement.offsetHeight - 20) {
                // Fetch more data
                setOffset(prevOffset => prevOffset + 10);
            }
        }
        catch(error){
            console.log(error);
        }
    };
    return (
        <div className='jobList' style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {error && <div>Error fetching data. Please try again later.</div>}
            {jobList?.map((job) => (
                <JobCard key={job.jdUid} jobData={job} style={{ flex: '0 0 calc(33.333% - 20px)' }} />
            ))}
            {isLoading && <div>Loading...</div>}
        </div>
    );
};

export default JobsList;
