// import React from "react";
// import OurTable, {
//   PlaintextColumn,
//   DateColumn,
// } from "main/components/OurTable";

// export default function JobsTable({ jobs }) {
//   const testid = "JobsTable";

//   const columns = [
//     {
//       Header: "id",
//       accessor: "id", // accessor is the "key" in the data
//     },
//     DateColumn("Created", (cell) => cell.row.original.createdAt),
//     DateColumn("Updated", (cell) => cell.row.original.updatedAt),
//     {
//       Header: "Status",
//       accessor: "status",
//     },
//     PlaintextColumn("Log", (cell) => cell.row.original.log),
//   ];

//   const sortees = React.useMemo(
//     () => [
//       {
//         id: "id",
//         desc: true,
//       },
//     ],
//     // Stryker disable next-line all
//     [],
//   );

//   return (
//     <OurTable
//       data={jobs}
//       columns={columns}
//       testid={testid}
//       initialState={{ sortBy: sortees }}
//     />
//   );
// }

// import React from "react";
// import { Link } from "react-router-dom";
// import OurTable, {
//   PlaintextColumn,
//   DateColumn,
// } from "main/components/OurTable";

// export default function JobsTable({ jobs }) {
//   const testid = "JobsTable";

//   const formatLog = (log, jobId) => {
//     const logText = typeof log === "string" ? log : String(log);
//     const lines = logText.split("\n");
//     if (lines.length <= 10) {
//       return lines.join("\n");
//     } else {
//       const firstTenLines = lines.slice(0, 10).join("\n");
//       return (
//         <>
//           {firstTenLines}
//           <br />
//           <span>...</span>
//           <br />
//           <Link to={`/admin/jobs/logs/${jobId}`}>[See entire log]</Link>
//         </>
//       );
//     }
//   };
  

//   const columns = [
//     {
//       Header: "id",
//       accessor: "id", // accessor is the "key" in the data
//     },
//     DateColumn("Created", (cell) => cell.row.original.createdAt),
//     DateColumn("Updated", (cell) => cell.row.original.updatedAt),
//     {
//       Header: "Status",
//       accessor: "status",
//     },
//     PlaintextColumn("Log", (cell) => formatLog(cell.row.original.log, cell.row.original.id)),
//   ];

//   const sortees = React.useMemo(
//     () => [
//       {
//         id: "id",
//         desc: true,
//       },
//     ],
//     // Stryker disable next-line all
//     [],
//   );

//   return (
//     <OurTable
//       data={jobs}
//       columns={columns}
//       testid={testid}
//       initialState={{ sortBy: sortees }}
//     />
//   );
// }
//<Link to={`/admin/jobs/logs/${jobId}`} data-testid={`${testid}-log-link-${jobId}`}></Link>
import React from "react";
import { Link } from "react-router-dom";
import OurTable, {
  DateColumn,
  CustomComponentColumn,
} from "main/components/OurTable";

export default function JobsTable({ jobs }) {
  const testid = "JobsTable";

  const formatLog = (log, jobId) => {
    const logText = typeof log === "string" ? log : String(log);
    const lines = logText.split("\n");

    if (lines.length <= 10) {
      return <pre>{lines.join("\n")}</pre>;
    } else {
      const firstTenLines = lines.slice(0, 10).join("\n");
      return (
        <div>
          <pre>{firstTenLines}</pre>
          <span>...</span>
          <br />
          <Link to={`/admin/jobs/logs/${jobId}`} data-testid={`JobsTable-log-link-${jobId}`}>
            [See entire log]
          </Link>
        </div>
      );
    }
  };

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
    CustomComponentColumn("Log", (cell) =>
      formatLog(cell.row.original.log, cell.row.original.id)
    ),
  ];

  const sortees = React.useMemo(
    () => [
      {
        id: "id",
        desc: true,
      },
    ],
    []
  );

  return (
    <OurTable
      data={jobs}
      columns={columns}
      testid={testid}
      initialState={{ sortBy: sortees }}
    />
  );
}
