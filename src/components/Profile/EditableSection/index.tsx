const EditableSection = ({
  children,
  type,
  isEditMode = false,
  inputProps,
}) => {
  const getInputComponent = () => {
    switch (type) {
      default:
        return <input {...inputProps}></input>;
    }
  };

  return (
    <>
      {isEditMode && getInputComponent()}
      {!isEditMode && children}
    </>
  );
};

export default EditableSection;
