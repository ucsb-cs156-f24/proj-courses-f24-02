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

//d
// import React from "react";
// import { useParams } from "react-router-dom";
// import { useBackend } from "main/utils/useBackend";

// export default function JobLogPage() {
//   const { id } = useParams();


//   const { data: job, error, status } = useBackend(
//     [`/api/jobs?id=${id}`], // Match the Swagger endpoint with query parameter
//     {
//       method: "GET",
//       url: `/api/jobs?id=${id}`, // Correct endpoint format
//     }
//   );  

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (error || !job) {
//     return <div>Error loading log for job {id}</div>;
//   }

//   return (
//     <div>
//       <h2>Job Log: {id}</h2>
//       <textarea
//         readOnly
//         rows={20}
//         cols={80}
//         value={job.log || "No log available"}
//         style={{ width: "100%" }}
//         data-testid="job-log-textarea"
//       />
//     </div>
//   );
// }
//good
// import React from "react";
// import { useParams } from "react-router-dom";
// import { useBackend } from "main/utils/useBackend";
// import OurTable, { DateColumn, CustomComponentColumn } from "main/components/OurTable";

// export default function JobLogPage() {
//   const { id } = useParams();

//   const { data: job, error, status } = useBackend(
//     [`/api/jobs?id=${id}`],
//     {
//       method: "GET",
//       url: `/api/jobs?id=${id}`,
//     }
//   );

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (error || !job) {
//     return <div>Error loading log for job {id}</div>;
//   }

//   // Transform the single job object into an array for the table
//   const jobData = [job];

//   // Define the columns for the table
//   const columns = [
//     {
//       Header: "ID",
//       accessor: "id",
//     },
//     DateColumn("Created", (cell) => cell.row.original.createdAt),
//     DateColumn("Updated", (cell) => cell.row.original.updatedAt),
//     {
//       Header: "Status",
//       accessor: "status",
//     },
//     CustomComponentColumn("Log", (cell) => (
//       <pre>{cell.row.original.log || "No log available"}</pre>
//     )),
//   ];

//   return (
//     <div>
//       <OurTable
//         data={jobData}
//         columns={columns}
//         testid="JobLogTable"
//       />
//     </div>
//   );
// }

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBackend } from "main/utils/useBackend";
import OurTable, { DateColumn, CustomComponentColumn } from "main/components/OurTable";

export default function JobLogPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to navigate programmatically

  const { data: job, error, status } = useBackend(
    [`/api/jobs?id=${id}`],
    {
      method: "GET",
      url: `/api/jobs?id=${id}`,
    }
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error || !job) {
    return <div>Error loading log for job {id}</div>;
  }

  // Transform the single job object into an array for the table
  const jobData = [job];

  // Define the columns for the table
  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    DateColumn("Created", (cell) => cell.row.original.createdAt),
    DateColumn("Updated", (cell) => cell.row.original.updatedAt),
    {
      Header: "Status",
      accessor: "status",
    },
    CustomComponentColumn("Log", (cell) => (
      <pre>{cell.row.original.log || "No log available"}</pre>
    )),
  ];

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <OurTable
        data={jobData}
        columns={columns}
        testid="JobLogTable"
      />
    </div>
  );
}
