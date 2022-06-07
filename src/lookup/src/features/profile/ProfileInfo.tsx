import React from "react";
import {Box, chakra, Flex, useColorModeValue} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

// replace with Lookup Account object
type Props = {
    name: string;
    followers: string;
    following: string;
}

// Use Profile Avatar here as well
const ProfileInfo = ({name, followers, following} : Props) => {

    return (
        <>
        <Flex
            alignItems="center"
            justifyContent="space-between"
            py={2}
            px={3}
            bg={useColorModeValue("gray.200", "gray.700")}
        >

            <chakra.h3
                py={2}
                textAlign="center"
                fontWeight="bold"
                textTransform="uppercase"
                color={useColorModeValue("gray.800", "white")}
                letterSpacing={1}
            >
                {name}
            </chakra.h3>

        </Flex>
        </>
    );
};
export default ProfileInfo;

