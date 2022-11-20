import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { purple } from '@mui/material/colors';
import { menus } from "../utils/constants/menuRoutes.constants";
import "./../assets/scss/App.scss";
import MissingRoute from "./components/MissingRoute";
import Loader from "./features/Loader/Loader";
import { SnackbarProvider } from "notistack";
import SnackbarAction from "./components/SnackBarUtils/SnackBarAction";
import { SnackbarUtilsConfigurator } from "./components/SnackBarUtils/SnackBarUtils";
import HomePage from "./pagaes/home";
import { createTheme, Paper, ThemeProvider } from "@mui/material";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: purple[500],
          },
          secondary: {
            main: '#f44336',
          },
          mode
        },
      }),
    [mode]
  );

  return (
    <SnackbarProvider
      action={(key) => <SnackbarAction id={key} />}
      maxSnack={3}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <SnackbarUtilsConfigurator />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Paper>
            <div className="use-bootstrap">
              <Header theme={theme} colorMode={colorMode} />
              <BrowserRouter basename="/">
                <div className="container">
                  <Routes>
                    {/* map routes from menu constants */}
                    {/* <Route path="/" element={<Navigate to={menus[0].path} />} /> */}
                    <Route path="/"  element={<HomePage/>} />
                    <Route path="*" element={<MissingRoute />} />
                  </Routes>
                </div>
                <Loader />
              </BrowserRouter>
              <Footer />
            </div>
          </Paper>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
