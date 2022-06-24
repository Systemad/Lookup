import {useNavigate} from "react-router-dom";
import {Button, Flex} from "@chakra-ui/react";
import {MdBuild} from "react-icons/md";
import * as React from "react";

type Props = {
    userId: string
}
const ProfileButton = ({userId} : Props) => {
    const navigate = useNavigate();
    return (
        <Flex
            align="center"
            px="4"
            mx="2"
            rounded="md"
            py="3"
            color="whiteAlpha.700"
            role="group"
            fontWeight="semibold"
            transition=".15s ease">
            <Button onClick={() => navigate(`${userId.toLowerCase()}`)} leftIcon={<MdBuild />} colorScheme="whiteAlpha" variant="ghost" mr="2">
                Profile
            </Button>
        </Flex>
    );
};

export default ProfileButton;