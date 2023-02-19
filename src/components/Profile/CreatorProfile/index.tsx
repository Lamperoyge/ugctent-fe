import { useState } from "react";
import { useGetSkills } from "hooks";

import { StarIcon, UserCircleIcon, MenuIcon } from "@heroicons/react/solid";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

import PanelContainer from "components/PanelContainer";
import SocialLinks from "components/Shared/Form/SocialLinks";
import ProfileSection from "../ProfileSection";
import ProfileSectionTitle from "../ProfileSection/ProfileSectionTitle";
import WorkSection from "./WorkSection";
import { PROFILE_SOCIAL_TYPES, PROFILE_TABS } from "utils/constants";
import EditableSection from "../EditableSection";

const activeTabStyle = "border-b-2 border-orange-500 mb-[-2px]";

const CreatorProfilePage = ({ data, values, handleChange, isEditMode }) => {
  // console.log(data);
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

  const { skills } = useGetSkills();
  const [activeTab, setActiveTab] = useState(PROFILE_TABS.ABOUT);

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

  const mapUserSkills = () =>
    skills.filter((skill) => skillIds.find((skillId) => skill._id === skillId));

  return (
    <div className="flex flex-col h-full w-full px-10 xl:px-16 py-10 gap-x-10 lg:gap-x-1 2xl:gap-x-14 gap-y-8">
      <div className="flex flex-col lg:flex-row justify-between w-full gap-y-10 lg:gap-x-10">
        <PanelContainer extraClassName="flex flex-1 flex-col justify-center items-center">
          <h1 className="font-sans font-semibold text-3xl">
            {firstName} {lastName}
          </h1>
          <h2 className="text-orange-500 font-medium">Product Designer</h2>
          <img
            src={profilePicture}
            className="max-w-1/1.3 xl:max-w-1/2 object-cover rounded-full aspect-square overflow-hidden mt-5"
            alt="Profile image of the user"
          />
        </PanelContainer>

        <PanelContainer extraClassName="flex flex-1 basis-1/3 flex-col justify-between">
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
              <div className="flex items-center text-slate-900">
                <div className="w-16 mr-6">Website:</div>
                <EditableSection
                  inputProps={{
                    type: "text",
                    name: "website",
                    value: values.website,
                    onChange: handleChange,
                    id: "website",
                    autoComplete: "Website",
                    className:
                      "mt-1 focus:ring-secondary focus:border-secondary block w-1/2 shadow-sm sm:text-sm border-gray-300 rounded-md",
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
                <div className="w-16 mr-6">Email:</div>
                <EditableSection
                  inputProps={{
                    type: "text",
                    name: "email",
                    value: values.email,
                    onChange: handleChange,
                    id: "email",
                    autoComplete: "Email",
                    className:
                      "mt-1 focus:ring-secondary focus:border-secondary block w-1/2 shadow-sm sm:text-sm border-gray-300 rounded-md",
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
                <div className="w-16 mr-6">Platforms:</div>
                {isEditMode && (
                  <SocialLinks
                    onChange={handleChange}
                    values={values}
                    name="socialLinks"
                  />
                )}
                {!isEditMode && (
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
                )}
              </div>
            </div>
          </ProfileSection>
        </PanelContainer>
      </div>

      <div className="flex flex-col lg:flex-row justify-between w-full gap-y-10 lg:gap-x-10">
        <PanelContainer extraClassName="flex flex-1 flex-col gap-20 h-full">
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
            <ul className="flex flex-wrap">
              {skills?.length &&
                mapUserSkills().map((skill) => (
                  <li
                    className="flex items-center border rounded-full py-1 px-3 text-xs mr-2 mb-2 font-semibold text-white bg-primaryOrange items-center"
                    key={skill._id}
                  >
                    <span className="block truncate">{skill.label}</span>
                  </li>
                ))}
            </ul>
          </ProfileSection>
        </PanelContainer>

        <PanelContainer extraClassName="flex flex-1 basis-1/3 flex-col gap-5">
          <div className="flex border-solid border-b-2">
            <button
              type="button"
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
              type="button"
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
            <ProfileSection title="Basic Information" classNames="gap-3">
              <div className="flex items-center text-slate-900 w-full">
                <div className="w-16 mr-4">City:</div>
                <EditableSection
                  inputProps={{
                    type: "text",
                    name: "city",
                    value: values.city,
                    onChange: handleChange,
                    id: "city",
                    autoComplete: "Your city",
                    className:
                      "mt-1 focus:ring-secondary focus:border-secondary block w-1/2 shadow-sm sm:text-sm border-gray-300 rounded-md",
                  }}
                  isEditMode={isEditMode}
                  type="input"
                >
                  {city ? <span className="pl-1">{city}, </span> : "-"}
                </EditableSection>
              </div>

              <div className="flex items-center text-slate-900 w-full">
                <div className="w-16 mr-6">Country:</div>
                <EditableSection
                  inputProps={{
                    type: "text",
                    name: "country",
                    value: values.country,
                    onChange: handleChange,
                    id: "country",
                    autoComplete: "Your country",
                    className:
                      "mt-1 focus:ring-secondary focus:border-secondary block w-1/2 shadow-sm sm:text-sm border-gray-300 rounded-md",
                  }}
                  isEditMode={isEditMode}
                  type="input"
                >
                  {country ? (
                    <span className="text-slate-700">{country}</span>
                  ) : (
                    "-"
                  )}
                </EditableSection>
              </div>
            </ProfileSection>
          )}

          {isWorkVisible && <WorkSection works={works}></WorkSection>}
        </PanelContainer>
      </div>
    </div>
  );
};

export default CreatorProfilePage;
