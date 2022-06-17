import React, { useRef, useEffect } from "react";

import LookupItem from "./LookupItem";
import { Flex, chakra, Spacer, Heading } from '@chakra-ui/react'
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
            <Flex justify="space-between" bg="var(--primary)">
                <Flex flexDirection="column" w="55%" maxW="55%" maxH="100vh" overflowY="scroll" ref={messagesRef}>
                    {messages?.map((message) => (
                        <LookupItem
                            author={message?.publisherUsername}
                            date={message?.timestamp}
                            likeCount={message?.likes}
                            content={message?.content}

                        />

                    ))}

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
