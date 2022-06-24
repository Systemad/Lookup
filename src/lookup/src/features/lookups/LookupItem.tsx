import React from "react";
import {MdFavorite, TbRepeat} from "react-icons/all";
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Flex, Spacer, Text, Button, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import {useLookupGetLookupQuery} from "../redux/webApi";
import {skipToken} from "@reduxjs/toolkit/query/react";
import {useNavigate} from "react-router-dom";
export interface Props {
    author?: string;
    authorId?: string,
    date?: string;
    likeCount?: number,
    avatarUrl?: string,
    replyId?: string | null,
    onClick?: () => void,
    content?: string | React.ReactElement | React.ReactNode;
}

const LookupItem: React.FC<Props> = ({
    author,
    authorId,
    date,
    likeCount,
    avatarUrl,
    replyId,
    onClick,
    content,
}) => {
    const {data: parentLookup} = useLookupGetLookupQuery(replyId ? {id: replyId, reply: true} : skipToken);
    const navigate = useNavigate();
    return (
        <>
                <Stack bg="whiteAlpha.100" onClick={onClick} boxShadow="lg" m="2" borderRadius="sm" _hover={{cursor: "pointer"}}>
                    <Stack p="4" direction="row" alignItems="center">
                        <Avatar name={author} src={avatarUrl} />
                        <Text onClick={() => navigate(`../${authorId!}`)} fontSize="md" color="white" fontWeight="semibold">{author}</Text>
                        <Text fontSize="sm" color="grey" fontWeight="semibold">{date}</Text>
                    </Stack>

                    <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
                        <Text pl={14} color="white" fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                            {content}
                        </Text>
                        <Stack pr={2} pb={2} direction={{ base: 'column', md: 'row' }}>
                            <Button colorScheme="green">
                                Reply
                            </Button>
                            <Button colorScheme="green">
                                <MdFavorite/> {likeCount}
                            </Button>
                            <Button colorScheme="green">
                                <TbRepeat/>
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
        </>
    );
};

export default LookupItem;

/*
                    {replyId !== null && true && parentLookup &&
                        <>
                            <Stack background="grey" p="4" direction="row" alignItems="center">
                                <Avatar name={parentLookup!.publisherUsername} src={parentLookup!.publisherUsername} />
                                <Text fontSize="md" color="white" fontWeight="semibold">{parentLookup!.publisherUsername}</Text>
                                <Text fontSize="sm" color="grey" fontWeight="semibold">{parentLookup!.timestamp}</Text>
                            </Stack>

                            <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
                                <Text pl={14} color="white" fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                                    {content}
                                </Text>
                            </Stack>
                        </>
                    }
 */
