import { Divider } from '@mantine/core';

{
  /* <Grid
padding="14px"
bgcolor="#2A8D5C"
sx={{
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
}}
>
<CampaignOverviewTitle>{title}</CampaignOverviewTitle>
</Grid> */
}

export const Header = ({ text }) => {
  return (
    <div className='p-3 bg-green-700 rounded-t-lg'>
      <span className='font-normal font-bold text-lg leading-snug text-white'>
        {text}
      </span>
    </div>
  );
};

const Panel = ({ children }) => {
  return (
    <div
      className={`w-full bg-gray-200 rounded-xl transition-transform duration-200 ease-in`}
    >
      {children}
    </div>
  );
};

const PanelComponent = ({
  renderBody,
  panelProps = {},
  gridSx = {},
}) => (
  <Panel {...panelProps}>
    <div
      className={`flex flex-col items-start gap-3 bg-white p-6 rounded-xl ${gridSx}`}
      style={{ gap: '14px' }}
    >
      {renderBody()}
    </div>
  </Panel>
);

export default PanelComponent;
