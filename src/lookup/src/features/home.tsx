import React, {useEffect, useState} from "react";
import ChannelInfo from "../components/ChannelInfo";
import UserList from "../components/UserList";
import MainLookupFeed from "../components/ChannelData";
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

    const startConnection = async () => {
        if(connection.state === signalR.HubConnectionState.Connected)
            return;

        if(connection.state === signalR.HubConnectionState.Disconnected)
            await connection.start();
    }
    /*
    useEffect(() => {
        startConnection().then(r => console.log(r));
    }, []);
    */
    return (
        <>
            <MainLookupFeed />
        </>
    );
};
export default HomePage;
