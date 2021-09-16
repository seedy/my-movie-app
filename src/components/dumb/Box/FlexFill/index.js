import Box from '@material-ui/core/Box';

// COMPONENTS
const BoxFlexFill = (props) => (
  <Box
    display="flex"
    flexGrow={1}
    width="100%"
    {...props}
  />
);

export default BoxFlexFill;
