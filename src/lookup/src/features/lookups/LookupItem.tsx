import React from "react";
import {MdFavorite, TbRepeat} from "react-icons/all";
import { Flex, Spacer, Text, Button, Stack } from '@chakra-ui/react'
export interface Props {
    author?: string;
    date?: string;
    likeCount?: number,
    content?: string | React.ReactElement | React.ReactNode;
}

const LookupItem: React.FC<Props> = ({
    author,
    date,
    likeCount,
    content,
}) => {
    return (
        <Stack p="4" boxShadow="lg" m="4" borderRadius="sm" _hover={{cursor: "pointer"}}>
            <Stack direction="row" alignItems="center">
                <Text fontSize="xl" color="white" fontWeight="semibold">{author}</Text>
                <Text fontSize="md" color="white" fontWeight="semibold">{date}</Text>
            </Stack>

            <Stack
                direction={{ base: 'column', md: 'row' }}
                justifyContent="space-between">
                <Text color="white"  fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                    {content}
                </Text>
                <Stack direction={{ base: 'column', md: 'row' }}>
                    <Button colorScheme="green">
                        <MdFavorite/> {likeCount}
                    </Button>
                    <Button colorScheme="green">
                        <TbRepeat/>
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default LookupItem;
