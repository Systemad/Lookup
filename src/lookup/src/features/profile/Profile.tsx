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

    const { pathname } = useLocation();
    const {data: user} = useUserGetUserInfoQuery({userId: pathname.substring(1)})

    return (
        <>
            <Flex direction="column" w="full" mx="auto">
                <ProfileBanner headerUrl={user?.headerUrl}/>
                <Stack direction={['column', 'row']}>
                    <ProfileBio name={user?.username} bio={user?.bio} location={user?.location} joinedDate={user?.joinedDate}/>
                    <ProfileLookups userId={pathname.substring(1)} />
                </Stack>
            </Flex>
        </>
    );
};
export default ProfilePage;