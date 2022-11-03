import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../features/jobs/alljobsSlice";
import Job from "./Job";

const JobsContainer = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, totalJobs } = useSelector((store) => store.allJobs);

  React.useEffect(() => {
    dispatch(getAllJobs());
  }, []);
  if (isLoading) {
    return (
      <section className="section-control">
        <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
          Loading...
        </h3>
      </section>
    );
  }

  if (jobs.length < 1) {
    return (
      <section className="section-control">
        <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
          No jobs to display...
        </h3>
      </section>
    );
  }
  return (
    <section className="section-control">
      <h5> {totalJobs} job(s) found</h5>
      {jobs.length > 0 && (
        <div className="jobs-container">
          {jobs.map((item) => (
            <Job key={item._id} {...item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default JobsContainer;
