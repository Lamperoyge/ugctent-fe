const PanelContainer = ({ children, extraClassName }) => (
  <div
    className={`bg-color-white px-8 py-5 rounded-xl h-full border-gray-300 border ${extraClassName}`}
  >
    {children}
  </div>
);

export default PanelContainer;
