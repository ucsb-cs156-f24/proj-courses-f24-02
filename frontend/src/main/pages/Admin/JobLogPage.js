import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBackend } from "main/utils/useBackend";
import OurTable, {
  DateColumn,
  CustomComponentColumn,
} from "main/components/OurTable";

export default function JobLogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: job,
    error,
    status,
  } = useBackend(["getJob", id], {
    method: "GET",
    url: `/api/jobs?id=${id}`,
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error || !job) {
    return <div>Error loading log for job {id}</div>;
  }

  if (status === "error") {
    return <div>Error loading log for job {id}</div>;
  }

  const jobData = [job];

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
      <OurTable data={jobData} columns={columns} testid="JobLogTable" />
    </div>
  );
}
