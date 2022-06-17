import React from "React";
import {Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const ProfileLookupsTabs = () => {
    return (
        <>

            <Flex justifyContent="right" w="full" flexDirection="row">
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
            </Flex>
        </>
    );
};

export default ProfileLookupsTabs;