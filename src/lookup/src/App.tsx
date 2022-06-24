import React, {useEffect} from 'react'
import './App.css'
// MSAL imports
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal
} from "@azure/msal-react";
import { Grid, GridItem } from '@chakra-ui/react'
import { IPublicClientApplication } from "@azure/msal-browser";
import {CustomNavigationClient} from "./features/auth/utils/navigationClient";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {LoginDisplay} from "./features/auth/components/LoginDisplay/LoginDisplay";
import { store} from "./features/redux/store";
import { Provider } from 'react-redux'
import NavigationBarComponent from "./features/navigation-bar"
import GlobalStyles from "./GlobalStyles";
type AppProps = {
  pca: IPublicClientApplication
};
import HomePage from "./features/home";
import ProfilePage from "./features/profile/Profile";
import InteractionBar from "./features/interaction-sidebar";
import connection from "./services/signalr";
import * as signalR from "@microsoft/signalr";
function App({pca} : AppProps) {

  const history = useNavigate();
  const navigationClient = new CustomNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  return (
    <>
        <GlobalStyles />
        <MsalProvider instance={pca}>
            <Provider store={store}>
                <Pages/>
            </Provider>
        </MsalProvider>
    </>
  )
}

export default App


function Pages(){

    const { instance, accounts, inProgress } = useMsal();

    const startConnection = async () => {
        if(connection.state === signalR.HubConnectionState.Connected)
            return;

        if(connection.state === signalR.HubConnectionState.Disconnected)
            await connection.start();
    }

    useEffect(() => {
        startConnection().then(r => console.log(r));
    }, [accounts, instance]);

  return (
      <>
          <AuthenticatedTemplate>
              <Grid
                  display='grid'
                  templateAreas={`
                  "sidebar main"`}
                  gridTemplateRows={'auto'}
                  gridTemplateColumns={'200px auto'}
                  h='100%'
                  color='blackAlpha.700'
                  fontWeight='bold'
              >

                  <GridItem area={'sidebar'}>
                      <NavigationBarComponent/>
                  </GridItem>

                  <GridItem pl='2' area={'main'}>
                      <Routes>
                          <Route path="/" element={<Navigate to="/home"/>}/>
                          <Route path="/home" element={<HomePage/>}/>
                          <Route path=":userId" element={<ProfilePage/>}>

                          </Route>
                      </Routes>
                  </GridItem>
          </Grid>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
              <LoginDisplay/>
          </UnauthenticatedTemplate>
      </>
  )
}