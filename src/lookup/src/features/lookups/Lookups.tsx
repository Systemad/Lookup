import React, { useRef, useEffect } from "react";

import ChannelMessage from "../../components/ChannelMessage";
import { Flex, Spacer } from '@chakra-ui/react'
import styled from "styled-components";
import {useLookupGetReceivedMessagesQuery} from "../redux/webApi";

/*
  content?: string;
  timestamp?: string;
  publisherUsername?: string;
 */
const MainLookupFeed = () => {
    const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const {data: messages, isLoading} = useLookupGetReceivedMessagesQuery();

    useEffect(() => {
        const div = messagesRef.current;

        if (div) {
            //div.scrollTop = div.scrollHeight;
            div.scrollTop = 0;
        }
    }, [messagesRef]);

    return (
        <>
        <Flex justify="space-between" direction="column" bg="var(--primary)">
            <Flex flexDirection="column" maxW="55%" maxH="100vh" overflowY="scroll" ref={messagesRef}>
                {messages?.map((message) => (
                    <ChannelMessage
                        author={message?.publisherUsername}
                        date={message?.timestamp}
                        content={message?.content}
                    />

                ))}
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                <ChannelMessage
                    author="hey"
                    date="today"
                    content="random content hello tweeet"
                />
                </Flex>
            </Flex>
        </>
    );
};

export default MainLookupFeed;


export const Mention = styled.span`
    color: var(--link);
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;
