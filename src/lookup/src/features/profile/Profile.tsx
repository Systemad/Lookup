import React, {useEffect, useState} from "react";
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../auth/utils/authConfig";
import {AccountInfo} from "@azure/msal-browser";
import connection from "../../services/signalr";
import * as signalR from "@microsoft/signalr"
import {
    Flex,
    Stack
} from "@chakra-ui/react";
import ProfileBanner from "./ProfileBanner";
import ProfileBio from "./ProfileBio"
import ProfileLookups from "./ProfileLookups";
import {useUserGetUserInfoQuery} from "../redux/webApi";
import {useLocation} from "react-router-dom";

const ProfilePage: React.FC = () => {

    const { instance, accounts, inProgress } = useMsal();
    const { pathname } = useLocation();
    const  {data: user} = useUserGetUserInfoQuery({userId: pathname.toString()})

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

    useEffect(() => {
        startConnection().then(r => console.log(r));
    }, []);

    return (
        <>
            <Flex direction="column" w="full" mx="auto">
                <ProfileBanner headerUrl={user?.headerUrl}/>
                <Stack direction={['column', 'row']}>
                    <ProfileBio name={user?.username} bio={user?.bio} location={user?.location} joinedDate={user?.joinedDate}/>
                    <ProfileLookups/>
                </Stack>
            </Flex>
        </>
    );
};
export default ProfilePage;