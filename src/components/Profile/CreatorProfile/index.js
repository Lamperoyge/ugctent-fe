import {
  StarIcon,
  MapIcon,
  BookmarkIcon,
  ChatIcon,
  UserCircleIcon,
  MenuIcon,
  GlobeIcon,
} from "@heroicons/react/solid";

import ProfileSection from "./ProfileSection";
import ProfileSectionTitle from "./ProfileSection/ProfileSectionTitle";

const CreatorProfilePage = ({ data }) => {
  console.log(data);
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
  console.log(Object.keys(socialLinks));
  return (
    <div className="grid grid-cols-5 grid-rows-2 h-full w-full px-20 py-10 gap-x-20 gap-y-10">
      <img
        src={profilePicture}
        className="w-full h-full object-cover row-start-1 row-end-1 col-start-1 col-end-3"
        alt="Profile image of the user"
      />
      <div className="flex flex-col justify-between w-full row-start-1 row-end-1 col-start-3 col-span-5 w-full">
        <div className="flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex w-full">
              <h1 className="font-sans font-semibold text-4xl">
                {firstName} {lastName}
              </h1>
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

          <h2 className="text-orange-500 font-medium">Product Designer</h2>
        </div>

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

        <button className="flex items-center">
          <ChatIcon className="w-8 h-8 text-slate-500"></ChatIcon>
          <span className="text-slate-500 font-semibold text-base pl-2">
            Send message
          </span>
        </button>

        <div className="flex border-solid border-b-2">
          <button className="flex items-center border-b-2 border-orange-500 px-3">
            <UserCircleIcon className="w-8 h-8 text-slate-500"></UserCircleIcon>
            <span className="text-slate-500 font-semibold text-xl px-2">
              About
            </span>
          </button>

          <button className="flex items-center py-2 ml-8 text-slate-500 opacity-50">
            <MenuIcon className="w-8 h-8" />
            <span className="font-semibold text-xl pl-2">Work</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-20 row-start-2 row-end-2 col-start-1 col-end-3 h-full">
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
      </div>

      <div className="flex flex-col gap-20 row-start-2 row-end-2 col-start-3 col-span-5 w-full">
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

        <ProfileSection title="Basic Information">
          <p className="text-slate-700">Sal coae</p>
        </ProfileSection>
      </div>
    </div>
  );
};

export default CreatorProfilePage;
