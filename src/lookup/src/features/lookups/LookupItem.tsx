import React from "react";
import {MdFavorite, TbRepeat} from "react-icons/all";
import { Flex, Spacer, Text, Button, Stack, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import {useLookupGetLookupQuery} from "../redux/webApi";
import {skipToken} from "@reduxjs/toolkit/query/react";
export interface Props {
    author?: string;
    date?: string;
    likeCount?: number,
    avatarUrl?: string,
    replyId?: string | null,
    onClick?: () => void,
    content?: string | React.ReactElement | React.ReactNode;
}

const LookupItem: React.FC<Props> = ({
    author,
    date,
    likeCount,
    avatarUrl,
    replyId,
    onClick,
    content,
}) => {
    const {data: parentLookup} = useLookupGetLookupQuery(replyId ? {id: replyId, body: true} : skipToken);
    return (
        <>
            <Stack>
                <Stack onClick={onClick} p="4" boxShadow="lg" m="2" borderRadius="sm" _hover={{cursor: "pointer"}}>
                    <Stack direction="row" alignItems="center">
                        <Avatar name={author} src={avatarUrl} />
                        <Text fontSize="xl" color="white" fontWeight="semibold">{author}</Text>
                        <Text fontSize="md" color="grey" fontWeight="semibold">{date}</Text>
                    </Stack>

                    <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
                        <Text pl={14} color="white" fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                            {content}
                        </Text>
                        <Stack direction={{ base: 'column', md: 'row' }}>
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
                {replyId !== null && true && parentLookup &&
                    <>
                        <Stack p="4" m="2" borderColor="blue">
                            <p>HYEHEY</p>
                        </Stack>
                    </>
                }
            </Stack>
        </>
    );
};

export default LookupItem;
