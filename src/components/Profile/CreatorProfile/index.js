import { useState } from "react";

import {
  StarIcon,
  MapIcon,
  BookmarkIcon,
  UserCircleIcon,
  MenuIcon,
  GlobeIcon,
} from "@heroicons/react/solid";

import PanelContainer from "components/PanelContainer";
import ProfileSection from "./ProfileSection";
import ProfileSectionTitle from "./ProfileSection/ProfileSectionTitle";

const TABS_ENUM = {
  ABOUT: "about",
  WORK: "work",
};

const activeTabStyle = "border-b-2 border-orange-500 mb-[-2px]";

const CreatorProfilePage = ({ data }) => {
  const {
    profilePicture,
    bio,
    firstName,
    lastName,
    city,
    skillIds,
    website,
    socialLinks,
  } = data && data.userInfo;

  const [visibleTab, setVisibleTab] = useState(TABS_ENUM.ABOUT);

  const isAboutVisible = visibleTab === TABS_ENUM.ABOUT;
  const isWorkVisible = visibleTab === TABS_ENUM.WORK;

  return (
    <div className="grid grid-cols-6 grid-rows-5 h-full w-full px-20 py-10 gap-x-20 gap-y-10">
      <PanelContainer extraClassName="flex flex-col justify-center items-center md:row-start-1 md:row-span-2 md:col-start-1 md:col-end-3 col-end-6">
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

      <PanelContainer extraClassName="flex flex-col justify-between w-full row-start-2 md:row-start-1 row-end-2 md:row-span-2 md:col-start-3 md:col-span-6 row-start-2 row-end-2 col-start-1 col-span-6 w-full">
        <div className="flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <ProfileSectionTitle>Rankings</ProfileSectionTitle>
              <div className="flex items-center">
                <span className="text-3xl text-slate-500">8.6</span>
                <div className="flex pl-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <StarIcon
                      className={
                        val !== 5
                          ? "text-orange-500 h-8 w-8"
                          : "text-slate-500 h-8 w-8 opacity-30"
                      }
                    ></StarIcon>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex w-full">
              {city && (
                <span className="flex items-center pl-10">
                  <MapIcon className="h-5 w-5"></MapIcon>
                  <span className="pl-1">{city}</span>
                </span>
              )}
            </div>
            <span className="flex items-center text-slate-300 opacity-90 cursor-pointer">
              <BookmarkIcon className="h-7 w-7"></BookmarkIcon>
              <span className="pl-1">Bookmark</span>
            </span>
          </div>
        </div>
        <ProfileSection title="Contact Information">
          <div class="flex flex-col gap-5">
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
                  (platform) =>
                    socialLinks[platform] && (
                      <a className="ml-2" href={socialLinks[platform]}>
                        <GlobeIcon className="text-slate-600 w-7 h-7"></GlobeIcon>
                      </a>
                    )
                )}
              </div>
            </div>
          </div>
        </ProfileSection>
      </PanelContainer>

      <PanelContainer extraClassName="flex flex-col gap-20 row-start-3 row-end-4 md:row-start-3 md:row-span-5 col-start-1 col-end-3 sm:row-start-3 h-full">
        <ProfileSection hasTitleLine={true} title="Bio">
          <p className="text-slate-700">{bio}</p>
        </ProfileSection>
        <ProfileSection hasTitleLine={true} title="Skills">
          <p className="flex flex-col text-sm text-slate-700">
            {skillIds.map((id) => (
              <span class>{id}</span>
            ))}
          </p>
        </ProfileSection>
      </PanelContainer>

      <PanelContainer extraClassName="flex flex-col gap-5 row-start-3 row-end-4 md:row-start-3 md:row-span-5 col-start-3 col-span-6 w-full">
        <div className="flex border-solid border-b-2">
          <button
            onClick={() => setVisibleTab(TABS_ENUM.ABOUT)}
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
            onClick={() => setVisibleTab(TABS_ENUM.WORK)}
            className={`flex items-center p-3 text-slate-500 ${
              isWorkVisible ? activeTabStyle : ""
            }`}
          >
            <MenuIcon className="w-8 h-8" />
            <span className="font-semibold text-xl pl-2">Work</span>
          </button>
        </div>

        <ProfileSection title="Basic Information">
          <p className="text-slate-700">Sal coae</p>
        </ProfileSection>
      </PanelContainer>
    </div>
  );
};

export default CreatorProfilePage;
