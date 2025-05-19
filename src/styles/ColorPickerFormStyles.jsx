import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const AddColor = styled(Button)(() => ({
  width: '100%',
  padding: '1rem',
  marginTop: '1rem',
  fontSize: '2rem'
}));

const styles = {
  picker: {
    width: '100% !important',
    marginTop: '2rem'
  }
}

export {AddColor, styles, styled}