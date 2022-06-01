import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
// MSAL imports
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal
} from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import {CustomNavigationClient} from "./features/auth/utils/navigationClient";
import {Route, Routes, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import {LoginDisplay} from "./features/auth/components/LoginDisplay/LoginDisplay";
import { store} from "./features/redux/store";
import { Provider } from 'react-redux'
import {Grid} from "./features/themes/grid"
import { styled, createTheme, ThemeProvider } from '@mui/system';
import {InteractionSidebarComponent} from "./features/interaction-sidebar/components"
import GlobalStyles from "./GlobalStyles";
// Pages
import FeedPage from "./pages/feed";
import CssBaseline from '@mui/material/CssBaseline';
type AppProps = {
  pca: IPublicClientApplication
};
import Layout from "./components/Layout";
import {MainTheme} from "./features/themes/theme";
// add msal
function App({pca} : AppProps) {

  const history = useNavigate();
  const navigationClient = new CustomNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  return (
    <>
        <MsalProvider instance={pca}>
            <ThemeProvider theme={MainTheme}>
                <Provider store={store}>
                    <Pages/>
                </Provider>
                <GlobalStyles/>
            </ThemeProvider>
        </MsalProvider>
    </>
  )
}

/* TODO: Add store and msal
<MsalProvider instance={pca}>
          <Provider store={store}>
              <Pages/>
          </Provider>
         </MsalProvider>
 */
export default App


function Pages(){
  return (
      <>
          <AuthenticatedTemplate>
                  <Grid>
                      <InteractionSidebarComponent/>
                      <Routes>
                          <Route path="/" element={<Layout/>}/>
                      </Routes>
                  </Grid>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
              <LoginDisplay/>
          </UnauthenticatedTemplate>
      </>
  )
}

/*
    PN - Page name
    PI - Page info
    NB - Navigation bar
    UI - User info
    UL - User list
    MF - Main feed
 */