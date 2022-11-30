const ProfileSectionTitle = ({ children, hasLine = false }) => {
  return (
    <div className="flex w-full items-center">
      <h2 className="text-sm font-semibold text-slate-400 uppercase">
        {children}
      </h2>
      {hasLine && <hr className="w-full text-black-500 ml-3" />}
    </div>
  );
};

export default ProfileSectionTitle;
