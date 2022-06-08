import React from "react";
import {
    chakra,
    Box,
    Image,
    Flex,
    Icon,
    useColorModeValue,
} from "@chakra-ui/react";
import { MdHeadset, MdEmail, MdLocationOn } from "react-icons/md";
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
            <Flex alignItems="center" justifyContent="space-between" px={6} py={3} bg="gray.900">
                <Flex alignItems="center" justifyContent="space-between">
                    <Icon as={MdHeadset} h={6} w={6} color="white" />

                    <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
                        {name}
                    </chakra.h1>
                </Flex>

                <Flex alignItems="center" justifyContent="space-between">
                    <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
                        Followers: 9999
                    </chakra.h1>

                    <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
                        Following: 9999
                    </chakra.h1>
                </Flex>

            </Flex>
        </>
    );
};
export default ProfileInfo;

