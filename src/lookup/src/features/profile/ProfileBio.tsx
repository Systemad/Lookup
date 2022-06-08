import React from "React";
import {
    chakra,
    Box,
    Image,
    Flex,
    Icon,
    useColorModeValue,
} from "@chakra-ui/react";

import { MdHeadset, MdEmail, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";

const ProfileBio = () => {

    return (

        <Box py={4} px={6}>
            <chakra.p py={2} color={useColorModeValue("gray.700", "gray.400")}>
                Full Stack maker & UI / UX Designer , love hip hop music Author of
                Building UI.
            </chakra.p>

            <Flex
                alignItems="center"
                mt={4}
                color={useColorModeValue("gray.700", "gray.200")}
            >
                <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

                <chakra.h1 fontSize="sm" mr={2}>
                    Choc UI
                </chakra.h1>

                <Icon as={MdLocationOn} h={6} w={6} mr={2} />

                <chakra.h1 fontSize="sm" marginRight="2">
                    California
                </chakra.h1>

                <Icon as={MdLocationOn} h={6} w={6} mr={2} />

                <chakra.h1 fontSize="sm" marginRight="2">
                    California
                </chakra.h1>

            </Flex>

        </Box>
    )
}

export default ProfileBio;