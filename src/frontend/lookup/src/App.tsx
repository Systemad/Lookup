import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Grid from '@mui/material/Grid';
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

import {InteractionSidebarComponent} from "./features/interaction-sidebar/components"

// Pages
import FeedPage from "./pages/feed";
import CssBaseline from '@mui/material/CssBaseline';
type AppProps = {
  pca: IPublicClientApplication
};
import { styled } from '@mui/system';
import ResponsiveAppBar from "./features/app-bar/components";
// add msal
function App() {

  //const history = useNavigate();
  //const navigationClient = new CustomNavigationClient(history);
  //pca.setNavigationClient(navigationClient);

  return (

          <MainGrid>
              <CssBaseline />
              <PageNameContainer>
                  Page name
              </PageNameContainer>

              <PageInfoContainer>
                  Page info
              </PageInfoContainer>

              <NavbarContainer>
                  Navbar
              </NavbarContainer>

              <UserinfoContainer>
                  User info
              </UserinfoContainer>

            <UserlistContainer>
                User list
            </UserlistContainer>

              <MainFeedContainer>
                  <FeedPage/>
              </MainFeedContainer>
          </MainGrid>
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
          <Routes>
              <Route path="/" element={<FeedPage/>}/>
              <Route path="/profile" element={<p>profile</p>}/>
          </Routes>
      </>
  )
}

/* Add template
        <AuthenticatedTemplate>
            <Routes>
                <Route path="/" element={
                    <>
                        <FeedPage/>
                    </>
                }>
                </Route>
            </Routes>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <LoginDisplay/>
        </UnauthenticatedTemplate>
      </>
 */

/*
    PN - Page name
    PI - Page info
    NB - Navigation bar
    UI - User info
    UL - User list
    MF - Main feed
 */

export const MainGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '71px 240px auto 240px',
    //gap: 1,
    gridTemplateRows: '46px auto 52px',
    gridTemplateAreas:`
                  "PN PN PI PI"
                  "NB MF MF UL"
                  "UI MF MF UL"`,
    height: '100%'
});

const PageNameContainer = styled(Box)({
    gridArea: 'PN',
    justifyContent: 'space-between',
    backgroundColor: 'lightpurple',
    alignItems: 'center',
    padding: '0 11px 0 16px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 0px 0px',
    zIndex: '2',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex'
});

const NavbarContainer = styled(Box)({
    gridArea: 'NB',
    backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 9.5px 0 16px'
});

const UserinfoContainer = styled(Box)({
    gridArea: 'UI',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    padding: '10px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 0px 0px',
});

const UserlistContainer = styled(Box)({
    gridArea: 'UL',
    display: 'flex',

    flexDirection: 'column',
    padding: '3px 6px 0 16px',

    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 46px)',
    backgroundColor: 'green'
});

const PageInfoContainer = styled(Box)({
    gridArea: 'PI',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    padding: '10px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 0px 0px',
    zIndex: '2'
});

const MainFeedContainer = styled(Box)({
    gridArea: 'MF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue'
});


// -------------------------------
const SidebarGrid = styled(Box)({
    gridArea: 'sidebar',
    backgroundColor: 'lightgreen',
    maxHeight: '100vh',
    overflowY: 'scroll',
    padding: '11px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const HeaderGrid = styled(Box)({
    gridArea: 'header',
    backgroundColor: 'lightpink',
    maxHeight: '8vh'
});