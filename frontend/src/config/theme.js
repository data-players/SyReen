import { createTheme } from '@material-ui/core/styles';

const defaultTheme = createTheme();

const font1 = '"Inter", "serif"';
// const font2 = '"Roboto", "Open Sans", "sans-serif"';

/*
Bleu turquoise : #0099A1
Bleu : #21B3CA
Bleu clair : #E2F3F8
Vert : #70E000
Noir : #002B2E
*/

const theme = createTheme({
  palette: {
    primary: {
      main: '#0099A1',
      light: '#E2F3F8',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#70E000',
      contrastText: '#FFF',
    },
  },
  typography: {
    h1: {
      fontFamily: font1,
      fontSize: 48,
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '70px',
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: 32,
        lineHeight: '46px',
      },
    },
    h2: {
      fontFamily: font1,
      fontSize: 40,
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 1.15,
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: 28,
      },
    },
    h4: {
      fontFamily: font1,
      fontSize: 30,
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '44px',
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: 18,
        lineHeight: '26px',
      },
    },
    h6: {
      fontFamily: font1,
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 1.15,
    },
    subtitle1: {
      fontFamily: font1,
      fontSize: 12,
      lineHeight: '14px',
    },
    subtitle2: {
      fontFamily: font1,
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '14px',
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: font1,
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '19px',
    },
    body2: {
      fontFamily: font1,
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '16px',
    },
    button: {
      fontFamily: font1,
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '14px',
      textTransform: 'uppercase',
    },
  },
  overrides: {
    RaImageField: {
      image: {
        width: '100%',
        margin: 0,
        maxHeight: 200,
        objectFit: 'cover',
      },
    },
    MuiButton: {
      contained: {
        borderRadius: 2,
        padding: 12,
        minWidth: 100,
      },
    },
    MuiAlert: {
      message: {
        paddingTop: 11,
      },
    },
    MuiIconButton: {
      root: {
        padding: 8,
        paddingRight: 0,
      },
    },
    RaTabbedShowLayout: {
      content: {
        [defaultTheme.breakpoints.down('xs')]: {
          paddingLeft: 0,
          paddingRight: 0
        }
      }
    },
    RaTabbedForm: {
      content: {
        [defaultTheme.breakpoints.down('xs')]: {
          paddingLeft: 0,
          paddingRight: 0
        }
      }
    }
  },
});

export default theme;
