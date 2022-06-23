import React from "react";
import {Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export type Props = {
    tabIndex: number;
}

const ProfileLookupsTabs = () => {
    return (
        <>
            <Flex>
                <TabList>
                    <Tab>Lookups</Tab>
                    <Tab>Retweets</Tab>
                    <Tab>Likes</Tab>
                    <Tab>Media</Tab>
                </TabList>
            </Flex>
        </>
    );
};

export default ProfileLookupsTabs;