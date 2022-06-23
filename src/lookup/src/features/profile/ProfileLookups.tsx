import React from "react";
import {Flex, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const ProfileLookupsTabs = () => {
    return (
        <>
        <Box w="full">
                <Tabs defaultIndex={0} variant='soft-rounded' colorScheme='green' align="center" isFitted isLazy>
                    <TabList>
                        <Tab>Lookups</Tab>
                        <Tab>Likes</Tab>
                        <Tab isDisabled>Reposts</Tab>
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
        </>
    );
};

export default ProfileLookupsTabs;