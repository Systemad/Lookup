import React, {useRef, useEffect, useState} from "react";

import LookupItem from "./LookupItem";
import { Flex, chakra, Spacer, Heading } from '@chakra-ui/react'
import styled from "styled-components";
import LookupItemDetail from "./LookupItemDetail";
import {useUserGetReceivedMessagesQuery} from "../redux/webApi";
import lookupItemDetail from "./LookupItemDetail";

const MainLookupFeed = () => {
    const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const {data: messages, isLoading} = useUserGetReceivedMessagesQuery();
    const [lookupDetail, setLookupDetail] = useState('')
    const [lookupOpen, setLookupOpen] = useState(false);

    const openLookup = (itemId: string): void => {
        if(itemId !== null){
            setLookupOpen(true);
            setLookupDetail(itemId);
            console.log(`Lookup clicked: ${itemId} - ${lookupOpen}`)
        }
    }

    useEffect(() => {
        const div = messagesRef.current;

        if (div) {
            //div.scrollTop = div.scrollHeight;
            div.scrollTop = 0;
        }
    }, [messagesRef]);

    return (
        <>
            <Flex justify="space-between">
                <Flex flexDirection="column" w="55%" maxW="55%" maxH="100vh" overflowY="scroll" ref={messagesRef}>
                    {messages && messages.map((message) => (
                        <LookupItem
                            key={message?.id}
                            author={message?.publisherUsername}
                            date={message?.timestamp}
                            likeCount={message?.likes}
                            replyId={message?.replyId}
                            onClick={() => openLookup(message.id!)}
                            content={message?.content}
                        />
                    ))}
                </Flex>
                {lookupOpen && lookupDetail !== '' &&
                    <>
                        <LookupItemDetail lookupId={lookupDetail} />
                    </>
                }
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
