import { useEffect, useState } from "react";
import { useJobApplications } from "hooks";
import { classNames } from "utils/helpers";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/solid";
import { JOB_APPLICATION_STATUS, LIMIT } from "utils/constants";
import { LightSpinner } from "components/Shared/Spinner";
import Link from "next/link";

const ApplicationsList = ({ jobId }) => {
  const {
    getJobApplications,
    jobApplications,
    jobApplicationsLoading,
    fetchMoreJobApplications,
    refetchJobApplications,
  } = useJobApplications();
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [status, setStatus] = useState(JOB_APPLICATION_STATUS.IN_REVIEW);
  const tabs = [
    { name: "Pending", count: "", status: JOB_APPLICATION_STATUS.IN_REVIEW },
    { name: "Approved", count: "", status: JOB_APPLICATION_STATUS.ACCEPTED },
    { name: "Rejected", count: "", status: JOB_APPLICATION_STATUS.REJECTED },
  ];

  useEffect(() => {
    getJobApplications({
      variables: {
        limit: LIMIT,
        offset: 0,
        status,
        jobId,
      },
    });
  }, []);

  const handleTabSwitch = (status) => {
    setStatus(status);
    refetchJobApplications({ status, offset: 0 });
  };

  const handleFetchMore = () =>
    fetchMoreJobApplications({
      variables: {
        offset: jobApplications?.getJobApplications?.length,
      },
    });

  return (
    <main className="pt-8 pb-16">
      <div className="w-full mx-auto">
        <div className="">
          <h2 className="text-lg font-medium text-gray-900">
            Job Applications - TODO
          </h2>

          {/* Tabs */}
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              id="tabs"
              name="tabs"
              className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              defaultValue={tabs[0].name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => {
                  const isActive = tab.status === status;
                  return (
                    <button
                      key={tab.name}
                      type="button"
                      onClick={() => handleTabSwitch(tab.status)}
                      className={classNames(
                        isActive
                          ? "border-purple-500 text-purple-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                      )}
                    >
                      {tab.name}
                      {tab.count ? (
                        <span
                          className={classNames(
                            isActive
                              ? "bg-purple-100 text-purple-600"
                              : "bg-gray-100 text-gray-900",
                            "hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                          )}
                        >
                          {tab.count}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Stacked list */}
        <ul
          role="list"
          className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
        >
          {jobApplicationsLoading ? (
            <LightSpinner />
          ) : (
            jobApplications?.getJobApplications?.map((jobApplication) => (
              <li key={jobApplication._id}>
                <Link
                  href={`/projects/${jobId}/applications/${jobApplication._id}`}
                  className="group block"
                >
                  <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0 hover:bg-gray-100 cursor-pointer">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        {jobApplication.creator.profilePicture ? (
                          <img
                            className="h-12 w-12 rounded-full group-hover:opacity-75"
                            src={jobApplication.creator.profilePicture}
                            alt=""
                          />
                        ) : (
                          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="text-sm font-medium text-purple-600 truncate">
                            {jobApplication.creator.firstName +
                              " " +
                              jobApplication.creator.lastName}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="truncate">
                              {jobApplication.message.slice(0.3) + "..."}
                            </span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              Applied on{" "}
                              <time
                                dateTime={
                                  new Date(
                                    parseInt(jobApplication.createdAt, 10)
                                  )
                                }
                              >
                                {new Date(
                                  parseInt(jobApplication.createdAt, 10)
                                ).toLocaleDateString()}
                              </time>
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <CurrencyDollarIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                aria-hidden="true"
                              />
                              {jobApplication.price} RON
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>

        {/* Pagination */}
      </div>
    </main>
  );
};

export default ApplicationsList;
