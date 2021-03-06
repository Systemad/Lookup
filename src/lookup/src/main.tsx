import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {theme} from "./features/themes"
// Msal imports
import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "./features/auth/utils/authConfig";
import {BrowserRouter} from "react-router-dom";

export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is redux dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.enableAccountStorageEvents();

msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        msalInstance.setActiveAccount(account);
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <React.StrictMode>
          <ChakraProvider theme={theme}>
            <App pca={msalInstance}/>
          </ChakraProvider>
      </React.StrictMode>
    </BrowserRouter>
)

// Add msal
// <App pca={msalInstance}/>
