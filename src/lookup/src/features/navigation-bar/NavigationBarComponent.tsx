import {
    Box, Flex, Text,
    useColorModeValue,
} from '@chakra-ui/react'
import PostLookupItem from "./PostLookupItem";
import NavBarItem from "./NavBarItem";
import {AddIcon} from "@chakra-ui/icons";
import * as React from "react";

export const NavigationBarComponent = () => {

    return (
        <>
            <Box as="section" bg={useColorModeValue("gray.50", "gray.700")} minH="100vh" width="200px">
                <Box
                    as="nav"
                    pos="fixed"
                    top="0"
                    left="0"
                    h="full"
                    bg="green.500"
                    w="200px">
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
                        aria-label="Main Navigation">
                        <PostLookupItem>Post Lookup</PostLookupItem>
                        <NavBarItem icon={AddIcon}>Home</NavBarItem>
                        <NavBarItem icon={AddIcon}>Notifications</NavBarItem>
                        <NavBarItem icon={AddIcon}>Profile</NavBarItem>
                        <NavBarItem icon={AddIcon}>About</NavBarItem>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default NavigationBarComponent;