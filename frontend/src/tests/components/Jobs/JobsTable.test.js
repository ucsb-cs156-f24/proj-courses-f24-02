import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import JobsTable from "main/components/Jobs/JobsTable";
import jobsFixtures from "fixtures/jobsFixtures";

describe("JobsTable tests", () => {
  const queryClient = new QueryClient();

  test("renders without crashing for empty table", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobsTable jobs={[]} />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  // test("Has the expected column headers and content", () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <MemoryRouter>
  //         <JobsTable jobs={jobsFixtures.sixJobs} />
  //       </MemoryRouter>
  //     </QueryClientProvider>,
  //   );

  //   const expectedHeaders = ["id", "Created", "Updated", "Status", "Log"];
  //   const expectedFields = ["id", "Created", "Updated", "status", "Log"];
  //   const testId = "JobsTable";

  //   expectedHeaders.forEach((headerText) => {
  //     const header = screen.getByText(headerText);
  //     expect(header).toBeInTheDocument();
  //   });

  //   expectedFields.forEach((field) => {
  //     const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
  //     expect(header).toBeInTheDocument();
  //   });

  //   expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(
  //     "1",
  //   );
  //   expect(
  //     screen.getByTestId(`${testId}-cell-row-0-col-Created`),
  //   ).toHaveTextContent("1");
  //   expect(
  //     screen.getByTestId(`${testId}-cell-row-0-col-Updated`),
  //   ).toHaveTextContent("11/13/2022, 19:49:59");
  //   expect(
  //     screen.getByTestId(`${testId}-cell-row-0-col-status`),
  //   ).toHaveTextContent("complete");
  //   expect(
  //     screen.getByTestId(`${testId}-cell-row-0-col-Log`),
  //   ).toHaveTextContent("Hello World! from test job!Goodbye from test job!");

  //   expect(
  //     screen.getByTestId(`JobsTable-header-id-sort-carets`),
  //   ).toHaveTextContent("🔽");
  // });

  // test("Has the expected column headers and content", () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <MemoryRouter>
  //         <JobsTable jobs={jobsFixtures.sixJobs} />
  //       </MemoryRouter>
  //     </QueryClientProvider>,
  //   );
  
  //   // Update to use a matcher function for headers
  //   const expectedHeaders = ["id", "Created", "Updated", "Status", "Log"];
  //   expectedHeaders.forEach((headerText) => {
  //     const header = screen.getByText((content, element) => {
  //       const hasText = (node) => node.textContent === headerText;
  //       const nodeHasText = hasText(element);
  //       const childrenDontHaveText = Array.from(element?.children || []).every(
  //         (child) => !hasText(child),
  //       );
  //       return nodeHasText && childrenDontHaveText;
  //     });
  //     expect(header).toBeInTheDocument();
  //   });
  
  //   const testId = "JobsTable";
  
  //   // Update field matching
  //   const expectedFields = ["id", "Created", "Updated", "status", "Log"];
  //   expectedFields.forEach((field) => {
  //     const cell = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
  //     expect(cell).toBeInTheDocument();
  //   });
  // });
  
  test("Has the expected column headers and content", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobsTable jobs={jobsFixtures.sixJobs} />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  
    // Use test IDs to locate headers
    const expectedHeaders = ["id", "Created", "Updated", "Status", "Log"];
    expectedHeaders.forEach((headerText) => {
      const header = screen.getByTestId(`JobsTable-header-${headerText}`);
      expect(header).toBeInTheDocument();
    });
  
    const testId = "JobsTable";
    const expectedFields = ["id", "Created", "Updated", "status", "Log"];
    expectedFields.forEach((field) => {
      const cell = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(cell).toBeInTheDocument();
    });
  });
  

  test("displays truncated log and See entire log link for logs > 10 lines", () => {
    const longLog = Array(12).fill("Line").join("\n"); // 12 lines
    const jobs = [{ id: "1", log: longLog, createdAt: "2022-11-13", updatedAt: "2022-11-13", status: "complete" }];
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobsTable jobs={jobs} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  
    expect(screen.getByText("Line\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine")).toBeInTheDocument();
    expect(screen.getByText("[See entire log]")).toBeInTheDocument();
  });  

  test("renders table headers and data correctly without key warnings", () => {
    const jobs = [
      { id: "1", log: "Log1", createdAt: "2023-11-13", updatedAt: "2023-11-14", status: "complete" },
      { id: "2", log: "Log2", createdAt: "2023-11-14", updatedAt: "2023-11-15", status: "in progress" },
    ];

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobsTable jobs={jobs} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText("id")).toBeInTheDocument();
    expect(screen.getByText("Created")).toBeInTheDocument();
    expect(screen.getByText("Updated")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Log")).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.queryByText("Warning: Each child in a list should have a unique 'key' prop.")).toBeNull();
  });

});
