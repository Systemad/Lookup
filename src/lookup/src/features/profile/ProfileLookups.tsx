import React from "react";
import {Flex, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {useLookupGetMessagesFromUserQuery, useUserGetReceivedMessagesQuery} from "../redux/webApi";
import LookupItem from "../lookups/LookupItem";

type Props = {
    userId: string
}

const ProfileLookupsTabs = ({userId} : Props) => {
    const {data: messages, isLoading} = useLookupGetMessagesFromUserQuery({userId: userId});
    return (
        <>
        <Box w="full">
                <Tabs defaultIndex={0} colorScheme='green' align="center" isFitted isLazy>
                    <TabList>
                        <Tab>Lookups</Tab>
                        <Tab isDisabled>Likes</Tab>
                        <Tab isDisabled>Reposts</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {messages && messages.filter(x => x.replyId === null).map((message) => (
                                <LookupItem
                                    key={message?.id}
                                    author={message?.publisherUsername}
                                    authorId={message?.publisherUserId}
                                    date={message?.timestamp}
                                    likeCount={message?.likes}
                                    replyId={message?.replyId}
                                    content={message?.content}
                                />
                            ))}
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