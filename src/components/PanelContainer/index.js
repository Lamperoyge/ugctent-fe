const PanelContainer = ({ children, extraClassName }) => (
  <div
    className={`bg-color-white px-8 py-5 rounded-md h-full shadow ${extraClassName}`}
  >
    {children}
  </div>
);

export default PanelContainer;
