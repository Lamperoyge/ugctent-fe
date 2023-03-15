import Multiselect from "components/Shared/Form/MultiSelect";

const EditableSection = ({
  children,
  type,
  isEditMode = false,
  inputProps,
}) => {
  const getInputComponent = () => {
    switch (type) {
      case "multi-select": {
        return (
          <Multiselect
            options={inputProps.options}
            selected={inputProps.value}
          ></Multiselect>
        );
      }
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
