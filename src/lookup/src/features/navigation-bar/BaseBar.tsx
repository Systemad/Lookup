import * as React from "react";
import {Box, Flex, Text} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import NavBarItem from "./NavBarItem";
import PostLookupItem from "./PostLookupItem";
import ProfileButton from "./ProfileButton";

const BaseBar = () => {
    return (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            h="full"
            bg="green.500"
            w="200px"
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="3xl" fontFamily="monospace" fontWeight="bold">
                    LOOKUP
                </Text>
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="green.600"
                aria-label="Main Navigation"
            >
                <PostLookupItem>Post Lookup</PostLookupItem>
                <NavBarItem icon={AddIcon}>Home</NavBarItem>
                <NavBarItem icon={AddIcon}>Notifications</NavBarItem>
                <ProfileButton/>
                <NavBarItem icon={AddIcon}>About</NavBarItem>
            </Flex>
        </Box>
        )
}

export default BaseBar;