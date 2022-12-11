import { useState } from "react";

import {
  StarIcon,
  MapIcon,
  UserCircleIcon,
  MenuIcon,
  XCircleIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

import PanelContainer from "components/PanelContainer";
import ProfileSection from "../ProfileSection";
import ProfileSectionTitle from "../ProfileSection/ProfileSectionTitle";
import WorkSection from "./WorkSection";
import { PROFILE_SOCIAL_TYPES, PROFILE_TABS } from "utils/constants";
import EditableSection from "../EditableSection";

const activeTabStyle = "border-b-2 border-orange-500 mb-[-2px]";

const CreatorProfilePage = ({ data, values, setFieldValue, handleChange }) => {
  const mockData = {
    ...data,
    userInfo: {
      ...data.userInfo,
      socialLinks: {
        instagram: "www.google.com",
        facebook: "www.google.com",
        tiktok: "www.google.com",
        youtube: "www.google.com",
        __typename__: "",
      },
      works: [
        {
          company: "Amazon",
          jobTitle: "Product Manager",
          startDate: "01/07/2020",
          endDate: "01/10/2022",
          jobDescription: "Cea mai misto firma smr",
        },
        {
          company: "Amazon",
          jobTitle: "Product Manager",
          startDate: "01/07/2020",
          endDate: "01/10/2022",
          jobDescription:
            "Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma sm Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma sm Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma sm Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smCea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr",
        },
        {
          company: "Amazon",
          jobTitle: "Product Manager",
          startDate: "01/07/2020",
          endDate: "01/10/2022",
          jobDescription:
            "Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma sm Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma sm Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma sm Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smCea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr",
        },
        {
          company: "Amazon",
          jobTitle: "Product Manager",
          startDate: "01/07/2020",
          endDate: "01/10/2022",
          jobDescription:
            "Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma sm Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma sm Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma sm Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smCea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr Cea mai misto firma smr",
        },
      ],
    },
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const {
    profilePicture,
    bio,
    firstName,
    lastName,
    city,
    country,
    skillIds,
    website,
    socialLinks,
    works,
    email,
  } = mockData && mockData.userInfo;

  const [activeTab, setActiveTab] = useState(PROFILE_TABS.ABOUT);

  const isAboutVisible = activeTab === PROFILE_TABS.ABOUT;
  const isWorkVisible = activeTab === PROFILE_TABS.WORK;

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case PROFILE_SOCIAL_TYPES.FACEBOOK:
        return <FaFacebook className="text-slate-600 w-7 h-7"></FaFacebook>;
      case PROFILE_SOCIAL_TYPES.INSTAGRAM:
        return <FaInstagram className="text-slate-600 w-7 h-7"></FaInstagram>;
      case PROFILE_SOCIAL_TYPES.TIKTOK:
        return <FaTiktok className="text-slate-600 w-7 h-7"></FaTiktok>;
      case PROFILE_SOCIAL_TYPES.YOUTUBE:
        return <FaYoutube className="text-slate-600 w-7 h-7"></FaYoutube>;
      default:
        return;
    }
  };

  return (
    <div className="grid grid-cols-6 grid-rows-profileLayoutMobile lg:grid-rows-profileLayout h-full w-full px-10 xl:px-16 py-10 gap-x-10 lg:gap-x-1 2xl:gap-x-14 gap-y-8">
      <PanelContainer extraClassName="flex flex-col justify-center items-center row-start-1 row-span-2 col-start-1 col-span-6 lg:row-start-1 lg:row-span-2 lg:col-start-1 lg:col-span-2">
        <h1 className="font-sans font-semibold text-3xl">
          {firstName} {lastName}
        </h1>
        <h2 className="text-orange-500 font-medium">Product Designer</h2>
        <img
          src={profilePicture}
          className="object-cover rounded-full aspect-square overflow-hidden mt-5"
          alt="Profile image of the user"
        />
      </PanelContainer>

      <PanelContainer extraClassName="flex flex-col justify-between w-full row-start-5 row-span-2 col-start-1 col-span-6 lg:row-start-1 lg:row-span-2 lg:col-start-3 lg:col-span-4 w-full">
        <div className="flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <ProfileSectionTitle>Rankings</ProfileSectionTitle>
              <div className="flex items-center">
                <span className="text-xl text-slate-500">8.6</span>
                <div className="flex pl-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <StarIcon
                      className={
                        val !== 5
                          ? "text-orange-500 h-6 w-6"
                          : "text-slate-500 h-6 w-6 opacity-30"
                      }
                    ></StarIcon>
                  ))}
                </div>
              </div>
            </div>

            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                type="button"
                className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <PencilIcon className="h-5 w-5 mr-2"></PencilIcon> Edit
              </button>
            )}

            {isEditMode && (
              <button
                onClick={() => setIsEditMode(false)}
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <XCircleIcon className="h-5 w-5 mr-2"></XCircleIcon> Cancel
              </button>
            )}
          </div>
        </div>
        <ProfileSection title="Contact Information">
          <div className="flex flex-col gap-5">
            <div className="flex items-center text-slate-900">
              <div className="w-16">Website:</div>
              <EditableSection
                inputProps={{
                  type: "text",
                  name: "website",
                  value: values.website,
                  onChange: handleChange,
                  id: "website",
                  autoComplete: "Website",
                  className:
                    "mt-1 ml-4 focus:ring-secondary focus:border-secondary block w-1/2 shadow-sm sm:text-sm border-gray-300 rounded-md",
                }}
                isEditMode={isEditMode}
                type="input"
              >
                <a
                  className="text-orange-500 ml-10"
                  target="_blank"
                  href={website}
                >
                  {website}
                </a>
              </EditableSection>
            </div>

            <div className="flex items-center text-slate-900">
              <div className="w-16">Email:</div>
              <EditableSection
                inputProps={{
                  type: "text",
                  name: "email",
                  value: values.email,
                  onChange: handleChange,
                  id: "email",
                  autoComplete: "Email",
                  className:
                    "mt-1 ml-4 focus:ring-secondary focus:border-secondary block w-1/2 shadow-sm sm:text-sm border-gray-300 rounded-md",
                }}
                isEditMode={isEditMode}
                type="input"
              >
                <a
                  className="text-orange-500 ml-10"
                  target="_blank"
                  href={email}
                >
                  test.test@gmail.com
                </a>
              </EditableSection>
            </div>

            <div className="flex text-slate-900">
              <div className="w-16">Platforms:</div>
              <div className="flex ml-10">
                {Object.keys(socialLinks).map(
                  (platform, idx) =>
                    socialLinks[platform] && (
                      <a
                        target="_blank"
                        className={`${idx === 0 ? "ml-0" : "ml-5"}`}
                        href={socialLinks[platform]}
                      >
                        {getPlatformIcon(platform)}
                      </a>
                    )
                )}
              </div>
            </div>
          </div>
        </ProfileSection>
      </PanelContainer>

      <PanelContainer extraClassName="flex flex-col gap-20 row-start-3 row-span-2 col-start-1 col-span-6 lg:col-span-2 lg:row-start-3 lg:row-span-5 h-full">
        <ProfileSection hasTitleLine={true} title="Bio">
          <EditableSection
            inputProps={{
              type: "text",
              name: "bio",
              value: values.bio,
              onChange: handleChange,
              id: "bio",
              autoComplete: "Your description",
              className:
                "mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md",
            }}
            isEditMode={isEditMode}
            type="input"
          >
            <p className="text-slate-700">{bio}</p>
          </EditableSection>
        </ProfileSection>
        <ProfileSection hasTitleLine={true} title="Skills">
          <p className="flex flex-col text-sm text-slate-700">
            {skillIds.map((id) => (
              <span class>{id}</span>
            ))}
          </p>
        </ProfileSection>
      </PanelContainer>

      <PanelContainer extraClassName="flex flex-col gap-5 row-start-8 row-span-3 col-start-1 col-span-6 lg:col-start-3 lg:col-span-4 lg:row-start-3 lg:row-span-5 w-full">
        <div className="flex border-solid border-b-2">
          <button
            onClick={() => setActiveTab(PROFILE_TABS.ABOUT)}
            className={`flex items-center p-3 text-slate-500 ${
              isAboutVisible ? activeTabStyle : ""
            }`}
          >
            <UserCircleIcon className="w-8 h-8 text-slate-500"></UserCircleIcon>
            <span className="text-slate-500 font-semibold text-xl px-2">
              About
            </span>
          </button>

          <button
            onClick={() => setActiveTab(PROFILE_TABS.WORK)}
            className={`flex items-center p-3 text-slate-500 ${
              isWorkVisible ? activeTabStyle : ""
            }`}
          >
            <MenuIcon className="w-8 h-8" />
            <span className="font-semibold text-xl pl-2">Work</span>
          </button>
        </div>

        {isAboutVisible && (
          <ProfileSection title="Basic Information">
            <div className="flex items-center text-slate-900 w-full">
              <div className="w-30 mr-4">City and Country:</div>
              <EditableSection
                inputProps={{
                  type: "text",
                  name: "country",
                  value: values.city,
                  onChange: handleChange,
                  id: "country",
                  autoComplete: "Your Country",
                  className:
                    "mt-1 focus:ring-secondary focus:border-secondary block w-1/2 shadow-sm sm:text-sm border-gray-300 rounded-md",
                }}
                isEditMode={isEditMode}
                type="input"
              >
                {city && <span className="pl-1">{city}, </span>}
                {country && <span className="text-slate-700">{country}</span>}
              </EditableSection>
            </div>
          </ProfileSection>
        )}

        {isWorkVisible && <WorkSection works={works}></WorkSection>}
      </PanelContainer>
    </div>
  );
};

export default CreatorProfilePage;
