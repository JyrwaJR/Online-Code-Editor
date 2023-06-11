/** @format */
import SFMono from "../Font/SFMonoRegular.woff";
import Calibre from "../Font/Calibre-Regular.woff";
import CalibreMedium from "../Font/Calibre-Medium.woff";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const MuiTheme = createTheme({
  palette: {
    primary: {
      main: "#1E1E1E",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Calibre",
    },
    h1: {
      fontFamily: "calibre medium",
      fontWeight: "bolder",
    },
    h5: {
      fontFamily: "sf mono",
    },
  },
  button: {
    fontFamily: "SF Mono",
    fontWeight: "bold",
  },

  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: "SF Mono",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "SF Mono",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
                    @font-face {
                    font-family: 'Calibre';
                    src: local('Calibre'), local('Calibre'),
                    url(${Calibre}) format('woff');
                    }
                    @font-face {
                    font-family: 'SF Mono';
                    src: local('sf mono'), local('sf mono'),
                    url(${SFMono}) format('woff');
                    }
                    @font-face {
                    font-family: 'calibre medium';
                    src: local('calibre medium'), local('calibre medium'),
                    url(${CalibreMedium}) format('woff');
                    }
                `,
    },
  },
});

export default responsiveFontSizes(MuiTheme);
