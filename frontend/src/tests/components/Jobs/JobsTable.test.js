import { render, screen, fireEvent } from "@testing-library/react";
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

  test("Has the expected column headers and content", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobsTable jobs={jobsFixtures.sixJobs} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const expectedHeaders = ["ID", "Created", "Updated", "Status", "Log"];
    expectedHeaders.forEach((headerText) => {
      expect(screen.getByText(headerText)).toBeInTheDocument();
    });

    const testId = "JobsTable";
    const job = jobsFixtures.sixJobs[0];
    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(
      job.id,
    );
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-status`),
    ).toHaveTextContent(job.status);
  });

  test("displays truncated log and See entire log link for logs > 10 lines", () => {
    const longLog = Array(12).fill("Line").join("\n");
    const jobs = [
      {
        id: "1",
        log: longLog,
        createdAt: "2022-11-13",
        updatedAt: "2022-11-13",
        status: "complete",
      },
    ];

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobsTable jobs={jobs} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const truncatedLog = Array(10).fill("Line").join("\n");
    expect(
      screen.getByText((content, node) => {
        const hasText = (node) => node.textContent === truncatedLog;
        const nodeMatches = hasText(node);
        const childrenDoNotMatch = Array.from(node.children || []).every(
          (child) => !hasText(child),
        );
        return nodeMatches && childrenDoNotMatch;
      }),
    ).toBeInTheDocument();

    const link = screen.getByTestId("JobsTable-log-link-1");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("[See entire log]");
    expect(link).toHaveAttribute("href", "/admin/jobs/logs/1");
  });

  test("renders table headers and data correctly without key warnings", () => {
    const jobs = [
      {
        id: "1",
        log: "Log1",
        createdAt: "2023-11-13",
        updatedAt: "2023-11-14",
        status: "complete",
      },
      {
        id: "2",
        log: "Log2",
        createdAt: "2023-11-14",
        updatedAt: "2023-11-15",
        status: "in progress",
      },
    ];

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobsTable jobs={jobs} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const expectedHeaders = ["ID", "Created", "Updated", "Status", "Log"];
    expectedHeaders.forEach((headerText) => {
      expect(screen.getByText(headerText)).toBeInTheDocument();
    });

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Log1")).toBeInTheDocument();
    expect(screen.getByText("Log2")).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Warning: Each child in a list should have a unique 'key' prop.",
      ),
    ).toBeNull();
  });

  test("renders correctly with no logs available", () => {
    const jobs = [
      {
        id: "1",
        log: null,
        createdAt: "2023-11-13",
        updatedAt: "2023-11-14",
        status: "complete",
      },
    ];

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobsTable jobs={jobs} />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });
});
