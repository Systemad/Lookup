import {useNavigate} from "react-router-dom";
import {Button, Flex} from "@chakra-ui/react";
import {MdBuild} from "react-icons/md";
import * as React from "react";
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../auth/utils/authConfig";
import {AccountInfo, InteractionRequiredAuthError, InteractionStatus} from "@azure/msal-browser";
import {useEffect} from "react";

const ProfileButton = () => {
    const { instance, inProgress } = useMsal();
    const navigate = useNavigate();
    let currentUserId: string;
    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            currentUserId = instance.getActiveAccount()!.username;
        }
    }, [inProgress, instance]);

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
            <Button onClick={() => navigate(`${currentUserId.toLowerCase()}`)} leftIcon={<MdBuild />} colorScheme="whiteAlpha" variant="ghost" mr="2">
                Profile
            </Button>
        </Flex>
    );
};

export default ProfileButton;