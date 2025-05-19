import MiniAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import sizes from './sizes';
import { DRAWR_WIDTH } from '../constants';

const Root = styled('div')(()=> ({
  display: 'flex',
}))

const BoxBts = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '1.5rem',
  [sizes.down('xs')]: {
    margin: 0,
  },
}));

const AppBar = styled(MiniAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    justifyContent:'space-between',
    flexDirection: 'row',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          width: `calc(100% - ${DRAWR_WIDTH}px)`,
          marginLeft: `${DRAWR_WIDTH}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },

      },
    ]
  }
));


export { Root, BoxBts, AppBar, styled }