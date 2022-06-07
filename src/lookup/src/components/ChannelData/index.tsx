import React, { useRef, useEffect } from "react";

import ChannelMessage from "../ChannelMessage";
import { Flex, Spacer } from '@chakra-ui/react'
import { Container, Lookups, Mention } from "./styles";
import {useLookupGetReceivedMessagesQuery} from "../../features/redux/webApi";

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
            div.scrollTop = div.scrollHeight;
        }
    }, [messagesRef]);

    return (
        <>
        <Flex justify="space-between" direction="column" bg="var(--primary)">
            <Lookups ref={messagesRef}>
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
                </Lookups>
            </Flex>
        </>
    );
};

export default MainLookupFeed;
