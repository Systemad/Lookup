import React, {useEffect, useState} from "react";
import ChannelInfo from "../../components/ChannelInfo";
import UserList from "../../components/UserList";
import MainLookupFeed from "../../components/ChannelData";
import {useAccount, useMsal} from "@azure/msal-react";
import {loginRequest} from "../auth/utils/authConfig";
import {AccountInfo} from "@azure/msal-browser";
import connection from "../../services/signalr";
import * as signalR from "@microsoft/signalr"
import styled, {css} from 'styled-components';
import { Container } from '@chakra-ui/react'
import { chakra, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import ProfileBanner from "./ProfileBanner";
import ProfileInfo from "./ProfileInfo";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const ProfilePage: React.FC = () => {

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
            <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                w="full"
                mx="auto"
            >
                <ProfileBanner headerUrl="https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"/>

                <Box
                    w="full"
                    bg={useColorModeValue("white", "gray.800")}
                    mt={-10}
                    shadow="lg"
                    rounded="lg"
                    overflow="hidden"
                >
                    <ProfileInfo name="Hey" followers="1212" following="2222"/>

                    <Tabs>
                        <TabList>
                            <Tab>One</Tab>
                            <Tab>Two</Tab>
                            <Tab>Three</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <p>one!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>three!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </>
    );
};
export default ProfilePage;
