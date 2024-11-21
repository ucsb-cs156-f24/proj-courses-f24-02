import React from "react";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import userEvent from "@testing-library/user-event";
import JobLogPage from "main/pages/Admin/JobLogPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("JobLogPage tests", () => {
  let queryClient;
  const axiosMock = new AxiosMockAdapter(axios);
  const navigate = jest.fn();

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.adminUser);
    useNavigate.mockReturnValue(navigate);
  });

  test("renders loading state", async () => {
    axiosMock.onGet("/api/jobs?id=1").reply(() => new Promise(() => {}));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/jobs/logs/1"]}>
          <Routes>
            <Route path="/jobs/logs/:id" element={<JobLogPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", async () => {
    axiosMock.onGet("/api/jobs?id=1").reply(404);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/jobs/logs/1"]}>
          <Routes>
            <Route path="/jobs/logs/:id" element={<JobLogPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Error loading log for job 1"),
      ).toBeInTheDocument();
    });
  });

  test("renders job log page successfully", async () => {
    const job = {
      id: 1,
      createdAt: "2022-11-13T19:49:59Z",
      updatedAt: "2022-11-13T19:49:59Z",
      status: "complete",
      log: "Hello World! from test job!\nGoodbye from test job!",
    };
    axiosMock.onGet("/api/jobs?id=1").reply(200, job);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/jobs/logs/1"]}>
          <Routes>
            <Route path="/jobs/logs/:id" element={<JobLogPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText(job.id.toString())).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText(job.status)).toBeInTheDocument();
    });

    const logCell = screen.getByTestId("JobLogTable-cell-row-0-col-Log");
    expect(logCell).toBeInTheDocument();
    const logPre = logCell.querySelector("pre");
    expect(logPre).toBeInTheDocument();
    expect(logPre.textContent).toBe(job.log);
  });

  test("back button works", async () => {
    const job = {
      id: 1,
      createdAt: "2022-11-13T19:49:59Z",
      updatedAt: "2022-11-13T19:49:59Z",
      status: "complete",
      log: "Sample log content",
    };
    axiosMock.onGet("/api/jobs?id=1").reply(200, job);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/jobs/logs/1"]}>
          <Routes>
            <Route path="/jobs/logs/:id" element={<JobLogPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("ID")).toBeInTheDocument();
    });

    const backButton = screen.getByText("Back");
    expect(backButton).toBeInTheDocument();

    await act(async () => {
      userEvent.click(backButton);
    });

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
