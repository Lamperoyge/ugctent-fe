/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_JOB_BY_ID } from "graphql/queries";
import {
  BellIcon,
  CalendarIcon,
  ChatAltIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { useAuth } from "hooks";
import Link from "next/link";
import StatusChip from "components/StatusChip";
import ViewAttachments from "components/ViewAttachments";
import CreateJobApplication from "components/CreateJobApplication";
import ApplicationsList from "components/ApplicationsList";
import { JOB_STATUS } from "utils/constants";
import CreateSubmission from "components/Submissions";
import SubmissionsList from "components/SubmissionsList";

import {
  CheckIcon,
  CurrencyDollarIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Skills from "../../../src/components/JobsPageComponents/skills";
import Category from "../../../src/components/JobsPageComponents/category";
import Assignee from "../../../src/components/JobsPageComponents/assignee";

export default function ProjectPage() {
  const [isCreateApplicationModalOpen, setIsCreateApplicationModalOpen] =
    useState(false);
  const router = useRouter();
  const { user, isStripeVerified } = useAuth();
  const { data } = useQuery(GET_JOB_BY_ID, {
    variables: {
      id: router.query.jobId,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    skip: !router?.query?.jobId,
  });

  if (!data?.getJobById) return null;

  const job = data?.getJobById;

  const canEdit =
    job?.creator?.userId === user?._id && job?.status === JOB_STATUS.CREATED;

  const canApply =
    job?.creator?.userId !== user?._id &&
    isStripeVerified &&
    job?.status === JOB_STATUS.CREATED;

  const canViewAssignedTask =
    job?.creator?.userId === user?._id || job?.assigneeId === user?._id;

  const canViewAssignedPerson = job?.creator?.userId === user?._id || job?.assigneeId === user?._id;

  const toggleCreateApplicationModal = () => {
    if (job?.userApplication?.hasUserApplied) {
      return router.push(
        `/projects/${job._id}/applications/${job?.userApplication?._id}`,
        undefined,
        { shallow: true }
      );
    } else {
      setIsCreateApplicationModalOpen((prevState) => !prevState);
    }
  };

  const canCompleteJob =
    job?.creator?.userId === user?._id &&
    job?.status === JOB_STATUS.IN_PROGRESS;

  const canArchive =
    job?.creator?.userId === user?._id && job?.status === JOB_STATUS.CREATED;

  // TODO Adrian : refactor, too much code

  return (
    <>
      <CreateJobApplication
        opened={isCreateApplicationModalOpen}
        onClose={toggleCreateApplicationModal}
        job={job}
      />
      <div className="w-full h-full">
        <main className="flex-1">
          <div className="py-8 xl:py-10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3">
              <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
                <div>
                  <div>
                    <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                          {job.title}
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                          created by{" "}
                          <Link
                            href={`/profile/${job.creator?.userId}`}
                            className="font-medium text-gray-900"
                          >
                            {job.creator?.firstName} {job.creator?.lastName}
                          </Link>
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-3 md:mt-0">
                        {canEdit && (
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          >
                            <PencilIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Edit</span>
                          </button>
                        )}
                        {canArchive && (
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 border border-red-400 shadow-sm text-sm font-medium rounded-md text-red-400 bg-white hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
                          >
                            <TrashIcon
                              className="-ml-1 mr-2 h-5 w-5 text-inherit"
                              aria-hidden="true"
                            />
                            <span>Archive</span>
                          </button>
                        )}
                        {canCompleteJob && (
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 border border-green-400 shadow-sm text-sm font-medium rounded-md text-green-400 bg-white hover:bg-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                          >
                            <CheckIcon
                              className="-ml-1 mr-2 h-5 w-5 text-inherit"
                              aria-hidden="true"
                            />
                            <span>Complete</span>
                          </button>
                        )}
                        {canApply && (
                          <button
                            type="button"
                            onClick={toggleCreateApplicationModal}
                            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-bold rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          >
                            <BellIcon
                              className="-ml-1 mr-2 h-5 w-5 text-white-400"
                              aria-hidden="true"
                            />
                            <span>
                              {job?.userApplication?.hasUserApplied
                                ? "View application"
                                : "Apply"}
                            </span>
                          </button>
                        )}
                        {!canApply &&
                          job?.creator?.userId !== user?._id &&
                          job?.status === JOB_STATUS.CREATED && (
                            <button
                              type="button"
                              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-bold rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                              onClick={() =>
                                router.push("/verify", undefined, {
                                  shallow: true,
                                })
                              }
                            >
                              Get verified
                            </button>
                          )}
                      </div>
                    </div>
                    <aside className="mt-8 xl:hidden">
                      <h2 className="sr-only">Details</h2>
                      <div className="space-y-5">
                        <div className="ml-2 flex-shrink-0 flex">
                          <StatusChip status={job.status} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <ChatAltIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="text-gray-900 text-sm font-medium">
                            {job?.applicationsCount || 0} applications
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CalendarIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="text-gray-900 text-sm font-medium">
                            Created on{" "}
                            <time dateTime="2020-12-02">
                              {new Date(
                                parseInt(job.createdAt, 10)
                              ).toLocaleDateString()}
                            </time>
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 border-t border-b border-gray-200 py-6 space-y-8">
                        {canViewAssignedPerson && <Assignee job={job} />}
                        {job?.skills && <Skills job={job} />}
                        {job?.category && <Category job={job} />}
                      </div>
                    </aside>
                    <div className="py-3 xl:pt-6 xl:pb-0 flex flex-col gap-4">
                      <h2 className="sr-only">Description</h2>
                      <div className="prose max-w-none">
                        <span className="text-sm text-gray-500">
                          Description{" "}
                        </span>
                        <p>{job.description}</p>
                      </div>
                      <div className="border-t py-4 flex flex-col gap-4">
                        <span className="text-sm text-gray-500">
                          Attachments{" "}
                        </span>

                        <ViewAttachments attachments={job.attachments} />
                      </div>
                    </div>
                  </div>
                </div>
                {user?._id === job.creator?.userId && !job.assigneeId && (
                  <ApplicationsList jobId={job._id} />
                )}
                <div className="w-full flex justify-center items-start h-fit-content">
                  {user?._id === job?.assigneeId &&
                    user?._id !== job?.creator?._id && (
                      <CreateSubmission jobId={job._id} />
                    )}
                </div>
                {canViewAssignedTask && (
                  <SubmissionsList jobId={job._id} assignee={job.assigneeId} />
                )}
              </div>
              <aside className="hidden xl:block xl:pl-8">
                <h2 className="sr-only">Details</h2>
                <div className="space-y-5">
                  <div className="flex items-center space-x-2">
                    <StatusChip status={job.status} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <ChatAltIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-gray-900 text-sm font-medium">
                      {job?.applicationsCount || 0} applications
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-gray-900 text-sm font-medium">
                      Created on{" "}
                      <time dateTime="2020-12-02">
                        {new Date(parseInt(job.createdAt)).toLocaleDateString()}
                      </time>
                    </span>
                  </div>
                  {job.createdAt !== job.updatedAt && (
                    <div className="flex items-center space-x-2">
                      <CalendarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="text-primaryOrange text-sm font-medium">
                        Last update{" "}
                        <time dateTime="2020-12-02">
                          {new Date(
                            parseInt(job.updatedAt)
                          ).toLocaleDateString()}
                        </time>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <CurrencyDollarIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-gray-900 text-sm font-medium">
                      {[
                        JOB_STATUS.IN_PROGRESS,
                        JOB_STATUS.IN_REVIEW,
                        JOB_STATUS.COMPLETED,
                      ].includes(job?.status)
                        ? "Paid"
                        : "Not paid"}
                    </span>
                    <span className="text-gray-900 text-sm font-medium">
                      {job?.price} RON
                    </span>
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-200 py-6 space-y-8">
                  {canViewAssignedPerson && <Assignee job={job} />}
                  {job.skills && <Skills job={job} />}
                  {job.category && <Category job={job} />}
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
