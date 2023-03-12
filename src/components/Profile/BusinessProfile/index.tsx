import { useState } from "react";

import {
  StarIcon,
  BookmarkIcon,
  UserCircleIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

import PanelContainer from "components/PanelContainer";
import ProfileSection from "../ProfileSection";
import ProfileSectionTitle from "../ProfileSection/ProfileSectionTitle";
import { PROFILE_TABS, PROFILE_SOCIAL_TYPES } from "../../../utils/constants";

const activeTabStyle = "border-b-2 border-orange-500 mb-[-2px]";

const BusinessProfilePage = ({ data }) => {
  const mockData = {
    ...data,
    userInfo: {
      ...data.userInfo,
      city: "Bucharest",
      socialLinks: {
        instagram: "www.google.com",
        facebook: "www.google.com",
        tiktok: "www.google.com",
        youtube: "www.google.com",
        __typename__: "",
      },
    },
  };

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
  } = mockData && mockData.userInfo;

  const [visibleTab, setVisibleTab] = useState(PROFILE_TABS.ABOUT);

  const isAboutVisible = visibleTab === PROFILE_TABS.ABOUT;
  const isWorkVisible = visibleTab === PROFILE_TABS.WORK;

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
    <div className="grid grid-cols-6 grid-rows-5 h-full w-full px-10 xl:px-16 py-10 gap-x-10 2xl:gap-x-14 gap-y-8">
      <PanelContainer extraClassName="flex flex-col justify-center items-center md:row-start-1 md:row-span-2 md:col-start-1 md:col-end-3 col-end-6">
        <h1 className="font-sans font-bold text-3xl">
          {firstName} {lastName}
        </h1>
        <h2 className="text-orange-500 font-semibold">Company</h2>
        <img
          src={profilePicture}
          className="object-cover rounded-full aspect-square overflow-hidden mt-5"
          alt="Profile image of the user"
        />
      </PanelContainer>

      <PanelContainer extraClassName="flex flex-col justify-between w-full row-start-2 md:row-start-1 row-end-2 md:row-span-2 md:col-start-3 md:col-span-6 row-start-2 row-end-2 col-start-1 col-span-6 w-full">
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
          </div>
        </div>
        <ProfileSection title="Contact Information">
          <div className="flex flex-col gap-5">
            <div className="flex text-slate-900">
              <div className="w-16">Website:</div>
              <a
                className="text-orange-500 ml-10"
                target="_blank"
                href={website}
              >
                {website}
              </a>
            </div>

            <div className="flex text-slate-900">
              <div className="w-16">Email:</div>
              <a
                className="text-orange-500 ml-10"
                target="_blank"
                href={website}
              >
                test.test@gmail.com
              </a>
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

      <PanelContainer extraClassName="flex flex-col gap-20 row-start-3 row-end-4 md:row-start-3 md:row-span-5 col-start-1 col-end-3 sm:row-start-3 h-full">
        <ProfileSection hasTitleLine={true} title="Description">
          <p className="text-slate-700">{bio}</p>
        </ProfileSection>
        <ProfileSection hasTitleLine={true} title="Interests">
          <p className="flex flex-col text-sm text-slate-700">
            {skillIds.map((id) => (
              <span>{id}</span>
            ))}
          </p>
        </ProfileSection>
      </PanelContainer>

      <PanelContainer extraClassName="flex flex-col gap-5 row-start-3 row-end-4 md:row-start-3 md:row-span-5 col-start-3 col-span-6 w-full">
        <div className="flex border-solid border-b-2">
          <button
            onClick={() => setVisibleTab(PROFILE_TABS.ABOUT)}
            className={`flex items-center p-3 text-slate-500 ${
              isAboutVisible ? activeTabStyle : ""
            }`}
          >
            <UserCircleIcon className="w-6 h-6 text-slate-500"></UserCircleIcon>
            <span className="text-slate-500 font-semibold text-lg px-2">
              About
            </span>
          </button>

          <button
            onClick={() => setVisibleTab(PROFILE_TABS.WORK)}
            className={`flex items-center p-3 text-slate-500 ${
              isWorkVisible ? activeTabStyle : ""
            }`}
          >
            <MenuIcon className="w-6 h-6" />
            <span className="font-semibold text-lg pl-2">Work</span>
          </button>
        </div>

        {isAboutVisible && (
          <ProfileSection title="Basic Information">
            <p className="text-slate-700">Sal coae</p>
            <div className="flex w-full text-slate-700">
              {city && (
                <span className="flex items-center">
                  <GrLocation className="h-5 w-5"></GrLocation>
                  <span className="pl-1">{city}, </span>
                  {country && <span className="pl-1">{country}</span>}
                </span>
              )}
            </div>
          </ProfileSection>
        )}

        {/* {isWorkVisible && <WorkSection works={works}></WorkSection>} */}
      </PanelContainer>
    </div>
  );
};

export default BusinessProfilePage;
