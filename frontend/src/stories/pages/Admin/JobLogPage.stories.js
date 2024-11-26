import React from "react";

import JobLogPage from "main/pages/Admin/JobLogPage";
import jobsFixtures from "fixtures/jobsFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { toast } from "react-toastify";
import { http, HttpResponse } from "msw";

export default {
  title: "pages/Admin/JobLogPage",
  component: JobLogPage,
};

const Template = () => <JobLogPage />;

export const Default = Template.bind({});
Default.parameters = {
  msw: [
    http.get("/api/jobs", (req) => {
      const jobId = req.url.searchParams.get("id");
      const job = jobsFixtures.sixJobs.find(
        (j) => j.id === parseInt(jobId, 10),
      );
      if (job) {
        return HttpResponse.json(job, { status: 200 });
      } else {
        return HttpResponse.json({ message: "Job not found" }, { status: 404 });
      }
    }),
    http.get("/api/currentUser", () => {
      return HttpResponse.json(apiCurrentUserFixtures.adminUser, {
        status: 200,
      });
    }),
    http.post("/logout", ({ request }) => {
      toast(`Generated: ${request.method} ${request.url}`);
      return HttpResponse.json({}, { status: 200 });
    }),
  ],
};
