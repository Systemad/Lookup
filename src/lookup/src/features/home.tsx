import React, {useEffect, useState} from "react";
import MainLookupFeed from "./lookups/Lookups";
import {useAccount, useMsal} from "@azure/msal-react";
import {loginRequest} from "./auth/utils/authConfig";
import {AccountInfo} from "@azure/msal-browser";
import connection from "../services/signalr";
import * as signalR from "@microsoft/signalr"

const HomePage: React.FC = () => {

    const { instance, accounts, inProgress } = useMsal();

    const tokenRequest = {
        account: instance.getActiveAccount() as AccountInfo,
        scopes: loginRequest.scopes
    }

    const accessTokenFactory = async () => {
        const token = await instance.acquireTokenSilent(tokenRequest);
        return token.accessToken;
    }

    return (
        <>
            <MainLookupFeed />
        </>
    );
};
export default HomePage;
