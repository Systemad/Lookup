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
import { BsFillBriefcaseFill } from "react-icons/bs";

type Props = {
    name?: string,
    bio?: string,
    location?: string,
    joinedDate?: string,
    avatarUrl?: string
}
const ProfileBio = ({name, bio, occupation, location, joinedDate, avatarUrl} : Props) => {
    return (
            <Box
                w="sm"
                bg={useColorModeValue("white", "gray.800")}
                overflow="hidden"
            >
                <Image
                    w="full"
                    h={56}
                    fit="cover"
                    objectPosition="center"
                    src={avatarUrl}
                    alt="avatar"
                />

                <Flex alignItems="center" px={6} py={3} bg="gray.900">
                    <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
                        {name}
                    </chakra.h1>
                </Flex>

                <Box py={4} px={6}>
                    <chakra.p py={2} color={useColorModeValue("gray.700", "gray.400")}>
                        {bio}
                    </chakra.p>

                    <Flex
                        alignItems="center"
                        mt={4}
                        color={useColorModeValue("gray.700", "gray.200")}
                    >
                        <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

                        <chakra.h1 px={2} fontSize="sm">
                            TODO
                        </chakra.h1>
                    </Flex>

                    <Flex
                        alignItems="center"
                        mt={4}
                        color={useColorModeValue("gray.700", "gray.200")}
                    >
                        <Icon as={MdLocationOn} h={6} w={6} mr={2} />

                        <chakra.h1 px={2} fontSize="sm">
                            {location}
                        </chakra.h1>
                    </Flex>
                    <Flex
                        alignItems="center"
                        mt={4}
                        color={useColorModeValue("gray.700", "gray.200")}
                    >
                        <Icon as={MdEmail} h={6} w={6} mr={2} />

                        <chakra.h1 px={2} fontSize="sm">
                            {joinedDate}
                        </chakra.h1>
                    </Flex>
                </Box>
            </Box>
    )
}

export default ProfileBio;