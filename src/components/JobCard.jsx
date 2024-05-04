import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

const JobCard = ({ jobData }) => {
  const {
    jdLink,
    jobDetailsFromCompany,
    jobRole,
    location,
    maxExp,
    maxJdSalary,
    minExp,
    minJdSalary,
    salaryCurrencyCode,
    companyName,
    logoUrl,
  } = jobData;

  const [expanded, setExpanded] = useState(false);

  const handleApply = () => {
    window.location.href = jdLink;
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="jobCard" style={{ textTransform: "capitalize" }}>
      <Card
        sx={{
          boxShadow: "1px 1px 2px 1px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          width: "350px",
          padding: "10px",
          minHeight: "400px",
        }}
      >
        <CardHeader
          title={companyName || "Company Name Unavailable"}
          subheader={
            <>
              <Typography variant="subtitle1">{jobRole}</Typography>
              <Typography variant="subtitle2">
                {location || "Remote"}
              </Typography>
            </>
          }
          sx={{ borderBottom: "1px solid #EAEAEA" }}
          titleTypographyProps={{
            sx: {
              fontSize: "24px",
              fontWeight: 10,
              color: "black",
              fontFamily: "Arial, sans-serif",
            },
          }}
          avatar={
            <img
              src={logoUrl}
              alt={companyName}
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                alignItems: "top",
              }}
            />
          }
        />
        <CardContent>
          <Typography variant="body1" color="initial">
            Estimated Salary: {salaryCurrencyCode}{" "}
            {minJdSalary !== null &&
            minJdSalary !== undefined &&
            maxJdSalary !== null &&
            maxJdSalary !== undefined
              ? `${minJdSalary}-${maxJdSalary}`
              : minJdSalary !== null &&
                minJdSalary !== undefined &&
                (maxJdSalary === null || maxJdSalary === undefined)
              ? `${minJdSalary}-5`
              : maxJdSalary !== null &&
                maxJdSalary !== undefined &&
                (minJdSalary === null || minJdSalary === undefined)
              ? `${maxJdSalary - 5}-${maxJdSalary}`
              : "-"}
            K
          </Typography>
          <Typography variant="body2">About Company:</Typography>
          <Typography variant="body2" color="text.secondary">
            {expanded ? (
              <>
                {jobDetailsFromCompany}
                <Button size="small" onClick={handleExpandClick} style={{}}>
                  Hide
                </Button>
              </>
            ) : (
              `${(jobDetailsFromCompany || "").slice(0, 450)}...`
            )}
          </Typography>
          {!expanded && (
            <Button size="small" onClick={handleExpandClick} style={{}}>
              Show
            </Button>
          )}
          
            <div>
              <Typography variant="body2" color="text.secondary">
                Minimum Experience:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {minExp?minExp:'2'} years
              </Typography>
            </div>
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            onClick={handleApply}
            style={{
              borderRadius: "10px",
              width: "100%",
              justifyContent: "center",
              backgroundColor: "cyan",
              color: "black",
            }}
          >
            Apply
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default JobCard;
