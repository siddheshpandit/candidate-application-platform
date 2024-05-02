import React from 'react'
import {Button, Card, CardActions, CardContent, CardHeader, Typography} from '@mui/material'
const JobCard = ({jobData}) => {
  const {jdLink,jobDetailsFromCompany,jobRole,location,maxExp,maxJdSalary,minExp,minJdSalary,salaryCurrencyCode}=jobData;
  
  const handleApply=()=>{
    window.location.href=jdLink;
  }
  return (
    <div className="jobCard">
      
        {/* <div style={{border:'1px solid black', borderRadius:'10px', }}> */}
      <Card sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px',width:'400px', padding:'20px' }}>
      <CardHeader
        title={jobRole}
        subheader={`Weekday - ${location}`}
        sx={{ borderBottom: '1px solid #EAEAEA' }}
        titleTypographyProps={{
          sx: {
            fontSize: '24px', // Customize font size
            fontWeight: 10, // Set font weight to 10
            color: 'black', // Customize text color
            fontFamily: 'Arial, sans-serif', // Customize font family
          }
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {jobDetailsFromCompany}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleApply} style={{width:'100%',justifyContent:'center', backgroundColor:'cyan', color:'black'}}>
          Apply
        </Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default JobCard