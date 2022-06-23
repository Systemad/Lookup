import React, {useEffect} from "react";
import {
    CreateLookupModel,
    useLookupGetLookupQuery,
    useLookupGetMessageThreadQuery, useLookupPostLookupMutation
} from "../redux/webApi";
import {Avatar, Button, Flex, Stack, Text, Textarea } from '@chakra-ui/react'
import LookupItem from "./LookupItem";
import {skipToken} from "@reduxjs/toolkit/query/react";
import {MdFavorite, TbRepeat} from "react-icons/all";

type Props = {
    lookupId: string,
}

const LookupItemDetail = ({lookupId} : Props) => {
    let [value, setValue] = React.useState('')
    const [sendLookup] = useLookupPostLookupMutation();
    const {data: lookupItem} = useLookupGetLookupQuery({id: lookupId, body: false});
    const {data: lookupThread} = useLookupGetMessageThreadQuery({lookupId: lookupId});

    let handleInputChange = (e: any) => {
        e.preventDefault();
        let inputValue = e.target.value;
        setValue(inputValue)
    }

    const SubmitLookup = async () => {
        const isMessageProvided = value && value !== '';
        if(isMessageProvided){
            let newMsg = {
                content: value,
                replyId: lookupId
            } as CreateLookupModel;
            await sendLookup({createLookupModel: newMsg})
            setValue('');
        }
    }

    return (
        <>
            <Flex flexDirection="column" w="45%" maxW="45%" maxH="100vh" overflowY="scroll">
                <LookupItem
                    author={lookupItem?.publisherUsername}
                    date={lookupItem?.timestamp}
                    likeCount={lookupItem?.likes}
                    content={lookupItem?.content}
                />

                <Flex boxShadow="md" m="4" maxHeight="125px">
                    <Textarea
                        value={value}
                        variant="outline"
                        focusBorderColor="green.600"
                        onChange={handleInputChange}
                        resize="vertical"
                        placeholder='Tweet your Lookup'
                        h="80px"
                        maxH="125px"
                        size='md'
                    />
                    <Button onClick={SubmitLookup} colorScheme='green'>Button</Button>
                </Flex>

                {lookupThread && lookupThread.map((message) => (
                    <LookupItem
                        author={message?.publisherUsername}
                        date={message?.timestamp}
                        likeCount={message?.likes}
                        content={message?.content}
                    />
                ))}
            </Flex>
        </>
    );
};

export default LookupItemDetail;
