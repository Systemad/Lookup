import React from "react";
import { Box} from "@chakra-ui/react";

type props = {
    headerUrl?: string
}
const ProfileBanner = ({headerUrl} : props) => {

    return (
                <Box
                    bg="gray.300"
                    h={64}
                    w="full"
                    rounded="lg"
                    shadow="md"
                    bgSize="cover"
                    bgPos="center"
                    style={{
                        backgroundImage: `url(${headerUrl})`,
                    }}
                ></Box>
    );
};
export default ProfileBanner;

