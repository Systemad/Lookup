import React, {useEffect, useState} from "react";
import {useAccount, useMsal} from "@azure/msal-react";
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

const ProfileEdit: React.FC = () => {

    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const tokenRequest = {
        account: instance.getActiveAccount() as AccountInfo,
        scopes: loginRequest.scopes
    }

    useEffect(() => {

    },[instance, accounts, inProgress])

    return (
        <>

        </>
    );
};
export default ProfileEdit;