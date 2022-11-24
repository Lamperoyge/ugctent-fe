import ProfileSectionTitle from "./ProfileSectionTitle";

const ProfileSection = ({ children, title, hasTitleLine }) => {
  return (
    <div className="flex flex-col w-full gap-5">
      <ProfileSectionTitle hasLine={hasTitleLine}>{title}</ProfileSectionTitle>
      {children}
    </div>
  );
};

export default ProfileSection;
