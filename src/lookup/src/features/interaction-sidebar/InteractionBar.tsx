import * as React from "react";
import {Box, Flex, Text,  useColorModeValue} from "@chakra-ui/react";

import { AddIcon } from '@chakra-ui/icons'
import FriendItem from "./FriendItem";

const InteractionBar = () => {
    return (

        <Box
            as="section"
            bg={useColorModeValue("gray.50", "gray.700")}
            minH="100vh"
            width="200px"
        >
            <Box
                as="nav"
                pos="fixed"
                top="0"
                right="0"
                h="full"
                bg="green.500"
                w="200px"
            >
                <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                    <Text fontSize="3xl" fontFamily="monospace" fontWeight="bold">
                        Friends
                    </Text>
                </Flex>
                <Flex
                    direction="column"
                    as="nav"
                    fontSize="sm"
                    color="green.600"
                    aria-label="Left Interaction"
                >

                </Flex>

            </Box>
        </Box>
        )
}

export default InteractionBar;