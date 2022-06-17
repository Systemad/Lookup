import React from "react";
import {MdFavorite, TbRepeat} from "react-icons/all";
import { Flex, Spacer, Text, Button, Stack } from '@chakra-ui/react'
import {CreateLookupModel, LookupMessage} from "../redux/webApi";
export interface Props {
    lookupId?: string;
}

const LookupItemDetail: React.FC<Props> = ({
    lookupId
}) => {

    let newMsg = {
        content: "shey",
        timestamp: "20/222",
        publisherUsername: "whatevs"
    } as LookupMessage;

    return (
        <Stack p="4" boxShadow="lg" m="4" borderRadius="sm" _hover={{cursor: "pointer"}}>
            <Stack direction="row" alignItems="center">
                <Text fontSize="xl" color="white" fontWeight="semibold">{newMsg.publisherUsername}</Text>
                <Text fontSize="md" color="white" fontWeight="semibold">{newMsg.content}</Text>
            </Stack>

            <Stack
                direction={{ base: 'column', md: 'row' }}
                justifyContent="space-between">
                <Text color="white"  fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                    {newMsg.content}
                </Text>
                <Stack direction={{ base: 'column', md: 'row' }}>
                    <Button colorScheme="green">
                        <MdFavorite/> 111
                    </Button>
                    <Button colorScheme="green">
                        <TbRepeat/>
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default LookupItemDetail;
