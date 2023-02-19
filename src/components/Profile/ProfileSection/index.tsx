import ProfileSectionTitle from "./ProfileSectionTitle";

const ProfileSection = ({ children, title, hasTitleLine, classNames }) => {
  return (
    <div className={`flex flex-col w-full gap-5 overflow-auto ${classNames}`}>
      <ProfileSectionTitle hasLine={hasTitleLine}>{title}</ProfileSectionTitle>
      {children}
    </div>
  );
};

export default ProfileSection;
