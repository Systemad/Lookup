import * as React from "react";
import {Box, Flex, Icon, Text, useDisclosure, Button, ButtonGroup} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Textarea
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import {useLookupPostLookupMutation, CreateLookupModel} from "../redux/webApi";
import NavBarItem from "./NavBarItem";
import PostLookupItem from "./PostLookupItem";

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
                <NavBarItem icon={AddIcon}>Profile</NavBarItem>
                <NavBarItem icon={AddIcon}>About</NavBarItem>
            </Flex>
        </Box>
        )
}

export default BaseBar;