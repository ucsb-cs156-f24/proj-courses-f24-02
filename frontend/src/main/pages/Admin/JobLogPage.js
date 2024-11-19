// import React from "react";
// import { useParams } from "react-router-dom";
// import { useBackend } from "main/utils/useBackend";

// export default function JobLogPage() {
//   const { id } = useParams();

//   const { data: job, error, status } = useBackend(
//     [`/api/jobs/logs/${id}`],
//     {
//       method: "GET",
//       url: `/api/jobs/logs/${id}`,
//     }
//   );

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading log for job {id}</div>;
//   }

//   return (
//     <div>
//       <h2>Job Log: {id}</h2>
//       <textarea readOnly rows={20} cols={80} value={job?.log || "No log available"} />
//     </div>
//   );
// }
import React from "react";
import { useParams } from "react-router-dom";
import { useBackend } from "main/utils/useBackend";

export default function JobLogPage() {
  const { id } = useParams();

  const { data: job, error, status } = useBackend(
    [`/api/jobs/logs/${id}`],
    {
      method: "GET",
      url: `/api/jobs/logs/${id}`,
    }
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error || !job) {
    return <div>Error loading log for job {id}</div>;
  }

  return (
    <div>
      <h2>Job Log: {id}</h2>
      <textarea
        readOnly
        rows={20}
        cols={80}
        value={job.log || "No log available"}
        style={{ width: "100%" }}
        data-testid="job-log-textarea"
      />
    </div>
  );
}
