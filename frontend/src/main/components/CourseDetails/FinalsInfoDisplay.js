import React from "react";
import OurTable from "main/components/OurTable";
export default function FinalsInfoDisplay({finals}) {
    const columns = [
        {
          Header: "HasFinals",
          accessor: "hasFinals",
        },
        {
          Header: "Comments",
          accessor: "comments",
        },
        {
          Header: "ExamDay",
          accessor: "examDay",
        },
        {
          Header: "ExamDate",
          accessor: "examDate",
        },
        {
          Header: "BeginTime",
          accessor: "beginTime",
        },
        {
          Header: "EndTime",
          accessor: "endTime"
        },
      ];
    
      const testid = "FinalsInfoDisplay";
    
      const columnsToDisplay = columns;
    
      return <OurTable data={finals} columns={columnsToDisplay} testid={testid} />;
}